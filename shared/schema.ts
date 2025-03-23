import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  companyName: true,
  email: true,
});

// Document schema
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull(), // e.g., "policy", "report", "assessment"
  content: text("content"),
  status: text("status").notNull().default("draft"), // "draft", "published", "archived"
  pageCount: integer("page_count").default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  userId: true,
  title: true,
  description: true,
  type: true,
  content: true,
  status: true,
  pageCount: true,
});

// Compliance regulations
export const regulations = pgTable("regulations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  requirements: json("requirements").$type<string[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRegulationSchema = createInsertSchema(regulations).pick({
  name: true,
  description: true,
  requirements: true,
});

// Compliance status
export const complianceStatus = pgTable("compliance_status", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  regulationId: integer("regulation_id").notNull(),
  score: integer("score").notNull().default(0), // 0-100
  status: text("status").notNull(), // "compliant", "partial", "critical"
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
  actionsNeeded: integer("actions_needed").default(0),
});

export const insertComplianceStatusSchema = createInsertSchema(complianceStatus).pick({
  userId: true,
  regulationId: true,
  score: true,
  status: true,
  actionsNeeded: true,
});

// Deadlines
export const deadlines = pgTable("deadlines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  priority: text("priority").notNull(), // "urgent", "medium", "low"
  status: text("status").notNull().default("pending"), // "pending", "completed", "overdue"
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertDeadlineSchema = createInsertSchema(deadlines).pick({
  userId: true,
  title: true,
  description: true,
  dueDate: true,
  priority: true,
  status: true,
});

// Activity log
export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(),
  details: text("details"),
  activityType: text("activity_type").notNull(), // "document", "compliance", "alert", "completed"
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const insertActivityLogSchema = createInsertSchema(activityLogs).pick({
  userId: true,
  action: true,
  details: true,
  activityType: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type Regulation = typeof regulations.$inferSelect;
export type InsertRegulation = z.infer<typeof insertRegulationSchema>;

export type ComplianceStatus = typeof complianceStatus.$inferSelect;
export type InsertComplianceStatus = z.infer<typeof insertComplianceStatusSchema>;

export type Deadline = typeof deadlines.$inferSelect;
export type InsertDeadline = z.infer<typeof insertDeadlineSchema>;

export type ActivityLog = typeof activityLogs.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
