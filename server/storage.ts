import { 
  users, 
  menstrualCycles,
  basalTemperatures,
  cervicalMucus,
  fetalDevelopment,
  calculatorHistory,
  paymentTokens,
  subscriptionHistory,
  type User, 
  type UpsertUser,
  type MenstrualCycle,
  type InsertMenstrualCycle,
  type BasalTemperature,
  type InsertBasalTemperature,
  type CervicalMucus,
  type InsertCervicalMucus,
  type FetalDevelopment,
  type InsertFetalDevelopment,
  type CalculatorHistory,
  type InsertCalculatorHistory,
  type PaymentToken,
  type InsertPaymentToken,
  type SubscriptionHistory,
  type InsertSubscriptionHistory
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

// Interface de armazenamento expandida com as novas funcionalidades
export interface IStorage {
  // Usuários - MANDATORY for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Ciclos menstruais
  getMenstrualCycles(userId: string): Promise<MenstrualCycle[]>;
  getMenstrualCycle(id: number): Promise<MenstrualCycle | undefined>;
  createMenstrualCycle(cycle: InsertMenstrualCycle): Promise<MenstrualCycle>;
  updateMenstrualCycle(id: number, cycle: Partial<InsertMenstrualCycle>): Promise<MenstrualCycle | undefined>;
  deleteMenstrualCycle(id: number): Promise<boolean>;
  
  // Temperaturas basais
  getBasalTemperatures(userId: string): Promise<BasalTemperature[]>;
  getBasalTemperature(id: number): Promise<BasalTemperature | undefined>;
  createBasalTemperature(temp: InsertBasalTemperature): Promise<BasalTemperature>;
  updateBasalTemperature(id: number, temp: Partial<InsertBasalTemperature>): Promise<BasalTemperature | undefined>;
  deleteBasalTemperature(id: number): Promise<boolean>;
  
  // Muco cervical
  getCervicalMucusEntries(userId: string): Promise<CervicalMucus[]>;
  getCervicalMucus(id: number): Promise<CervicalMucus | undefined>;
  createCervicalMucus(mucus: InsertCervicalMucus): Promise<CervicalMucus>;
  updateCervicalMucus(id: number, mucus: Partial<InsertCervicalMucus>): Promise<CervicalMucus | undefined>;
  deleteCervicalMucus(id: number): Promise<boolean>;
  
  // Desenvolvimento fetal
  getAllFetalDevelopment(): Promise<FetalDevelopment[]>;
  getFetalDevelopmentByWeek(week: number): Promise<FetalDevelopment | undefined>;
  createFetalDevelopment(development: InsertFetalDevelopment): Promise<FetalDevelopment>;
  updateFetalDevelopment(id: number, development: Partial<InsertFetalDevelopment>): Promise<FetalDevelopment | undefined>;
  
  // Histórico de cálculos
  getCalculatorHistory(userId: string): Promise<CalculatorHistory[]>;
  saveCalculatorHistory(history: InsertCalculatorHistory): Promise<CalculatorHistory>;
  
  // Tokens de pagamento
  getUserTokens(userId: string): Promise<number>;
  addTokens(userId: string, amount: number, description: string, stripePaymentIntentId?: string): Promise<PaymentToken>;
  useTokens(userId: string, amount: number, description: string): Promise<PaymentToken | null>;
  
  // Assinaturas
  updateUserStripeInfo(userId: string, stripeCustomerId?: string, stripeSubscriptionId?: string): Promise<User>;
  updateUserSubscription(userId: string, status: string, endDate?: Date): Promise<User>;
  createSubscriptionHistory(sub: InsertSubscriptionHistory): Promise<SubscriptionHistory>;
}

// Implementação de armazenamento usando PostgreSQL
export class DatabaseStorage implements IStorage {
  // Usuários - MANDATORY for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
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


  
  // Ciclos menstruais
  async getMenstrualCycles(userId: string): Promise<MenstrualCycle[]> {
    return await db
      .select()
      .from(menstrualCycles)
      .where(eq(menstrualCycles.userId, userId))
      .orderBy(desc(menstrualCycles.periodStartDate));
  }
  
  async getMenstrualCycle(id: number): Promise<MenstrualCycle | undefined> {
    const [cycle] = await db
      .select()
      .from(menstrualCycles)
      .where(eq(menstrualCycles.id, id));
    return cycle;
  }
  
  async createMenstrualCycle(cycle: InsertMenstrualCycle): Promise<MenstrualCycle> {
    const [newCycle] = await db
      .insert(menstrualCycles)
      .values(cycle)
      .returning();
    return newCycle;
  }
  
  async updateMenstrualCycle(id: number, cycle: Partial<InsertMenstrualCycle>): Promise<MenstrualCycle | undefined> {
    const [updatedCycle] = await db
      .update(menstrualCycles)
      .set(cycle)
      .where(eq(menstrualCycles.id, id))
      .returning();
    return updatedCycle;
  }
  
  async deleteMenstrualCycle(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(menstrualCycles)
      .where(eq(menstrualCycles.id, id))
      .returning();
    return !!deleted;
  }
  
  // Temperaturas basais
  async getBasalTemperatures(userId: string): Promise<BasalTemperature[]> {
    return await db
      .select()
      .from(basalTemperatures)
      .where(eq(basalTemperatures.userId, userId))
      .orderBy(desc(basalTemperatures.measurementDate));
  }
  
  async getBasalTemperature(id: number): Promise<BasalTemperature | undefined> {
    const [temp] = await db
      .select()
      .from(basalTemperatures)
      .where(eq(basalTemperatures.id, id));
    return temp;
  }
  
  async createBasalTemperature(temp: InsertBasalTemperature): Promise<BasalTemperature> {
    const [newTemp] = await db
      .insert(basalTemperatures)
      .values(temp)
      .returning();
    return newTemp;
  }
  
  async updateBasalTemperature(id: number, temp: Partial<InsertBasalTemperature>): Promise<BasalTemperature | undefined> {
    const [updatedTemp] = await db
      .update(basalTemperatures)
      .set(temp)
      .where(eq(basalTemperatures.id, id))
      .returning();
    return updatedTemp;
  }
  
  async deleteBasalTemperature(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(basalTemperatures)
      .where(eq(basalTemperatures.id, id))
      .returning();
    return !!deleted;
  }
  
  // Muco cervical
  async getCervicalMucusEntries(userId: string): Promise<CervicalMucus[]> {
    return await db
      .select()
      .from(cervicalMucus)
      .where(eq(cervicalMucus.userId, userId))
      .orderBy(desc(cervicalMucus.observationDate));
  }
  
  async getCervicalMucus(id: number): Promise<CervicalMucus | undefined> {
    const [mucus] = await db
      .select()
      .from(cervicalMucus)
      .where(eq(cervicalMucus.id, id));
    return mucus;
  }
  
  async createCervicalMucus(mucus: InsertCervicalMucus): Promise<CervicalMucus> {
    const [newMucus] = await db
      .insert(cervicalMucus)
      .values(mucus)
      .returning();
    return newMucus;
  }
  
  async updateCervicalMucus(id: number, mucus: Partial<InsertCervicalMucus>): Promise<CervicalMucus | undefined> {
    const [updatedMucus] = await db
      .update(cervicalMucus)
      .set(mucus)
      .where(eq(cervicalMucus.id, id))
      .returning();
    return updatedMucus;
  }
  
  async deleteCervicalMucus(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(cervicalMucus)
      .where(eq(cervicalMucus.id, id))
      .returning();
    return !!deleted;
  }
  
  // Desenvolvimento fetal
  async getAllFetalDevelopment(): Promise<FetalDevelopment[]> {
    return await db
      .select()
      .from(fetalDevelopment)
      .orderBy(fetalDevelopment.week);
  }
  
  async getFetalDevelopmentByWeek(week: number): Promise<FetalDevelopment | undefined> {
    const [development] = await db
      .select()
      .from(fetalDevelopment)
      .where(eq(fetalDevelopment.week, week));
    return development;
  }
  
  async createFetalDevelopment(development: InsertFetalDevelopment): Promise<FetalDevelopment> {
    const [newDevelopment] = await db
      .insert(fetalDevelopment)
      .values(development)
      .returning();
    return newDevelopment;
  }
  
  async updateFetalDevelopment(id: number, development: Partial<InsertFetalDevelopment>): Promise<FetalDevelopment | undefined> {
    const [updatedDevelopment] = await db
      .update(fetalDevelopment)
      .set(development)
      .where(eq(fetalDevelopment.id, id))
      .returning();
    return updatedDevelopment;
  }
  
  // Histórico de cálculos já implementado abaixo

  // Tokens de pagamento
  async getUserTokens(userId: string): Promise<number> {
    const user = await this.getUser(userId);
    return user?.tokens || 0;
  }

  async addTokens(userId: string, amount: number, description: string, stripePaymentIntentId?: string): Promise<PaymentToken> {
    // Adiciona tokens ao usuário
    await db
      .update(users)
      .set({ 
        tokens: sql`${users.tokens} + ${amount}`,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId));

    // Registra a transação
    const [token] = await db
      .insert(paymentTokens)
      .values({
        userId,
        amount,
        type: 'purchase',
        description,
        stripePaymentIntentId
      })
      .returning();
    
    return token;
  }

  async useTokens(userId: string, amount: number, description: string): Promise<PaymentToken | null> {
    const currentTokens = await this.getUserTokens(userId);
    
    if (currentTokens < amount) {
      return null; // Tokens insuficientes
    }

    // Remove tokens do usuário
    await db
      .update(users)
      .set({ 
        tokens: sql`${users.tokens} - ${amount}`,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId));

    // Registra o uso
    const [token] = await db
      .insert(paymentTokens)
      .values({
        userId,
        amount: -amount,
        type: 'used',
        description
      })
      .returning();
    
    return token;
  }

  // Assinaturas
  async updateUserStripeInfo(userId: string, stripeCustomerId?: string, stripeSubscriptionId?: string): Promise<User> {
    const updateData: any = { updatedAt: new Date() };
    if (stripeCustomerId) updateData.stripeCustomerId = stripeCustomerId;
    if (stripeSubscriptionId) updateData.stripeSubscriptionId = stripeSubscriptionId;

    const [user] = await db
      .update(users)
      .set(updateData)
      .where(eq(users.id, userId))
      .returning();
    
    return user;
  }

  async updateUserSubscription(userId: string, status: string, endDate?: Date): Promise<User> {
    const [user] = await db
      .update(users)
      .set({
        subscriptionStatus: status,
        subscriptionEndDate: endDate,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    
    return user;
  }

  async createSubscriptionHistory(sub: InsertSubscriptionHistory): Promise<SubscriptionHistory> {
    const [history] = await db
      .insert(subscriptionHistory)
      .values(sub)
      .returning();
    
    return history;
  }
  
  // Histórico de cálculos - implementação movida para cá
  async saveCalculatorHistory(data: InsertCalculatorHistory): Promise<CalculatorHistory> {
    const [history] = await db
      .insert(calculatorHistory)
      .values(data)
      .returning();
    return history;
  }
  
  // Buscar histórico de cálculos
  async getCalculatorHistory(userId: string): Promise<CalculatorHistory[]> {
    return await db
      .select()
      .from(calculatorHistory)
      .where(eq(calculatorHistory.userId, userId))
      .orderBy(desc(calculatorHistory.createdAt));
  }
}

// Mantém a interface existente, mas muda para o armazenamento de banco de dados
export const storage = new DatabaseStorage();
