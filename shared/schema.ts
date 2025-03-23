import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  companyName: text("company_name").notNull(),
  email: text("email").notNull(),
  role: text("role").default("user"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  companyName: true,
  email: true,
  role: true,
});

// Documents table
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  content: text("content"),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  userId: true,
  title: true,
  type: true,
  content: true,
  status: true,
});

// Compliance Framework table
export const frameworks = pgTable("frameworks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  complianceScore: integer("compliance_score").default(0),
  status: text("status").default("not_started"),
});

export const insertFrameworkSchema = createInsertSchema(frameworks).pick({
  userId: true,
  name: true,
  description: true,
  complianceScore: true,
  status: true,
});

// Compliance Tasks table
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  frameworkId: integer("framework_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  status: text("status").default("not_started"),
  priority: text("priority").default("medium"),
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  userId: true,
  frameworkId: true,
  name: true,
  description: true,
  dueDate: true,
  status: true,
  priority: true,
});

// Notifications table
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  type: text("type").default("info"),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNotificationSchema = createInsertSchema(notifications).pick({
  userId: true,
  title: true,
  message: true,
  type: true,
  read: true,
});

// Activity Log table
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: integer("entity_id"),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  userId: true,
  action: true,
  entityType: true,
  entityId: true,
  details: true,
});

// Framework Requirements table
export const requirements = pgTable("requirements", {
  id: serial("id").primaryKey(),
  frameworkId: integer("framework_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").default("not_started"),
});

export const insertRequirementSchema = createInsertSchema(requirements).pick({
  frameworkId: true,
  name: true,
  description: true,
  status: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertFramework = z.infer<typeof insertFrameworkSchema>;
export type Framework = typeof frameworks.$inferSelect;

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type Notification = typeof notifications.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

export type InsertRequirement = z.infer<typeof insertRequirementSchema>;
export type Requirement = typeof requirements.$inferSelect;
