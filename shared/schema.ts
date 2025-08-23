import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  integer,
  boolean,
  text,
  real,
  date,
  decimal
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - OBRIGATÓRIO para autenticação
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)]
);

// User storage table - Sistema de usuários completo
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  
  // Campos de assinatura
  plan: varchar("plan").default("free"), // free, basic, pro, clinic
  stripeCustomerId: varchar("stripe_customer_id"),
  stripeSubscriptionId: varchar("stripe_subscription_id"),
  subscriptionStatus: varchar("subscription_status").default("inactive"), // active, inactive, cancelled, past_due
  subscriptionEndDate: timestamp("subscription_end_date"),
  
  // Controle de uso/créditos
  monthlyCredits: integer("monthly_credits").default(5), // créditos mensais disponíveis
  usedCredits: integer("used_credits").default(0), // créditos usados no mês
  totalCalculations: integer("total_calculations").default(0), // total histórico
  lastCreditReset: timestamp("last_credit_reset").defaultNow(),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Planos de assinatura
export const plans = pgTable("plans", {
  id: varchar("id").primaryKey(),
  name: varchar("name").notNull(),
  description: text("description"),
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull(),
  yearlyPrice: decimal("yearly_price", { precision: 10, scale: 2 }),
  monthlyCredits: integer("monthly_credits").notNull(), // -1 para ilimitado
  features: jsonb("features").$type<string[]>().notNull(),
  stripePriceIdMonthly: varchar("stripe_price_id_monthly"),
  stripePriceIdYearly: varchar("stripe_price_id_yearly"),
  popular: boolean("popular").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Histórico de uso/consumo
export const usageHistory = pgTable("usage_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  calculationType: varchar("calculation_type").notNull(), // fertility, gestational, analysis
  creditsUsed: integer("credits_used").default(1),
  calculationData: jsonb("calculation_data"), // dados do cálculo realizado
  createdAt: timestamp("created_at").defaultNow(),
});

// Ciclos menstruais - Dados de fertilidade
export const cycles = pgTable("cycles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  periodStart: date("period_start").notNull(),
  periodEnd: date("period_end"),
  cycleLength: integer("cycle_length").default(28),
  ovulationDate: date("ovulation_date"),
  fertileStart: date("fertile_start"),
  fertileEnd: date("fertile_end"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Temperatura basal
export const basalTemperatures = pgTable("basal_temperatures", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  cycleId: varchar("cycle_id").references(() => cycles.id),
  date: date("date").notNull(),
  temperature: real("temperature").notNull(),
  time: varchar("time"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Análise de muco cervical
export const mucusObservations = pgTable("mucus_observations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  cycleId: varchar("cycle_id").references(() => cycles.id),
  date: date("date").notNull(),
  consistency: varchar("consistency"), // dry, sticky, creamy, watery, eggwhite
  amount: varchar("amount"), // none, light, moderate, heavy
  color: varchar("color"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Gestações
export const pregnancies = pgTable("pregnancies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  lmpDate: date("lmp_date"), // última menstruação
  dueDate: date("due_date"),
  conceptionDate: date("conception_date"),
  currentWeek: integer("current_week"),
  currentDay: integer("current_day"),
  notes: text("notes"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Histórico de cálculos
export const calculations = pgTable("calculations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(), // fertility, gestational
  inputData: jsonb("input_data").notNull(),
  resultData: jsonb("result_data").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Notificações
export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: varchar("type").notNull(), // reminder, alert, info, promotion
  title: varchar("title").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  actionUrl: varchar("action_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relações
export const usersRelations = relations(users, ({ many }) => ({
  cycles: many(cycles),
  temperatures: many(basalTemperatures),
  mucusObservations: many(mucusObservations),
  pregnancies: many(pregnancies),
  calculations: many(calculations),
  notifications: many(notifications),
  usageHistory: many(usageHistory),
}));

export const cyclesRelations = relations(cycles, ({ one, many }) => ({
  user: one(users, {
    fields: [cycles.userId],
    references: [users.id],
  }),
  temperatures: many(basalTemperatures),
  mucusObservations: many(mucusObservations),
}));

// Types e Schemas
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type Plan = typeof plans.$inferSelect;
export type InsertPlan = typeof plans.$inferInsert;

export type Cycle = typeof cycles.$inferSelect;
export type InsertCycle = typeof cycles.$inferInsert;

export type BasalTemperature = typeof basalTemperatures.$inferSelect;
export type InsertBasalTemperature = typeof basalTemperatures.$inferInsert;

export type MucusObservation = typeof mucusObservations.$inferSelect;
export type InsertMucusObservation = typeof mucusObservations.$inferInsert;

export type Pregnancy = typeof pregnancies.$inferSelect;
export type InsertPregnancy = typeof pregnancies.$inferInsert;

export type Calculation = typeof calculations.$inferSelect;
export type InsertCalculation = typeof calculations.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;

export type UsageHistory = typeof usageHistory.$inferSelect;
export type InsertUsageHistory = typeof usageHistory.$inferInsert;

// Schemas de validação
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCycleSchema = createInsertSchema(cycles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTemperatureSchema = createInsertSchema(basalTemperatures).omit({
  id: true,
  createdAt: true,
});

export const insertMucusSchema = createInsertSchema(mucusObservations).omit({
  id: true,
  createdAt: true,
});

export const insertPregnancySchema = createInsertSchema(pregnancies).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCalculationSchema = createInsertSchema(calculations).omit({
  id: true,
  createdAt: true,
});