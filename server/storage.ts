import {
  users,
  plans,
  cycles,
  basalTemperatures,
  mucusObservations,
  pregnancies,
  calculations,
  notifications,
  usageHistory,
  type User,
  type UpsertUser,
  type Plan,
  type InsertPlan,
  type Cycle,
  type InsertCycle,
  type BasalTemperature,
  type InsertBasalTemperature,
  type MucusObservation,
  type InsertMucusObservation,
  type Pregnancy,
  type InsertPregnancy,
  type Calculation,
  type InsertCalculation,
  type Notification,
  type InsertNotification,
  type UsageHistory,
  type InsertUsageHistory,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, lte, desc, sql, max } from "drizzle-orm";

export type ReimportResult = {
  inserted: number;
  updated: number;
  skipped: number;
  errors: Array<{ record: any; error: string }>;
};

export type DataStatus = {
  cycles: string | null;
  temperatures: string | null;
  mucus: string | null;
  calculations: string | null;
  lastSync: string;
};

// Interface for storage operations
export interface IStorage {
  // User operations - OBRIGATÓRIO para Replit Auth
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserPlan(userId: string, plan: string, subscriptionId?: string): Promise<User>;
  updateUserCredits(userId: string, credits: number): Promise<User>;
  
  // Plan operations
  getPlan(id: string): Promise<Plan | undefined>;
  getAllPlans(): Promise<Plan[]>;
  createPlan(plan: InsertPlan): Promise<Plan>;
  
  // Usage/Credits operations
  checkUserCredits(userId: string): Promise<{ hasCredits: boolean; remaining: number }>;
  consumeCredit(userId: string, calculationType: string, data?: any): Promise<UsageHistory>;
  resetMonthlyCredits(userId: string): Promise<User>;
  getUserUsageHistory(userId: string, limit?: number): Promise<UsageHistory[]>;
  
  // Cycle operations
  createCycle(cycle: InsertCycle): Promise<Cycle>;
  getUserCycles(userId: string, limit?: number): Promise<Cycle[]>;
  getCurrentCycle(userId: string): Promise<Cycle | undefined>;
  updateCycle(id: string, data: Partial<InsertCycle>): Promise<Cycle>;
  getCycle(id: string): Promise<Cycle | undefined>;
  deleteCycle(id: string): Promise<boolean>;
  // Aliases para compatibilidade
  getMenstrualCycles(userId: string, limit?: number): Promise<Cycle[]>;
  getMenstrualCycle(id: string): Promise<Cycle | undefined>;
  createMenstrualCycle(cycle: InsertCycle): Promise<Cycle>;
  updateMenstrualCycle(id: string, data: Partial<InsertCycle>): Promise<Cycle>;
  deleteMenstrualCycle(id: string): Promise<boolean>;
  
  // Temperature operations
  createTemperature(temp: InsertBasalTemperature): Promise<BasalTemperature>;
  getUserTemperatures(userId: string, cycleId?: string, limit?: number): Promise<BasalTemperature[]>;
  getTemperature(id: string): Promise<BasalTemperature | undefined>;
  updateTemperature(id: string, data: Partial<InsertBasalTemperature>): Promise<BasalTemperature>;
  deleteTemperature(id: string): Promise<boolean>;
  // Aliases para compatibilidade
  getBasalTemperatures(userId: string, cycleId?: string, limit?: number): Promise<BasalTemperature[]>;
  getBasalTemperature(id: string): Promise<BasalTemperature | undefined>;
  createBasalTemperature(temp: InsertBasalTemperature): Promise<BasalTemperature>;
  updateBasalTemperature(id: string, data: Partial<InsertBasalTemperature>): Promise<BasalTemperature>;
  deleteBasalTemperature(id: string): Promise<boolean>;
  
  // Mucus operations
  createMucusObservation(mucus: InsertMucusObservation): Promise<MucusObservation>;
  getUserMucusObservations(userId: string, cycleId?: string, limit?: number): Promise<MucusObservation[]>;
  getMucusObservation(id: string): Promise<MucusObservation | undefined>;
  updateMucusObservation(id: string, data: Partial<InsertMucusObservation>): Promise<MucusObservation>;
  deleteMucusObservation(id: string): Promise<boolean>;
  // Aliases para compatibilidade
  getCervicalMucusEntries(userId: string, cycleId?: string, limit?: number): Promise<MucusObservation[]>;
  getCervicalMucus(id: string): Promise<MucusObservation | undefined>;
  createCervicalMucus(mucus: InsertMucusObservation): Promise<MucusObservation>;
  updateCervicalMucus(id: string, data: Partial<InsertMucusObservation>): Promise<MucusObservation>;
  deleteCervicalMucus(id: string): Promise<boolean>;
  
  // Fetal development operations
  getAllFetalDevelopment(): Promise<any[]>;
  getFetalDevelopmentByWeek(week: number): Promise<any | undefined>;
  
  // Pregnancy operations
  createPregnancy(pregnancy: InsertPregnancy): Promise<Pregnancy>;
  getActivePregnancy(userId: string): Promise<Pregnancy | undefined>;
  updatePregnancy(id: string, data: Partial<InsertPregnancy>): Promise<Pregnancy>;
  
  // Calculation operations
  createCalculation(calc: InsertCalculation): Promise<Calculation>;
  getUserCalculations(userId: string, type?: string, limit?: number): Promise<Calculation[]>;
  saveCalculatorHistory(userId: string, type: string, inputData: any, resultData: any): Promise<Calculation>;
  getCalculatorHistory(userId: string, type?: string): Promise<Calculation[]>;
  
  // Notification operations
  createNotification(notification: InsertNotification): Promise<Notification>;
  getUserNotifications(userId: string, unreadOnly?: boolean): Promise<Notification[]>;
  markNotificationRead(id: string): Promise<Notification>;
  
  // User update operations
  updateUser(userId: string, data: Partial<User>): Promise<User>;
  updateUserSubscription(userId: string, data: Partial<User>): Promise<User>;

  // Reimport / bulk upsert operations
  getDataStatus(userId: string): Promise<DataStatus>;
  bulkUpsertCycles(userId: string, records: Array<Omit<InsertCycle, 'userId'>>): Promise<ReimportResult>;
  bulkUpsertTemperatures(userId: string, records: Array<Omit<InsertBasalTemperature, 'userId'>>): Promise<ReimportResult>;
  bulkUpsertMucusObservations(userId: string, records: Array<Omit<InsertMucusObservation, 'userId'>>): Promise<ReimportResult>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserPlan(userId: string, plan: string, subscriptionId?: string): Promise<User> {
    const planData = await this.getPlan(plan);
    const [user] = await db
      .update(users)
      .set({
        plan,
        stripeSubscriptionId: subscriptionId,
        subscriptionStatus: subscriptionId ? 'active' : 'inactive',
        monthlyCredits: planData?.monthlyCredits || 5,
        usedCredits: 0,
        lastCreditReset: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserCredits(userId: string, credits: number): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        usedCredits: credits,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  // Plan operations
  async getPlan(id: string): Promise<Plan | undefined> {
    const [plan] = await db.select().from(plans).where(eq(plans.id, id));
    return plan;
  }

  async getAllPlans(): Promise<Plan[]> {
    return await db.select().from(plans);
  }

  async createPlan(planData: InsertPlan): Promise<Plan> {
    const [plan] = await db.insert(plans).values(planData).returning();
    return plan;
  }

  // Usage/Credits operations
  async checkUserCredits(userId: string): Promise<{ hasCredits: boolean; remaining: number }> {
    const user = await this.getUser(userId);
    if (!user) return { hasCredits: false, remaining: 0 };

    const monthlyCredits = user.monthlyCredits || 5;
    const usedCredits = user.usedCredits || 0;

    // Plano ilimitado
    if (monthlyCredits === -1) {
      return { hasCredits: true, remaining: -1 };
    }

    // Verificar se precisa resetar créditos mensais
    const now = new Date();
    const lastReset = user.lastCreditReset ? new Date(user.lastCreditReset) : now;
    const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceReset >= 30) {
      await this.resetMonthlyCredits(userId);
      return { hasCredits: true, remaining: monthlyCredits };
    }

    const remaining = monthlyCredits - usedCredits;
    return { hasCredits: remaining > 0, remaining };
  }

  async consumeCredit(userId: string, calculationType: string, data?: any): Promise<UsageHistory> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");

    const monthlyCredits = user.monthlyCredits || 5;
    const usedCredits = user.usedCredits || 0;
    const totalCalculations = user.totalCalculations || 0;

    // Se não é ilimitado, incrementa créditos usados
    if (monthlyCredits !== -1) {
      await db
        .update(users)
        .set({
          usedCredits: usedCredits + 1,
          totalCalculations: totalCalculations + 1,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));
    } else {
      // Apenas incrementa total de cálculos
      await db
        .update(users)
        .set({
          totalCalculations: totalCalculations + 1,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userId));
    }

    // Registra no histórico
    const [history] = await db
      .insert(usageHistory)
      .values({
        userId,
        calculationType,
        creditsUsed: 1,
        calculationData: data,
      })
      .returning();

    return history;
  }

  async resetMonthlyCredits(userId: string): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        usedCredits: 0,
        lastCreditReset: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getUserUsageHistory(userId: string, limit: number = 50): Promise<UsageHistory[]> {
    return await db
      .select()
      .from(usageHistory)
      .where(eq(usageHistory.userId, userId))
      .orderBy(desc(usageHistory.createdAt))
      .limit(limit);
  }

  // Cycle operations
  async createCycle(cycleData: InsertCycle): Promise<Cycle> {
    const [cycle] = await db.insert(cycles).values(cycleData).returning();
    return cycle;
  }

  async getUserCycles(userId: string, limit: number = 12): Promise<Cycle[]> {
    return await db
      .select()
      .from(cycles)
      .where(eq(cycles.userId, userId))
      .orderBy(desc(cycles.periodStart))
      .limit(limit);
  }

  async getCurrentCycle(userId: string): Promise<Cycle | undefined> {
    const [cycle] = await db
      .select()
      .from(cycles)
      .where(eq(cycles.userId, userId))
      .orderBy(desc(cycles.periodStart))
      .limit(1);
    return cycle;
  }

  async updateCycle(id: string, data: Partial<InsertCycle>): Promise<Cycle> {
    const [cycle] = await db
      .update(cycles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(cycles.id, id))
      .returning();
    return cycle;
  }

  async getCycle(id: string): Promise<Cycle | undefined> {
    const [cycle] = await db.select().from(cycles).where(eq(cycles.id, id));
    return cycle;
  }

  async deleteCycle(id: string): Promise<boolean> {
    const result = await db.delete(cycles).where(eq(cycles.id, id));
    return true;
  }

  // Aliases para compatibilidade com routes.ts
  async getMenstrualCycles(userId: string, limit?: number): Promise<Cycle[]> {
    return this.getUserCycles(userId, limit);
  }

  async getMenstrualCycle(id: string): Promise<Cycle | undefined> {
    return this.getCycle(id);
  }

  async createMenstrualCycle(cycle: InsertCycle): Promise<Cycle> {
    return this.createCycle(cycle);
  }

  async updateMenstrualCycle(id: string, data: Partial<InsertCycle>): Promise<Cycle> {
    return this.updateCycle(id, data);
  }

  async deleteMenstrualCycle(id: string): Promise<boolean> {
    return this.deleteCycle(id);
  }

  // Temperature operations
  async createTemperature(tempData: InsertBasalTemperature): Promise<BasalTemperature> {
    const [temp] = await db.insert(basalTemperatures).values(tempData).returning();
    return temp;
  }

  async getUserTemperatures(userId: string, cycleId?: string, limit: number = 30): Promise<BasalTemperature[]> {
    if (cycleId) {
      return await db
        .select()
        .from(basalTemperatures)
        .where(and(
          eq(basalTemperatures.userId, userId),
          eq(basalTemperatures.cycleId, cycleId)
        ))
        .orderBy(desc(basalTemperatures.date))
        .limit(limit);
    }
    
    return await db
      .select()
      .from(basalTemperatures)
      .where(eq(basalTemperatures.userId, userId))
      .orderBy(desc(basalTemperatures.date))
      .limit(limit);
  }

  async getTemperature(id: string): Promise<BasalTemperature | undefined> {
    const [temp] = await db.select().from(basalTemperatures).where(eq(basalTemperatures.id, id));
    return temp;
  }

  async updateTemperature(id: string, data: Partial<InsertBasalTemperature>): Promise<BasalTemperature> {
    const [temp] = await db
      .update(basalTemperatures)
      .set(data)
      .where(eq(basalTemperatures.id, id))
      .returning();
    return temp;
  }

  async deleteTemperature(id: string): Promise<boolean> {
    await db.delete(basalTemperatures).where(eq(basalTemperatures.id, id));
    return true;
  }

  // Aliases para compatibilidade
  async getBasalTemperatures(userId: string, cycleId?: string, limit?: number): Promise<BasalTemperature[]> {
    return this.getUserTemperatures(userId, cycleId, limit);
  }

  async getBasalTemperature(id: string): Promise<BasalTemperature | undefined> {
    return this.getTemperature(id);
  }

  async createBasalTemperature(temp: InsertBasalTemperature): Promise<BasalTemperature> {
    return this.createTemperature(temp);
  }

  async updateBasalTemperature(id: string, data: Partial<InsertBasalTemperature>): Promise<BasalTemperature> {
    return this.updateTemperature(id, data);
  }

  async deleteBasalTemperature(id: string): Promise<boolean> {
    return this.deleteTemperature(id);
  }

  // Mucus operations
  async createMucusObservation(mucusData: InsertMucusObservation): Promise<MucusObservation> {
    const [mucus] = await db.insert(mucusObservations).values(mucusData).returning();
    return mucus;
  }

  async getUserMucusObservations(userId: string, cycleId?: string, limit: number = 30): Promise<MucusObservation[]> {
    if (cycleId) {
      return await db
        .select()
        .from(mucusObservations)
        .where(and(
          eq(mucusObservations.userId, userId),
          eq(mucusObservations.cycleId, cycleId)
        ))
        .orderBy(desc(mucusObservations.date))
        .limit(limit);
    }
    
    return await db
      .select()
      .from(mucusObservations)
      .where(eq(mucusObservations.userId, userId))
      .orderBy(desc(mucusObservations.date))
      .limit(limit);
  }

  async getMucusObservation(id: string): Promise<MucusObservation | undefined> {
    const [mucus] = await db.select().from(mucusObservations).where(eq(mucusObservations.id, id));
    return mucus;
  }

  async updateMucusObservation(id: string, data: Partial<InsertMucusObservation>): Promise<MucusObservation> {
    const [mucus] = await db
      .update(mucusObservations)
      .set(data)
      .where(eq(mucusObservations.id, id))
      .returning();
    return mucus;
  }

  async deleteMucusObservation(id: string): Promise<boolean> {
    await db.delete(mucusObservations).where(eq(mucusObservations.id, id));
    return true;
  }

  // Aliases para compatibilidade
  async getCervicalMucusEntries(userId: string, cycleId?: string, limit?: number): Promise<MucusObservation[]> {
    return this.getUserMucusObservations(userId, cycleId, limit);
  }

  async getCervicalMucus(id: string): Promise<MucusObservation | undefined> {
    return this.getMucusObservation(id);
  }

  async createCervicalMucus(mucus: InsertMucusObservation): Promise<MucusObservation> {
    return this.createMucusObservation(mucus);
  }

  async updateCervicalMucus(id: string, data: Partial<InsertMucusObservation>): Promise<MucusObservation> {
    return this.updateMucusObservation(id, data);
  }

  async deleteCervicalMucus(id: string): Promise<boolean> {
    return this.deleteMucusObservation(id);
  }

  // Dados de desenvolvimento fetal (mock por enquanto)
  async getAllFetalDevelopment(): Promise<any[]> {
    // Retorna dados mock de desenvolvimento fetal
    return [];
  }

  async getFetalDevelopmentByWeek(week: number): Promise<any | undefined> {
    // Retorna dados mock para a semana específica
    return {
      week,
      size: "Dados em desenvolvimento",
      weight: "Dados em desenvolvimento",
      development: ["Dados em desenvolvimento"]
    };
  }

  // Pregnancy operations
  async createPregnancy(pregnancyData: InsertPregnancy): Promise<Pregnancy> {
    // Desativa outras gestações ativas
    await db
      .update(pregnancies)
      .set({ isActive: false })
      .where(and(
        eq(pregnancies.userId, pregnancyData.userId),
        eq(pregnancies.isActive, true)
      ));

    const [pregnancy] = await db.insert(pregnancies).values(pregnancyData).returning();
    return pregnancy;
  }

  async getActivePregnancy(userId: string): Promise<Pregnancy | undefined> {
    const [pregnancy] = await db
      .select()
      .from(pregnancies)
      .where(and(
        eq(pregnancies.userId, userId),
        eq(pregnancies.isActive, true)
      ))
      .limit(1);
    return pregnancy;
  }

  async updatePregnancy(id: string, data: Partial<InsertPregnancy>): Promise<Pregnancy> {
    const [pregnancy] = await db
      .update(pregnancies)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(pregnancies.id, id))
      .returning();
    return pregnancy;
  }

  // Calculation operations
  async createCalculation(calcData: InsertCalculation): Promise<Calculation> {
    const [calc] = await db.insert(calculations).values(calcData).returning();
    return calc;
  }

  async getUserCalculations(userId: string, type?: string, limit: number = 50): Promise<Calculation[]> {
    if (type) {
      return await db
        .select()
        .from(calculations)
        .where(and(
          eq(calculations.userId, userId),
          eq(calculations.type, type)
        ))
        .orderBy(desc(calculations.createdAt))
        .limit(limit);
    }
    
    return await db
      .select()
      .from(calculations)
      .where(eq(calculations.userId, userId))
      .orderBy(desc(calculations.createdAt))
      .limit(limit);
  }

  // Aliases para compatibilidade
  async saveCalculatorHistory(userId: string, type: string, inputData: any, resultData: any): Promise<Calculation> {
    return this.createCalculation({
      userId,
      type,
      inputData,
      resultData
    });
  }

  async getCalculatorHistory(userId: string, type?: string): Promise<Calculation[]> {
    return this.getUserCalculations(userId, type);
  }

  // Notification operations
  async createNotification(notificationData: InsertNotification): Promise<Notification> {
    const [notification] = await db.insert(notifications).values(notificationData).returning();
    return notification;
  }

  async getUserNotifications(userId: string, unreadOnly: boolean = false): Promise<Notification[]> {
    if (unreadOnly) {
      return await db
        .select()
        .from(notifications)
        .where(and(
          eq(notifications.userId, userId),
          eq(notifications.isRead, false)
        ))
        .orderBy(desc(notifications.createdAt))
        .limit(50);
    }
    
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(50);
  }

  async markNotificationRead(id: string): Promise<Notification> {
    const [notification] = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
      .returning();
    return notification;
  }

  // User update operations
  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async updateUserSubscription(userId: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return user;
  }

  async getDataStatus(userId: string): Promise<DataStatus> {
    const [cycleRow] = await db
      .select({ latest: max(cycles.createdAt) })
      .from(cycles)
      .where(eq(cycles.userId, userId));

    const [tempRow] = await db
      .select({ latest: max(basalTemperatures.createdAt) })
      .from(basalTemperatures)
      .where(eq(basalTemperatures.userId, userId));

    const [mucusRow] = await db
      .select({ latest: max(mucusObservations.createdAt) })
      .from(mucusObservations)
      .where(eq(mucusObservations.userId, userId));

    const [calcRow] = await db
      .select({ latest: max(calculations.createdAt) })
      .from(calculations)
      .where(eq(calculations.userId, userId));

    return {
      cycles: cycleRow?.latest ? cycleRow.latest.toISOString() : null,
      temperatures: tempRow?.latest ? tempRow.latest.toISOString() : null,
      mucus: mucusRow?.latest ? mucusRow.latest.toISOString() : null,
      calculations: calcRow?.latest ? calcRow.latest.toISOString() : null,
      lastSync: new Date().toISOString(),
    };
  }

  async bulkUpsertCycles(userId: string, records: Array<Omit<InsertCycle, 'userId'>>): Promise<ReimportResult> {
    const result: ReimportResult = { inserted: 0, updated: 0, skipped: 0, errors: [] };

    for (const record of records) {
      try {
        if (!record.periodStart) {
          result.errors.push({ record, error: 'periodStart é obrigatório' });
          result.skipped++;
          continue;
        }

        const [existing] = await db
          .select({ id: cycles.id })
          .from(cycles)
          .where(and(eq(cycles.userId, userId), eq(cycles.periodStart, record.periodStart)))
          .limit(1);

        if (existing) {
          await db
            .update(cycles)
            .set({ ...record, userId, updatedAt: new Date() })
            .where(eq(cycles.id, existing.id));
          result.updated++;
        } else {
          await db.insert(cycles).values({ ...record, userId });
          result.inserted++;
        }
      } catch (e) {
        result.errors.push({ record, error: String(e) });
        result.skipped++;
      }
    }

    return result;
  }

  async bulkUpsertTemperatures(userId: string, records: Array<Omit<InsertBasalTemperature, 'userId'>>): Promise<ReimportResult> {
    const result: ReimportResult = { inserted: 0, updated: 0, skipped: 0, errors: [] };

    for (const record of records) {
      try {
        if (!record.date || record.temperature === undefined) {
          result.errors.push({ record, error: 'date e temperature são obrigatórios' });
          result.skipped++;
          continue;
        }

        const [existing] = await db
          .select({ id: basalTemperatures.id })
          .from(basalTemperatures)
          .where(and(eq(basalTemperatures.userId, userId), eq(basalTemperatures.date, record.date)))
          .limit(1);

        if (existing) {
          await db
            .update(basalTemperatures)
            .set({ ...record, userId })
            .where(eq(basalTemperatures.id, existing.id));
          result.updated++;
        } else {
          await db.insert(basalTemperatures).values({ ...record, userId });
          result.inserted++;
        }
      } catch (e) {
        result.errors.push({ record, error: String(e) });
        result.skipped++;
      }
    }

    return result;
  }

  async bulkUpsertMucusObservations(userId: string, records: Array<Omit<InsertMucusObservation, 'userId'>>): Promise<ReimportResult> {
    const result: ReimportResult = { inserted: 0, updated: 0, skipped: 0, errors: [] };

    for (const record of records) {
      try {
        if (!record.date) {
          result.errors.push({ record, error: 'date é obrigatório' });
          result.skipped++;
          continue;
        }

        const [existing] = await db
          .select({ id: mucusObservations.id })
          .from(mucusObservations)
          .where(and(eq(mucusObservations.userId, userId), eq(mucusObservations.date, record.date)))
          .limit(1);

        if (existing) {
          await db
            .update(mucusObservations)
            .set({ ...record, userId })
            .where(eq(mucusObservations.id, existing.id));
          result.updated++;
        } else {
          await db.insert(mucusObservations).values({ ...record, userId });
          result.inserted++;
        }
      } catch (e) {
        result.errors.push({ record, error: String(e) });
        result.skipped++;
      }
    }

    return result;
  }
}

export const storage = new DatabaseStorage();