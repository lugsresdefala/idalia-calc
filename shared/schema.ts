import { pgTable, text, serial, integer, boolean, date } from "drizzle-orm/pg-core";
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

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCalculatorHistorySchema = createInsertSchema(calculatorHistory).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CalculatorHistory = typeof calculatorHistory.$inferSelect;
export type InsertCalculatorHistory = z.infer<typeof insertCalculatorHistorySchema>;
export type GestationalInput = z.infer<typeof gestationalInputSchema>;
export type FertilityInput = z.infer<typeof fertilityInputSchema>;
