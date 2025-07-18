import { pgTable, text, serial, integer, boolean, date, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Original users table kept for reference
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Calculator history to save previous calculations
export const calculatorHistory = pgTable("calculator_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  calculatorType: text("calculator_type").notNull(), // "gestational" or "fertility"
  inputData: text("input_data").notNull(), // JSON string of input data
  resultData: text("result_data").notNull(), // JSON string of calculation result
  createdAt: date("created_at").notNull().defaultNow(),
});

// Nova tabela para armazenar histórico de ciclos menstruais
export const menstrualCycles = pgTable("menstrual_cycles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  periodStartDate: date("period_start_date").notNull(),
  periodEndDate: date("period_end_date").notNull(),
  cycleLength: integer("cycle_length").notNull(),
  periodLength: integer("period_length").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Nova tabela para armazenar temperaturas basais
export const basalTemperatures = pgTable("basal_temperatures", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  measurementDate: date("measurement_date").notNull(),
  temperature: numeric("temperature").notNull(), // 36.5
  measurementTime: text("measurement_time"), // "07:30"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Nova tabela para armazenar análises de muco cervical
export const cervicalMucus = pgTable("cervical_mucus", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  observationDate: date("observation_date").notNull(),
  consistency: text("consistency"), // "creamy", "stretchy", "watery", etc.
  amount: text("amount"), // "light", "moderate", "heavy"
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Nova tabela para armazenar marcos de desenvolvimento fetal por semana
export const fetalDevelopment = pgTable("fetal_development", {
  id: serial("id").primaryKey(),
  week: integer("week").notNull().unique(),
  developmentDescription: text("development_description").notNull(),
  maternalChanges: text("maternal_changes"),
  recommendedExams: text("recommended_exams"),
  importantMilestones: text("important_milestones"),
  vaccineRecommendations: text("vaccine_recommendations"),
  size: text("size"), // "Tamanho de uma uva"
  weight: text("weight"), // "Aproximadamente 10g"
});

// Schemas for validation
export const gestationalInputSchema = z.object({
  calculationType: z.enum(["lmp", "ultrasound", "transfer"]),
  date: z.string().min(1),
  ultrasoundWeeks: z.number().optional(),
  ultrasoundDays: z.number().optional(),
  embryoDays: z.number().optional(),
});

export const fertilityInputSchema = z.object({
  periodStart: z.string().min(1),
  periodEnd: z.string().min(1),
  cycleLength: z.number().min(21).max(45).default(28),
});

// Esquema para histórico de ciclos menstruais
export const menstrualCycleSchema = z.object({
  periodStartDate: z.string().min(1),
  periodEndDate: z.string().min(1),
  cycleLength: z.number().min(21).max(45),
  periodLength: z.number().min(1).max(10),
  notes: z.string().optional(),
});

// Esquema para temperatura basal
export const basalTemperatureSchema = z.object({
  measurementDate: z.string().min(1),
  temperature: z.number().min(35).max(38),
  measurementTime: z.string().optional(),
});

// Esquema para muco cervical
export const cervicalMucusSchema = z.object({
  observationDate: z.string().min(1),
  consistency: z.string().optional(),
  amount: z.string().optional(),
  notes: z.string().optional(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCalculatorHistorySchema = createInsertSchema(calculatorHistory).omit({
  id: true,
  createdAt: true,
});

export const insertMenstrualCycleSchema = createInsertSchema(menstrualCycles).omit({
  id: true,
  createdAt: true,
});

export const insertBasalTemperatureSchema = createInsertSchema(basalTemperatures).omit({
  id: true,
  createdAt: true,
});

export const insertCervicalMucusSchema = createInsertSchema(cervicalMucus).omit({
  id: true,
  createdAt: true,
});

export const insertFetalDevelopmentSchema = createInsertSchema(fetalDevelopment).omit({
  id: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CalculatorHistory = typeof calculatorHistory.$inferSelect;
export type InsertCalculatorHistory = z.infer<typeof insertCalculatorHistorySchema>;
export type GestationalInput = z.infer<typeof gestationalInputSchema>;
export type FertilityInput = z.infer<typeof fertilityInputSchema>;
export type MenstrualCycle = typeof menstrualCycles.$inferSelect;
export type InsertMenstrualCycle = z.infer<typeof insertMenstrualCycleSchema>;
export type BasalTemperature = typeof basalTemperatures.$inferSelect;
export type InsertBasalTemperature = z.infer<typeof insertBasalTemperatureSchema>;
export type CervicalMucus = typeof cervicalMucus.$inferSelect;
export type InsertCervicalMucus = z.infer<typeof insertCervicalMucusSchema>;
export type FetalDevelopment = typeof fetalDevelopment.$inferSelect;
export type InsertFetalDevelopment = z.infer<typeof insertFetalDevelopmentSchema>;
export type CervicalMucus = typeof cervicalMucus.$inferSelect;
export type InsertCervicalMucus = z.infer<typeof insertCervicalMucusSchema>;
export type FetalDevelopment = typeof fetalDevelopment.$inferSelect;
export type InsertFetalDevelopment = z.infer<typeof insertFetalDevelopmentSchema>;
