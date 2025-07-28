import { sql } from 'drizzle-orm';
import { pgTable, text, serial, integer, boolean, date, timestamp, numeric, varchar, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - MANDATORY for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - MANDATORY for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  // Additional fields for payment system
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  tokens: integer("tokens").default(0),
  subscriptionStatus: varchar("subscription_status").default('free'),
  subscriptionEndDate: timestamp("subscription_end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Calculator history to save previous calculations
export const calculatorHistory = pgTable("calculator_history", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  calculatorType: text("calculator_type").notNull(), // "gestational" or "fertility"
  inputData: text("input_data").notNull(), // JSON string of input data
  resultData: text("result_data").notNull(), // JSON string of calculation result
  createdAt: date("created_at").notNull().defaultNow(),
});

// Nova tabela para armazenar histórico de ciclos menstruais
export const menstrualCycles = pgTable("menstrual_cycles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
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
  userId: varchar("user_id").references(() => users.id),
  measurementDate: date("measurement_date").notNull(),
  temperature: numeric("temperature").notNull(), // 36.5
  measurementTime: text("measurement_time"), // "07:30"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Nova tabela para armazenar análises de muco cervical
export const cervicalMucus = pgTable("cervical_mucus", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
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

// Payment tokens table
export const paymentTokens = pgTable("payment_tokens", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  amount: integer("amount").notNull(),
  type: varchar("type").notNull(), // "purchase" or "used"
  description: text("description"),
  stripePaymentIntentId: varchar("stripe_payment_intent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Subscription history table
export const subscriptionHistory = pgTable("subscription_history", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  status: varchar("status").notNull(), // "active", "cancelled", "expired"
  plan: varchar("plan").notNull(), // "monthly", "annual"
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  cancelledAt: timestamp("cancelled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

// Insert schemas (removed old insertUserSchema since we use upsertUserSchema for Replit Auth)

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

// Upsert user schema
export const upsertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
  tokens: true,
  subscriptionStatus: true,
  subscriptionEndDate: true,
});

// Insert token history schema
export const insertTokenSchema = createInsertSchema(paymentTokens).omit({
  id: true,
  createdAt: true,
});

// Insert subscription history schema
export const insertSubscriptionSchema = createInsertSchema(subscriptionHistory).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = z.infer<typeof upsertUserSchema>;
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
export type PaymentToken = typeof paymentTokens.$inferSelect;
export type InsertPaymentToken = z.infer<typeof insertTokenSchema>;
export type SubscriptionHistory = typeof subscriptionHistory.$inferSelect;
export type InsertSubscriptionHistory = z.infer<typeof insertSubscriptionSchema>;
