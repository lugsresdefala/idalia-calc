import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import {
  menstrualCycleSchema,
  basalTemperatureSchema,
  cervicalMucusSchema
} from "@shared/schema";
import { z } from "zod";
import Stripe from "stripe";

// Configurar Stripe
if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('WARNING: STRIPE_SECRET_KEY not set - payment features disabled');
}
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function registerRoutes(app: Express): Promise<Server> {
  // Stripe webhook needs raw body - MUST be registered before express.json() affects it
  // Note: express.json() is set in index.ts, but this route uses its own body parser
  app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Sistema de pagamento não configurado" });
    }

    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      console.warn('STRIPE_WEBHOOK_SECRET não configurado');
      return res.status(200).json({ received: true });
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          const userId = subscription.metadata.userId;
          if (userId) {
            await storage.updateUserSubscription(userId, {
              stripeSubscriptionId: subscription.id,
              subscriptionStatus: subscription.status,
              plan: subscription.items.data[0]?.price?.metadata?.plan || 'professional',
              subscriptionEndDate: new Date((subscription as any).current_period_end * 1000)
            });
          }
          break;
        }

        case 'customer.subscription.deleted': {
          const cancelledSub = event.data.object as Stripe.Subscription;
          const userId = cancelledSub.metadata.userId;
          if (userId) {
            await storage.updateUserSubscription(userId, {
              subscriptionStatus: 'cancelled',
              plan: 'free',
              monthlyCredits: 5
            });
          }
          break;
        }

        case 'invoice.payment_succeeded': {
          const invoice = event.data.object as Stripe.Invoice;
          console.log('Pagamento recebido para:', invoice.customer);
          break;
        }

        case 'invoice.payment_failed': {
          const failedInvoice = event.data.object as Stripe.Invoice;
          const subId = (failedInvoice as any).subscription;
          if (subId && typeof subId === 'string') {
            const sub = await stripe.subscriptions.retrieve(subId);
            const userId = sub.metadata.userId;
            if (userId) {
              await storage.updateUserSubscription(userId, {
                subscriptionStatus: 'past_due'
              });
            }
          }
          break;
        }

        default:
          console.log(`Unhandled event type ${event.type}`);
      }
    } catch (error) {
      console.error('Error processing webhook event:', error);
    }

    res.json({ received: true });
  });

  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // =================== VALIDATION ROUTES (public) ===================

  app.post('/api/validate/gestational', (req, res) => {
    try {
      const { calculationType, date } = req.body;

      if (!calculationType || !date) {
        return res.status(400).json({
          valid: false,
          message: 'Dados insuficientes. Por favor, preencha todos os campos.'
        });
      }

      const inputDate = new Date(date);
      const today = new Date();

      if (isNaN(inputDate.getTime())) {
        return res.status(400).json({
          valid: false,
          message: 'Data inválida. Por favor, insira uma data válida.'
        });
      }

      if (inputDate > today) {
        return res.status(400).json({
          valid: false,
          message: 'A data não pode ser no futuro.'
        });
      }

      return res.status(200).json({ valid: true });
    } catch (error) {
      console.error('Error validating gestational data:', error);
      return res.status(500).json({
        valid: false,
        message: 'Erro ao validar os dados. Por favor, tente novamente.'
      });
    }
  });

  app.post('/api/validate/fertility', (req, res) => {
    try {
      const { periodStart, periodEnd, cycleLength } = req.body;

      if (!periodStart || !periodEnd) {
        return res.status(400).json({
          valid: false,
          message: 'Dados insuficientes. Por favor, preencha todos os campos.'
        });
      }

      const startDate = new Date(periodStart);
      const endDate = new Date(periodEnd);
      const today = new Date();

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res.status(400).json({
          valid: false,
          message: 'Data inválida. Por favor, insira datas válidas.'
        });
      }

      if (startDate > today || endDate > today) {
        return res.status(400).json({
          valid: false,
          message: 'As datas não podem ser no futuro.'
        });
      }

      if (endDate < startDate) {
        return res.status(400).json({
          valid: false,
          message: 'A data de fim deve ser após a data de início.'
        });
      }

      if (cycleLength && (cycleLength < 15 || cycleLength > 60)) {
        return res.status(400).json({
          valid: false,
          message: 'A duração do ciclo deve estar entre 15 e 60 dias.'
        });
      }

      return res.status(200).json({ valid: true });
    } catch (error) {
      console.error('Error validating fertility data:', error);
      return res.status(500).json({
        valid: false,
        message: 'Erro ao validar os dados. Por favor, tente novamente.'
      });
    }
  });

  // =================== MENSTRUAL CYCLES ROUTES ===================
  // All routes now use isAuthenticated and derive userId from session

  app.get('/api/menstrual-cycles', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const cycles = await storage.getMenstrualCycles(userId);
      return res.status(200).json(cycles);
    } catch (error) {
      console.error('Erro ao buscar ciclos menstruais:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar ciclos menstruais' });
    }
  });

  app.get('/api/menstrual-cycles/detail/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.claims.sub;

      const cycle = await storage.getMenstrualCycle(id);
      if (!cycle) {
        return res.status(404).json({ message: 'Ciclo menstrual não encontrado' });
      }

      // SECURITY: Verify ownership
      if (cycle.userId !== userId) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      return res.status(200).json(cycle);
    } catch (error) {
      console.error('Erro ao buscar ciclo menstrual:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar ciclo menstrual' });
    }
  });

  // Legacy route kept for backward compatibility - registered AFTER detail route to avoid conflict
  app.get('/api/menstrual-cycles/:userId', isAuthenticated, async (req: any, res) => {
    try {
      // SECURITY: Always use session userId, ignore URL param
      const userId = req.user.claims.sub;
      const cycles = await storage.getMenstrualCycles(userId);
      return res.status(200).json(cycles);
    } catch (error) {
      console.error('Erro ao buscar ciclos menstruais:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar ciclos menstruais' });
    }
  });

  app.post('/api/menstrual-cycles', isAuthenticated, async (req: any, res) => {
    try {
      const result = menstrualCycleSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Dados inválidos',
          errors: result.error.format()
        });
      }

      const userId = req.user.claims.sub;
      const { periodStart, periodEnd, cycleLength, notes } = result.data;

      const cycle = await storage.createMenstrualCycle({
        userId,
        periodStart: String(periodStart),
        periodEnd: periodEnd ? String(periodEnd) : undefined,
        cycleLength,
        notes
      });

      return res.status(201).json(cycle);
    } catch (error) {
      console.error('Erro ao criar ciclo menstrual:', error);
      return res.status(500).json({ message: 'Erro interno ao criar ciclo menstrual' });
    }
  });

  app.put('/api/menstrual-cycles/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.claims.sub;

      const existingCycle = await storage.getMenstrualCycle(id);
      if (!existingCycle) {
        return res.status(404).json({ message: 'Ciclo menstrual não encontrado' });
      }

      // SECURITY: Verify ownership
      if (existingCycle.userId !== userId) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      const result = menstrualCycleSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: 'Dados inválidos',
          errors: result.error.format()
        });
      }

      const updateData: Record<string, any> = {};

      if (result.data.periodStart) {
        updateData.periodStart = String(result.data.periodStart);
      }
      if (result.data.periodEnd) {
        updateData.periodEnd = String(result.data.periodEnd);
      }
      if (result.data.cycleLength) {
        updateData.cycleLength = result.data.cycleLength;
      }
      if (result.data.notes !== undefined) {
        updateData.notes = result.data.notes;
      }

      const updatedCycle = await storage.updateMenstrualCycle(id, updateData);
      return res.status(200).json(updatedCycle);
    } catch (error) {
      console.error('Erro ao atualizar ciclo menstrual:', error);
      return res.status(500).json({ message: 'Erro interno ao atualizar ciclo menstrual' });
    }
  });

  app.delete('/api/menstrual-cycles/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.claims.sub;

      const existingCycle = await storage.getMenstrualCycle(id);
      if (!existingCycle) {
        return res.status(404).json({ message: 'Ciclo menstrual não encontrado' });
      }

      // SECURITY: Verify ownership
      if (existingCycle.userId !== userId) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      const success = await storage.deleteMenstrualCycle(id);
      if (success) {
        return res.status(200).json({ message: 'Ciclo menstrual excluído com sucesso' });
      } else {
        return res.status(500).json({ message: 'Falha ao excluir ciclo menstrual' });
      }
    } catch (error) {
      console.error('Erro ao excluir ciclo menstrual:', error);
      return res.status(500).json({ message: 'Erro interno ao excluir ciclo menstrual' });
    }
  });

  // =================== BASAL TEMPERATURE ROUTES ===================

  app.get('/api/basal-temperatures', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const temperatures = await storage.getBasalTemperatures(userId);
      return res.status(200).json(temperatures);
    } catch (error) {
      console.error('Erro ao buscar temperaturas basais:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar temperaturas basais' });
    }
  });

  app.get('/api/basal-temperatures/detail/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.claims.sub;

      const temperature = await storage.getBasalTemperature(id);
      if (!temperature) {
        return res.status(404).json({ message: 'Temperatura basal não encontrada' });
      }

      // SECURITY: Verify ownership
      if (temperature.userId !== userId) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      return res.status(200).json(temperature);
    } catch (error) {
      console.error('Erro ao buscar temperatura basal:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar temperatura basal' });
    }
  });

  // Legacy route kept for backward compatibility - registered AFTER detail route to avoid conflict
  app.get('/api/basal-temperatures/:userId', isAuthenticated, async (req: any, res) => {
    try {
      // SECURITY: Always use session userId, ignore URL param
      const userId = req.user.claims.sub;
      const temperatures = await storage.getBasalTemperatures(userId);
      return res.status(200).json(temperatures);
    } catch (error) {
      console.error('Erro ao buscar temperaturas basais:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar temperaturas basais' });
    }
  });

  app.post('/api/basal-temperatures', isAuthenticated, async (req: any, res) => {
    try {
      const result = basalTemperatureSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Dados inválidos',
          errors: result.error.format()
        });
      }

      const userId = req.user.claims.sub;
      const { date, temperature, time } = result.data;

      const newTemperature = await storage.createBasalTemperature({
        userId,
        date: String(date),
        temperature,
        time: time || undefined
      });

      return res.status(201).json(newTemperature);
    } catch (error) {
      console.error('Erro ao criar temperatura basal:', error);
      return res.status(500).json({ message: 'Erro interno ao criar temperatura basal' });
    }
  });

  app.put('/api/basal-temperatures/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.claims.sub;

      const existingTemperature = await storage.getBasalTemperature(id);
      if (!existingTemperature) {
        return res.status(404).json({ message: 'Temperatura basal não encontrada' });
      }

      // SECURITY: Verify ownership
      if (existingTemperature.userId !== userId) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      const result = basalTemperatureSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: 'Dados inválidos',
          errors: result.error.format()
        });
      }

      const updateData: Record<string, any> = {};
      if (result.data.date) {
        updateData.date = String(result.data.date);
      }
      if (result.data.temperature !== undefined) {
        updateData.temperature = result.data.temperature;
      }
      if (result.data.time !== undefined) {
        updateData.time = result.data.time;
      }

      const updatedTemperature = await storage.updateBasalTemperature(id, updateData);
      return res.status(200).json(updatedTemperature);
    } catch (error) {
      console.error('Erro ao atualizar temperatura basal:', error);
      return res.status(500).json({ message: 'Erro interno ao atualizar temperatura basal' });
    }
  });

  app.delete('/api/basal-temperatures/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.claims.sub;

      const existingTemperature = await storage.getBasalTemperature(id);
      if (!existingTemperature) {
        return res.status(404).json({ message: 'Temperatura basal não encontrada' });
      }

      // SECURITY: Verify ownership
      if (existingTemperature.userId !== userId) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      const success = await storage.deleteBasalTemperature(id);
      if (success) {
        return res.status(200).json({ message: 'Temperatura basal excluída com sucesso' });
      } else {
        return res.status(500).json({ message: 'Falha ao excluir temperatura basal' });
      }
    } catch (error) {
      console.error('Erro ao excluir temperatura basal:', error);
      return res.status(500).json({ message: 'Erro interno ao excluir temperatura basal' });
    }
  });

  // =================== CERVICAL MUCUS ROUTES ===================

  app.get('/api/cervical-mucus', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const entries = await storage.getCervicalMucusEntries(userId);
      return res.status(200).json(entries);
    } catch (error) {
      console.error('Erro ao buscar entradas de muco cervical:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar entradas de muco cervical' });
    }
  });

  app.get('/api/cervical-mucus/detail/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.claims.sub;

      const entry = await storage.getCervicalMucus(id);
      if (!entry) {
        return res.status(404).json({ message: 'Entrada de muco cervical não encontrada' });
      }

      // SECURITY: Verify ownership
      if (entry.userId !== userId) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      return res.status(200).json(entry);
    } catch (error) {
      console.error('Erro ao buscar entrada de muco cervical:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar entrada de muco cervical' });
    }
  });

  // Legacy route kept for backward compatibility - registered AFTER detail route to avoid conflict
  app.get('/api/cervical-mucus/:userId', isAuthenticated, async (req: any, res) => {
    try {
      // SECURITY: Always use session userId, ignore URL param
      const userId = req.user.claims.sub;
      const entries = await storage.getCervicalMucusEntries(userId);
      return res.status(200).json(entries);
    } catch (error) {
      console.error('Erro ao buscar entradas de muco cervical:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar entradas de muco cervical' });
    }
  });

  app.post('/api/cervical-mucus', isAuthenticated, async (req: any, res) => {
    try {
      const result = cervicalMucusSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Dados inválidos',
          errors: result.error.format()
        });
      }

      const userId = req.user.claims.sub;
      const { date, consistency, amount, color, notes } = result.data;

      const newEntry = await storage.createCervicalMucus({
        userId,
        date: String(date),
        consistency,
        amount,
        color,
        notes
      });

      return res.status(201).json(newEntry);
    } catch (error) {
      console.error('Erro ao criar entrada de muco cervical:', error);
      return res.status(500).json({ message: 'Erro interno ao criar entrada de muco cervical' });
    }
  });

  app.put('/api/cervical-mucus/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.claims.sub;

      const existingEntry = await storage.getCervicalMucus(id);
      if (!existingEntry) {
        return res.status(404).json({ message: 'Entrada de muco cervical não encontrada' });
      }

      // SECURITY: Verify ownership
      if (existingEntry.userId !== userId) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      const result = cervicalMucusSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          message: 'Dados inválidos',
          errors: result.error.format()
        });
      }

      const updateData: Record<string, any> = {};
      if (result.data.date) {
        updateData.date = String(result.data.date);
      }
      if (result.data.consistency !== undefined) {
        updateData.consistency = result.data.consistency;
      }
      if (result.data.amount !== undefined) {
        updateData.amount = result.data.amount;
      }
      if (result.data.color !== undefined) {
        updateData.color = result.data.color;
      }
      if (result.data.notes !== undefined) {
        updateData.notes = result.data.notes;
      }

      const updatedEntry = await storage.updateCervicalMucus(id, updateData);
      return res.status(200).json(updatedEntry);
    } catch (error) {
      console.error('Erro ao atualizar entrada de muco cervical:', error);
      return res.status(500).json({ message: 'Erro interno ao atualizar entrada de muco cervical' });
    }
  });

  app.delete('/api/cervical-mucus/:id', isAuthenticated, async (req: any, res) => {
    try {
      const id = req.params.id;
      const userId = req.user.claims.sub;

      const existingEntry = await storage.getCervicalMucus(id);
      if (!existingEntry) {
        return res.status(404).json({ message: 'Entrada de muco cervical não encontrada' });
      }

      // SECURITY: Verify ownership
      if (existingEntry.userId !== userId) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }

      const success = await storage.deleteCervicalMucus(id);
      if (success) {
        return res.status(200).json({ message: 'Entrada de muco cervical excluída com sucesso' });
      } else {
        return res.status(500).json({ message: 'Falha ao excluir entrada de muco cervical' });
      }
    } catch (error) {
      console.error('Erro ao excluir entrada de muco cervical:', error);
      return res.status(500).json({ message: 'Erro interno ao excluir entrada de muco cervical' });
    }
  });

  // =================== FETAL DEVELOPMENT ROUTES ===================

  app.get('/api/fetal-development', async (_req, res) => {
    try {
      const developmentData = await storage.getAllFetalDevelopment();
      return res.status(200).json(developmentData);
    } catch (error) {
      console.error('Erro ao buscar dados de desenvolvimento fetal:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar dados de desenvolvimento fetal' });
    }
  });

  app.get('/api/fetal-development/:week', async (req, res) => {
    try {
      const week = parseInt(req.params.week);
      if (isNaN(week) || week < 1 || week > 42) {
        return res.status(400).json({ message: 'Semana inválida. Deve ser um número entre 1 e 42.' });
      }

      const developmentData = await storage.getFetalDevelopmentByWeek(week);
      if (!developmentData) {
        return res.status(404).json({ message: 'Dados de desenvolvimento fetal não encontrados para esta semana' });
      }

      return res.status(200).json(developmentData);
    } catch (error) {
      console.error('Erro ao buscar dados de desenvolvimento fetal:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar dados de desenvolvimento fetal' });
    }
  });

  // =================== CALCULATOR HISTORY ROUTES ===================

  app.post('/api/calculator-history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { calculatorType, inputData, resultData } = req.body;

      if (!calculatorType || !inputData || !resultData) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
      }

      const historyEntry = await storage.saveCalculatorHistory(
        userId,
        calculatorType,
        typeof inputData === 'string' ? inputData : JSON.stringify(inputData),
        typeof resultData === 'string' ? resultData : JSON.stringify(resultData)
      );

      return res.status(201).json(historyEntry);
    } catch (error) {
      console.error('Erro ao salvar histórico de cálculo:', error);
      return res.status(500).json({ message: 'Erro interno ao salvar histórico de cálculo' });
    }
  });

  app.get('/api/calculator-history', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const history = await storage.getCalculatorHistory(userId);
      return res.status(200).json(history);
    } catch (error) {
      console.error('Erro ao buscar histórico de cálculos:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar histórico de cálculos' });
    }
  });

  // Legacy route kept for backward compatibility
  app.get('/api/calculator-history/:userId', isAuthenticated, async (req: any, res) => {
    try {
      // SECURITY: Always use session userId, ignore URL param
      const userId = req.user.claims.sub;
      const history = await storage.getCalculatorHistory(userId);
      return res.status(200).json(history);
    } catch (error) {
      console.error('Erro ao buscar histórico de cálculos:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar histórico de cálculos' });
    }
  });

  // =================== ACCESS CONTROL ROUTES ===================

  app.get('/api/check-calculation-access', async (req: any, res) => {
    if (!req.isAuthenticated()) {
      return res.json({
        hasFullAccess: false,
        reason: 'not_authenticated',
        message: 'Faça login para ver resultados completos'
      });
    }

    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.json({
          hasFullAccess: false,
          reason: 'user_not_found',
          message: 'Usuário não encontrado'
        });
      }

      if (user.subscriptionStatus === 'active' && user.plan !== 'free') {
        return res.json({
          hasFullAccess: true,
          reason: 'subscription_active',
          remainingCredits: user.monthlyCredits === -1 ? 'unlimited' : Math.max(0, (user.monthlyCredits || 5) - (user.usedCredits || 0))
        });
      }

      if (!user.hasUsedFreeTrial) {
        return res.json({
          hasFullAccess: true,
          reason: 'free_trial',
          message: 'Você tem 1 uso gratuito disponível!'
        });
      }

      return res.json({
        hasFullAccess: false,
        reason: 'trial_used',
        message: 'Seu teste gratuito já foi utilizado. Assine para continuar!'
      });

    } catch (error) {
      console.error('Erro ao verificar acesso:', error);
      return res.status(500).json({
        hasFullAccess: false,
        message: 'Erro ao verificar acesso'
      });
    }
  });

  app.post('/api/register-calculation-use', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { calculationType, calculationData } = req.body;

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      if (!user.hasUsedFreeTrial && user.plan === 'free') {
        await storage.updateUser(userId, {
          hasUsedFreeTrial: true,
          totalCalculations: (user.totalCalculations || 0) + 1
        });

        await storage.consumeCredit(userId, calculationType, calculationData);

        return res.json({
          success: true,
          message: 'Teste gratuito utilizado com sucesso!',
          remainingAccess: false
        });
      }

      if (user.subscriptionStatus === 'active' && user.plan !== 'free') {
        await storage.consumeCredit(userId, calculationType, calculationData);

        const remainingCredits = user.monthlyCredits === -1 ?
          'unlimited' :
          Math.max(0, (user.monthlyCredits || 5) - (user.usedCredits || 0) - 1);

        return res.json({
          success: true,
          remainingCredits,
          remainingAccess: user.monthlyCredits === -1 || (user.usedCredits || 0) + 1 < (user.monthlyCredits || 5)
        });
      }

      return res.status(403).json({
        success: false,
        message: 'Você não tem créditos disponíveis. Assine para continuar!'
      });

    } catch (error) {
      console.error('Erro ao registrar uso:', error);
      return res.status(500).json({ message: 'Erro ao registrar uso' });
    }
  });

  // =================== STRIPE PAYMENT ROUTES ===================

  app.post('/api/get-or-create-subscription', isAuthenticated, async (req: any, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Sistema de pagamento não configurado" });
    }

    try {
      const userId = req.user.claims.sub;
      let user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (user.stripeSubscriptionId && user.subscriptionStatus === 'active') {
        return res.json({
          subscriptionId: user.stripeSubscriptionId,
          status: 'active'
        });
      }

      let customerId = user.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { userId }
        });

        await storage.updateUser(userId, {
          stripeCustomerId: customer.id
        });

        customerId = customer.id;
      }

      let priceId = process.env.STRIPE_PRICE_ID || 'price_1RzROsFRyKUci3hFcnmaZAUr';

      if (req.body.planId === 'fetalpro') {
        priceId = 'price_1S0PDqFRyKUci3hFM86f7qmM';
      }

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: { userId }
      });

      const invoice = subscription.latest_invoice as any;
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

      await storage.updateUser(userId, {
        stripeSubscriptionId: subscription.id,
        subscriptionStatus: 'incomplete'
      });

      return res.json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      console.error('Erro ao criar assinatura:', error);
      return res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/create-subscription', isAuthenticated, async (req: any, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Sistema de pagamento não configurado" });
    }

    try {
      const userId = req.user.claims.sub;
      const { priceId, planId } = req.body;

      let user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      let customerId = user.stripeCustomerId;

      if (!customerId) {
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { userId }
        });

        await storage.updateUser(userId, {
          stripeCustomerId: customer.id
        });

        customerId = customer.id;
      }

      let finalPriceId = priceId || process.env.STRIPE_PRICE_ID || 'price_1RzROsFRyKUci3hFcnmaZAUr';

      if (planId === 'fetalpro') {
        finalPriceId = 'price_1S0PDqFRyKUci3hFM86f7qmM';
      }

      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: finalPriceId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
        metadata: { userId }
      });

      const invoice = subscription.latest_invoice as any;
      const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

      res.json({
        subscriptionId: subscription.id,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error: any) {
      console.error('Erro ao criar assinatura:', error);
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/confirm-subscription', isAuthenticated, async (req: any, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Sistema de pagamento não configurado" });
    }

    try {
      const userId = req.user.claims.sub;
      const { paymentIntentId } = req.body;

      if (!paymentIntentId) {
        return res.status(400).json({ message: "ID do pagamento não fornecido" });
      }

      const user = await storage.getUser(userId);
      if (user && user.stripeSubscriptionId) {
        // Retrieve the actual subscription to determine the correct plan
        const subscription = await stripe.subscriptions.retrieve(user.stripeSubscriptionId);
        const planMetadata = subscription.items.data[0]?.price?.metadata?.plan;
        const priceId = subscription.items.data[0]?.price?.id;

        // Determine plan from metadata or price ID
        let plan = planMetadata || 'premium';
        if (priceId === 'price_1S0PDqFRyKUci3hFM86f7qmM') {
          plan = 'fetalpro';
        }

        await storage.updateUser(userId, {
          subscriptionStatus: 'active',
          plan,
          hasUsedFreeTrial: true,
          usedCredits: 0,
          monthlyCredits: -1
        });
      }

      return res.json({ success: true });
    } catch (error: any) {
      console.error('Erro ao confirmar assinatura:', error);
      return res.status(500).json({ message: error.message });
    }
  });

  app.get('/api/subscription-status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.json({
        plan: user.plan || 'free',
        subscriptionStatus: user.subscriptionStatus || 'inactive',
        monthlyCredits: user.monthlyCredits || 5,
        usedCredits: user.usedCredits || 0,
        subscriptionEndDate: user.subscriptionEndDate
      });
    } catch (error) {
      console.error('Erro ao buscar status da assinatura:', error);
      res.status(500).json({ message: "Erro ao buscar status da assinatura" });
    }
  });

  app.post('/api/cancel-subscription', isAuthenticated, async (req: any, res) => {
    if (!stripe) {
      return res.status(503).json({ message: "Sistema de pagamento não configurado" });
    }

    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);

      if (!user || !user.stripeSubscriptionId) {
        return res.status(404).json({ message: "Assinatura não encontrada" });
      }

      const subscription = await stripe.subscriptions.cancel(user.stripeSubscriptionId);

      await storage.updateUserSubscription(userId, {
        subscriptionStatus: 'cancelled',
        plan: 'free',
        monthlyCredits: 5
      });

      res.json({
        message: "Assinatura cancelada com sucesso",
        subscription
      });
    } catch (error: any) {
      console.error('Erro ao cancelar assinatura:', error);
      res.status(500).json({ message: error.message });
    }
  });

  // =================== DATA STATUS & REIMPORT ROUTES ===================

  app.get('/api/data-status', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const status = await storage.getDataStatus(userId);
      return res.json(status);
    } catch (error) {
      console.error('Erro ao buscar status dos dados:', error);
      return res.status(500).json({ message: 'Erro ao buscar status dos dados' });
    }
  });

  const importCycleSchema = z.object({
    periodStart: z.string().min(1, 'periodStart é obrigatório'),
    periodEnd: z.string().optional().nullable(),
    cycleLength: z.number().int().min(15).max(60).optional().nullable(),
    ovulationDate: z.string().optional().nullable(),
    fertileStart: z.string().optional().nullable(),
    fertileEnd: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
  });

  const importTemperatureSchema = z.object({
    date: z.string().min(1, 'date é obrigatório'),
    temperature: z.number().min(35).max(42),
    time: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
  });

  const importMucusSchema = z.object({
    date: z.string().min(1, 'date é obrigatório'),
    consistency: z.enum(['dry', 'sticky', 'creamy', 'watery', 'eggwhite']).optional().nullable(),
    amount: z.enum(['none', 'light', 'moderate', 'heavy']).optional().nullable(),
    color: z.string().optional().nullable(),
    notes: z.string().optional().nullable(),
  });

  app.post('/api/reimport/cycles', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { records } = req.body;

      if (!Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ message: 'records deve ser um array não vazio' });
      }

      if (records.length > 500) {
        return res.status(400).json({ message: 'Máximo de 500 registros por importação' });
      }

      const validated: any[] = [];
      const parseErrors: Array<{ index: number; error: string }> = [];

      records.forEach((rec: any, i: number) => {
        const result = importCycleSchema.safeParse(rec);
        if (result.success) {
          validated.push(result.data);
        } else {
          parseErrors.push({ index: i, error: result.error.issues.map(e => e.message).join('; ') });
        }
      });

      if (parseErrors.length > 0) {
        return res.status(400).json({ message: 'Registros inválidos', parseErrors });
      }

      const importResult = await storage.bulkUpsertCycles(userId, validated);
      return res.json(importResult);
    } catch (error) {
      console.error('Erro ao reimportar ciclos:', error);
      return res.status(500).json({ message: 'Erro ao reimportar ciclos' });
    }
  });

  app.post('/api/reimport/temperatures', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { records } = req.body;

      if (!Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ message: 'records deve ser um array não vazio' });
      }

      if (records.length > 500) {
        return res.status(400).json({ message: 'Máximo de 500 registros por importação' });
      }

      const validated: any[] = [];
      const parseErrors: Array<{ index: number; error: string }> = [];

      records.forEach((rec: any, i: number) => {
        const result = importTemperatureSchema.safeParse(rec);
        if (result.success) {
          validated.push(result.data);
        } else {
          parseErrors.push({ index: i, error: result.error.issues.map(e => e.message).join('; ') });
        }
      });

      if (parseErrors.length > 0) {
        return res.status(400).json({ message: 'Registros inválidos', parseErrors });
      }

      const importResult = await storage.bulkUpsertTemperatures(userId, validated);
      return res.json(importResult);
    } catch (error) {
      console.error('Erro ao reimportar temperaturas:', error);
      return res.status(500).json({ message: 'Erro ao reimportar temperaturas' });
    }
  });

  app.post('/api/reimport/mucus', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { records } = req.body;

      if (!Array.isArray(records) || records.length === 0) {
        return res.status(400).json({ message: 'records deve ser um array não vazio' });
      }

      if (records.length > 500) {
        return res.status(400).json({ message: 'Máximo de 500 registros por importação' });
      }

      const validated: any[] = [];
      const parseErrors: Array<{ index: number; error: string }> = [];

      records.forEach((rec: any, i: number) => {
        const result = importMucusSchema.safeParse(rec);
        if (result.success) {
          validated.push(result.data);
        } else {
          parseErrors.push({ index: i, error: result.error.issues.map(e => e.message).join('; ') });
        }
      });

      if (parseErrors.length > 0) {
        return res.status(400).json({ message: 'Registros inválidos', parseErrors });
      }

      const importResult = await storage.bulkUpsertMucusObservations(userId, validated);
      return res.json(importResult);
    } catch (error) {
      console.error('Erro ao reimportar muco cervical:', error);
      return res.status(500).json({ message: 'Erro ao reimportar muco cervical' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
