import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { documents, frameworks, tasks, insertTaskSchema, insertDocumentSchema, insertNotificationSchema, insertActivitySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Get user dashboard data
  app.get("/api/dashboard", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const userId = req.user!.id;
      
      // Get frameworks for user
      const frameworks = await storage.getFrameworks(userId);
      
      // Get tasks for user
      const tasks = await storage.getTasks(userId);
      
      // Get notifications for user
      const notifications = await storage.getNotifications(userId);
      
      // Get recent activities
      const activities = await storage.getActivities(userId, 5);
      
      // Get recent documents
      const documents = await storage.getDocuments(userId);
      const recentDocuments = documents
        .sort((a, b) => (b.updatedAt?.getTime() || 0) - (a.updatedAt?.getTime() || 0))
        .slice(0, 5);
      
      // Calculate overall compliance score
      const overallScore = frameworks.length > 0
        ? Math.round(frameworks.reduce((sum, fw) => sum + fw.complianceScore, 0) / frameworks.length)
        : 0;
      
      res.json({
        overallScore,
        frameworks,
        tasks,
        notifications: notifications.filter(n => !n.read).slice(0, 5),
        activities,
        recentDocuments
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching dashboard data" });
    }
  });

  // Get all frameworks for a user
  app.get("/api/frameworks", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const userId = req.user!.id;
      const frameworks = await storage.getFrameworks(userId);
      res.json(frameworks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching frameworks" });
    }
  });

  // Get a specific framework with its requirements
  app.get("/api/frameworks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const frameworkId = parseInt(req.params.id);
      const framework = await storage.getFramework(frameworkId);
      
      if (!framework) {
        return res.status(404).json({ message: "Framework not found" });
      }
      
      if (framework.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const requirements = await storage.getRequirements(frameworkId);
      const tasks = await storage.getTasksByFramework(frameworkId);
      
      res.json({
        ...framework,
        requirements,
        tasks
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching framework" });
    }
  });

  // Update framework
  app.patch("/api/frameworks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const frameworkId = parseInt(req.params.id);
      const framework = await storage.getFramework(frameworkId);
      
      if (!framework) {
        return res.status(404).json({ message: "Framework not found" });
      }
      
      if (framework.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const updatedFramework = await storage.updateFramework(frameworkId, req.body);
      
      // Log the activity
      await storage.createActivity({
        userId: req.user!.id,
        action: "update",
        entityType: "framework",
        entityId: frameworkId,
        details: `Updated framework: ${framework.name}`
      });
      
      res.json(updatedFramework);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error updating framework" });
    }
  });

  // Get all documents for a user
  app.get("/api/documents", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const userId = req.user!.id;
      const documents = await storage.getDocuments(userId);
      res.json(documents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching documents" });
    }
  });

  // Get a specific document
  app.get("/api/documents/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const documentId = parseInt(req.params.id);
      const document = await storage.getDocument(documentId);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      if (document.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      res.json(document);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching document" });
    }
  });

  // Create a document
  app.post("/api/documents", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const userId = req.user!.id;
      const documentData = insertDocumentSchema.parse({
        ...req.body,
        userId
      });
      
      const document = await storage.createDocument(documentData);
      
      // Log the activity
      await storage.createActivity({
        userId,
        action: "create",
        entityType: "document",
        entityId: document.id,
        details: `Created document: ${document.title}`
      });
      
      res.status(201).json(document);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error creating document" });
    }
  });

  // Update a document
  app.patch("/api/documents/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const documentId = parseInt(req.params.id);
      const document = await storage.getDocument(documentId);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      if (document.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const updatedDocument = await storage.updateDocument(documentId, req.body);
      
      // Log the activity
      await storage.createActivity({
        userId: req.user!.id,
        action: "update",
        entityType: "document",
        entityId: documentId,
        details: `Updated document: ${document.title}`
      });
      
      res.json(updatedDocument);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error updating document" });
    }
  });

  // Delete a document
  app.delete("/api/documents/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const documentId = parseInt(req.params.id);
      const document = await storage.getDocument(documentId);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      if (document.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      await storage.deleteDocument(documentId);
      
      // Log the activity
      await storage.createActivity({
        userId: req.user!.id,
        action: "delete",
        entityType: "document",
        entityId: documentId,
        details: `Deleted document: ${document.title}`
      });
      
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error deleting document" });
    }
  });

  // Get all tasks for a user
  app.get("/api/tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const userId = req.user!.id;
      const tasks = await storage.getTasks(userId);
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching tasks" });
    }
  });

  // Create a task
  app.post("/api/tasks", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const userId = req.user!.id;
      const taskData = insertTaskSchema.parse({
        ...req.body,
        userId
      });
      
      const task = await storage.createTask(taskData);
      
      // Log the activity
      await storage.createActivity({
        userId,
        action: "create",
        entityType: "task",
        entityId: task.id,
        details: `Created task: ${task.name}`
      });
      
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error creating task" });
    }
  });

  // Update a task
  app.patch("/api/tasks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const taskId = parseInt(req.params.id);
      const task = await storage.getTask(taskId);
      
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      if (task.userId !== req.user!.id) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      const updatedTask = await storage.updateTask(taskId, req.body);
      
      // Log the activity
      await storage.createActivity({
        userId: req.user!.id,
        action: "update",
        entityType: "task",
        entityId: taskId,
        details: `Updated task: ${task.name}`
      });
      
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error updating task" });
    }
  });

  // Get all notifications for a user
  app.get("/api/notifications", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const userId = req.user!.id;
      const notifications = await storage.getNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching notifications" });
    }
  });

  // Mark a notification as read
  app.patch("/api/notifications/:id/read", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const notificationId = parseInt(req.params.id);
      const updatedNotification = await storage.markNotificationAsRead(notificationId);
      
      if (!updatedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      
      res.json(updatedNotification);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error updating notification" });
    }
  });

  // Get all activities for a user
  app.get("/api/activities", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const userId = req.user!.id;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const activities = await storage.getActivities(userId, limit);
      res.json(activities);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error fetching activities" });
    }
  });

  // Export compliance report
  app.get("/api/reports/export", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Unauthorized" });
    
    try {
      const userId = req.user!.id;
      const frameworks = await storage.getFrameworks(userId);
      
      // Generate simple report data
      const reportData = {
        generatedAt: new Date(),
        companyName: req.user!.companyName,
        reportType: "Compliance Summary",
        frameworks: await Promise.all(frameworks.map(async (framework) => {
          const requirements = await storage.getRequirements(framework.id);
          return {
            name: framework.name,
            complianceScore: framework.complianceScore,
            requirements: requirements.map(req => ({
              name: req.name,
              status: req.status
            }))
          };
        }))
      };
      
      // Log the activity
      await storage.createActivity({
        userId,
        action: "export",
        entityType: "report",
        details: "Exported compliance report"
      });
      
      res.json(reportData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error generating report" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
