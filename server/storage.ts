import { 
  users, 
  menstrualCycles,
  basalTemperatures,
  cervicalMucus,
  fetalDevelopment,
  calculatorHistory,
  type User, 
  type InsertUser,
  type MenstrualCycle,
  type InsertMenstrualCycle,
  type BasalTemperature,
  type InsertBasalTemperature,
  type CervicalMucus,
  type InsertCervicalMucus,
  type FetalDevelopment,
  type InsertFetalDevelopment,
  type CalculatorHistory,
  type InsertCalculatorHistory
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Interface de armazenamento expandida com as novas funcionalidades
export interface IStorage {
  // Usuários
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Ciclos menstruais
  getMenstrualCycles(userId: number): Promise<MenstrualCycle[]>;
  getMenstrualCycle(id: number): Promise<MenstrualCycle | undefined>;
  createMenstrualCycle(cycle: InsertMenstrualCycle): Promise<MenstrualCycle>;
  updateMenstrualCycle(id: number, cycle: Partial<InsertMenstrualCycle>): Promise<MenstrualCycle | undefined>;
  deleteMenstrualCycle(id: number): Promise<boolean>;
  
  // Temperaturas basais
  getBasalTemperatures(userId: number): Promise<BasalTemperature[]>;
  getBasalTemperature(id: number): Promise<BasalTemperature | undefined>;
  createBasalTemperature(temp: InsertBasalTemperature): Promise<BasalTemperature>;
  updateBasalTemperature(id: number, temp: Partial<InsertBasalTemperature>): Promise<BasalTemperature | undefined>;
  deleteBasalTemperature(id: number): Promise<boolean>;
  
  // Muco cervical
  getCervicalMucusEntries(userId: number): Promise<CervicalMucus[]>;
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
  getCalculatorHistory(userId: number): Promise<CalculatorHistory[]>;
  saveCalculatorHistory(history: InsertCalculatorHistory): Promise<CalculatorHistory>;
}

// Implementação de armazenamento usando PostgreSQL
export class DatabaseStorage implements IStorage {
  // Usuários
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Ciclos menstruais
  async getMenstrualCycles(userId: number): Promise<MenstrualCycle[]> {
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
  async getBasalTemperatures(userId: number): Promise<BasalTemperature[]> {
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
  async getCervicalMucusEntries(userId: number): Promise<CervicalMucus[]> {
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
  
  // Histórico de cálculos
  async getCalculatorHistory(userId: number): Promise<CalculatorHistory[]> {
    return await db
      .select()
      .from(calculatorHistory)
      .where(eq(calculatorHistory.userId, userId))
      .orderBy(desc(calculatorHistory.createdAt));
  }
  
  async saveCalculatorHistory(history: InsertCalculatorHistory): Promise<CalculatorHistory> {
    const [newHistory] = await db
      .insert(calculatorHistory)
      .values(history)
      .returning();
    return newHistory;
  }
}

// Mantém a interface existente, mas muda para o armazenamento de banco de dados
export const storage = new DatabaseStorage();
