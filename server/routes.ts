import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { 
  insertCycleSchema,
  insertTemperatureSchema,
  insertMucusSchema,
  insertCalculationSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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
  // API routes for validation of calculator inputs
  
  app.post('/api/validate/gestational', (req, res) => {
    try {
      const { calculationType, date } = req.body;
      
      if (!calculationType || !date) {
        return res.status(400).json({ 
          valid: false, 
          message: 'Dados insuficientes. Por favor, preencha todos os campos.' 
        });
      }
      
      // Basic date validation
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
      
      // Basic date validation
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
      
      if (cycleLength && (cycleLength < 21 || cycleLength > 45)) {
        return res.status(400).json({ 
          valid: false, 
          message: 'A duração do ciclo deve estar entre 21 e 45 dias.' 
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
  
  // =================== ROTAS PARA CICLOS MENSTRUAIS ===================
  
  // Listar ciclos menstruais
  app.get('/api/menstrual-cycles/:userId', isAuthenticated, async (req, res) => {
    try {
      const userId = req.params.userId;
      
      const cycles = await storage.getMenstrualCycles(userId);
      return res.status(200).json(cycles);
    } catch (error) {
      console.error('Erro ao buscar ciclos menstruais:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar ciclos menstruais' });
    }
  });
  
  // Obter um ciclo menstrual específico
  app.get('/api/menstrual-cycles/detail/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const cycle = await storage.getMenstrualCycle(id);
      if (!cycle) {
        return res.status(404).json({ message: 'Ciclo menstrual não encontrado' });
      }
      
      return res.status(200).json(cycle);
    } catch (error) {
      console.error('Erro ao buscar ciclo menstrual:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar ciclo menstrual' });
    }
  });
  
  // Criar um ciclo menstrual
  app.post('/api/menstrual-cycles', async (req, res) => {
    try {
      const result = menstrualCycleSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Dados inválidos', 
          errors: result.error.format() 
        });
      }
      
      const { periodStartDate, periodEndDate, cycleLength, periodLength, notes } = result.data;
      const userId = req.body.userId; // Assumindo que o userId é passado no corpo da requisição
      
      if (!userId) {
        return res.status(400).json({ message: 'ID de usuário é obrigatório' });
      }
      
      const cycle = await storage.createMenstrualCycle({
        userId,
        periodStartDate: periodStartDate,
        periodEndDate: periodEndDate,
        cycleLength,
        periodLength,
        notes
      });
      
      return res.status(201).json(cycle);
    } catch (error) {
      console.error('Erro ao criar ciclo menstrual:', error);
      return res.status(500).json({ message: 'Erro interno ao criar ciclo menstrual' });
    }
  });
  
  // Atualizar um ciclo menstrual
  app.put('/api/menstrual-cycles/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const result = menstrualCycleSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Dados inválidos', 
          errors: result.error.format() 
        });
      }
      
      const existingCycle = await storage.getMenstrualCycle(id);
      if (!existingCycle) {
        return res.status(404).json({ message: 'Ciclo menstrual não encontrado' });
      }
      
      const updateData: any = {};
      
      if (result.data.periodStartDate) {
        updateData.periodStartDate = new Date(result.data.periodStartDate);
      }
      
      if (result.data.periodEndDate) {
        updateData.periodEndDate = new Date(result.data.periodEndDate);
      }
      
      if (result.data.cycleLength) {
        updateData.cycleLength = result.data.cycleLength;
      }
      
      if (result.data.periodLength) {
        updateData.periodLength = result.data.periodLength;
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
  
  // Excluir um ciclo menstrual
  app.delete('/api/menstrual-cycles/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const existingCycle = await storage.getMenstrualCycle(id);
      if (!existingCycle) {
        return res.status(404).json({ message: 'Ciclo menstrual não encontrado' });
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
  
  // =================== ROTAS PARA TEMPERATURA BASAL ===================
  
  // Listar temperaturas basais
  app.get('/api/basal-temperatures/:userId', isAuthenticated, async (req, res) => {
    try {
      const userId = req.params.userId;
      
      const temperatures = await storage.getBasalTemperatures(userId);
      return res.status(200).json(temperatures);
    } catch (error) {
      console.error('Erro ao buscar temperaturas basais:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar temperaturas basais' });
    }
  });
  
  // Obter uma temperatura basal específica
  app.get('/api/basal-temperatures/detail/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const temperature = await storage.getBasalTemperature(id);
      if (!temperature) {
        return res.status(404).json({ message: 'Temperatura basal não encontrada' });
      }
      
      return res.status(200).json(temperature);
    } catch (error) {
      console.error('Erro ao buscar temperatura basal:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar temperatura basal' });
    }
  });
  
  // Criar uma temperatura basal
  app.post('/api/basal-temperatures', isAuthenticated, async (req: any, res) => {
    try {
      const result = basalTemperatureSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Dados inválidos', 
          errors: result.error.format() 
        });
      }
      
      const { measurementDate, temperature, measurementTime } = result.data;
      const userId = req.user.claims.sub;
      
      const newTemperature = await storage.createBasalTemperature({
        userId,
        measurementDate: measurementDate,
        temperature,
        measurementTime
      });
      
      return res.status(201).json(newTemperature);
    } catch (error) {
      console.error('Erro ao criar temperatura basal:', error);
      return res.status(500).json({ message: 'Erro interno ao criar temperatura basal' });
    }
  });
  
  // Atualizar uma temperatura basal
  app.put('/api/basal-temperatures/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const result = basalTemperatureSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Dados inválidos', 
          errors: result.error.format() 
        });
      }
      
      const existingTemperature = await storage.getBasalTemperature(id);
      if (!existingTemperature) {
        return res.status(404).json({ message: 'Temperatura basal não encontrada' });
      }
      
      const updateData: any = {};
      
      if (result.data.measurementDate) {
        updateData.measurementDate = new Date(result.data.measurementDate);
      }
      
      if (result.data.temperature) {
        updateData.temperature = result.data.temperature;
      }
      
      if (result.data.measurementTime !== undefined) {
        updateData.measurementTime = result.data.measurementTime;
      }
      
      const updatedTemperature = await storage.updateBasalTemperature(id, updateData);
      
      return res.status(200).json(updatedTemperature);
    } catch (error) {
      console.error('Erro ao atualizar temperatura basal:', error);
      return res.status(500).json({ message: 'Erro interno ao atualizar temperatura basal' });
    }
  });
  
  // Excluir uma temperatura basal
  app.delete('/api/basal-temperatures/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const existingTemperature = await storage.getBasalTemperature(id);
      if (!existingTemperature) {
        return res.status(404).json({ message: 'Temperatura basal não encontrada' });
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
  
  // =================== ROTAS PARA MUCO CERVICAL ===================
  
  // Listar entradas de muco cervical
  app.get('/api/cervical-mucus/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'ID de usuário inválido' });
      }
      
      const entries = await storage.getCervicalMucusEntries(userId);
      return res.status(200).json(entries);
    } catch (error) {
      console.error('Erro ao buscar entradas de muco cervical:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar entradas de muco cervical' });
    }
  });
  
  // Obter uma entrada de muco cervical específica
  app.get('/api/cervical-mucus/detail/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const entry = await storage.getCervicalMucus(id);
      if (!entry) {
        return res.status(404).json({ message: 'Entrada de muco cervical não encontrada' });
      }
      
      return res.status(200).json(entry);
    } catch (error) {
      console.error('Erro ao buscar entrada de muco cervical:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar entrada de muco cervical' });
    }
  });
  
  // Criar uma entrada de muco cervical
  app.post('/api/cervical-mucus', async (req, res) => {
    try {
      const result = cervicalMucusSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Dados inválidos', 
          errors: result.error.format() 
        });
      }
      
      const { observationDate, consistency, amount, notes } = result.data;
      const userId = req.body.userId;
      
      if (!userId) {
        return res.status(400).json({ message: 'ID de usuário é obrigatório' });
      }
      
      const newEntry = await storage.createCervicalMucus({
        userId,
        observationDate: observationDate,
        consistency,
        amount,
        notes
      });
      
      return res.status(201).json(newEntry);
    } catch (error) {
      console.error('Erro ao criar entrada de muco cervical:', error);
      return res.status(500).json({ message: 'Erro interno ao criar entrada de muco cervical' });
    }
  });
  
  // Atualizar uma entrada de muco cervical
  app.put('/api/cervical-mucus/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const result = cervicalMucusSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Dados inválidos', 
          errors: result.error.format() 
        });
      }
      
      const existingEntry = await storage.getCervicalMucus(id);
      if (!existingEntry) {
        return res.status(404).json({ message: 'Entrada de muco cervical não encontrada' });
      }
      
      const updateData: any = {};
      
      if (result.data.observationDate) {
        updateData.observationDate = new Date(result.data.observationDate);
      }
      
      if (result.data.consistency !== undefined) {
        updateData.consistency = result.data.consistency;
      }
      
      if (result.data.amount !== undefined) {
        updateData.amount = result.data.amount;
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
  
  // Excluir uma entrada de muco cervical
  app.delete('/api/cervical-mucus/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'ID inválido' });
      }
      
      const existingEntry = await storage.getCervicalMucus(id);
      if (!existingEntry) {
        return res.status(404).json({ message: 'Entrada de muco cervical não encontrada' });
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
  
  // =================== ROTAS PARA DESENVOLVIMENTO FETAL ===================
  
  // Obter todos os dados de desenvolvimento fetal
  app.get('/api/fetal-development', async (req, res) => {
    try {
      const developmentData = await storage.getAllFetalDevelopment();
      return res.status(200).json(developmentData);
    } catch (error) {
      console.error('Erro ao buscar dados de desenvolvimento fetal:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar dados de desenvolvimento fetal' });
    }
  });
  
  // Obter dados de desenvolvimento fetal para uma semana específica
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
  
  // =================== ROTAS PARA HISTÓRICO DE CÁLCULOS ===================
  
  // Salvar histórico de cálculo
  app.post('/api/calculator-history', async (req, res) => {
    try {
      const { userId, calculatorType, inputData, resultData } = req.body;
      
      if (!userId || !calculatorType || !inputData || !resultData) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
      }
      
      const historyEntry = await storage.saveCalculatorHistory({
        userId,
        calculatorType,
        inputData: JSON.stringify(inputData),
        resultData: JSON.stringify(resultData)
      });
      
      return res.status(201).json(historyEntry);
    } catch (error) {
      console.error('Erro ao salvar histórico de cálculo:', error);
      return res.status(500).json({ message: 'Erro interno ao salvar histórico de cálculo' });
    }
  });
  
  // Obter histórico de cálculos para um usuário
  app.get('/api/calculator-history/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ message: 'ID de usuário inválido' });
      }
      
      const history = await storage.getCalculatorHistory(userId);
      
      // Converter de volta para objetos as strings JSON armazenadas
      const formattedHistory = history.map(entry => ({
        ...entry,
        inputData: JSON.parse(entry.inputData),
        resultData: JSON.parse(entry.resultData)
      }));
      
      return res.status(200).json(formattedHistory);
    } catch (error) {
      console.error('Erro ao buscar histórico de cálculos:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar histórico de cálculos' });
    }
  });

  // =================== ROTAS PARA HISTÓRICO DE CÁLCULOS ===================
  
  // Salvar histórico de cálculo
  app.post('/api/calculator-history', async (req, res) => {
    try {
      const { calculatorType, inputData, resultData, userId } = req.body;
      
      const history = await storage.saveCalculatorHistory({
        userId: userId || 'anonymous',
        calculatorType,
        inputData,
        resultData
      });
      
      return res.status(201).json(history);
    } catch (error) {
      console.error('Erro ao salvar histórico:', error);
      return res.status(500).json({ message: 'Erro ao salvar histórico' });
    }
  });
  
  // Buscar histórico de cálculos
  app.get('/api/calculator-history/:userId', async (req, res) => {
    try {
      const history = await storage.getCalculatorHistory(req.params.userId);
      return res.status(200).json(history);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      return res.status(500).json({ message: 'Erro ao buscar histórico' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
