import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  companyName: text("company_name"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  status: text("status").notNull(), // 'draft', 'in-review', 'approved'
  regulation: text("regulation"), // 'GDPR', 'CCPA', 'HIPAA'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const deadlines = pgTable("deadlines", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date").notNull(),
  status: text("status").notNull(), // 'upcoming', 'overdue', 'completed'
  type: text("type"), // 'event', 'priority', 'assignment', 'security'
  createdAt: timestamp("created_at").defaultNow(),
});

export const complianceIssues = pgTable("compliance_issues", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  regulation: text("regulation").notNull(), // 'GDPR', 'CCPA', 'HIPAA'
  severity: text("severity").notNull(), // 'critical', 'high', 'medium', 'low'
  status: text("status").notNull(), // 'pending', 'in-progress', 'completed', 'not-started'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  companyName: true,
  email: true,
}).partial({
  companyName: true,
  email: true,
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertDeadlineSchema = createInsertSchema(deadlines).omit({
  id: true,
  createdAt: true,
});

export const insertComplianceIssueSchema = createInsertSchema(complianceIssues).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Document = typeof documents.$inferSelect;
export type Deadline = typeof deadlines.$inferSelect;
export type ComplianceIssue = typeof complianceIssues.$inferSelect;
