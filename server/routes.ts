import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  insertDocumentSchema, 
  insertDeadlineSchema, 
  insertActivityLogSchema,
  insertComplianceStatusSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Initialize default regulations if not exist
  await initializeDefaultRegulations();

  // Dashboard data route
  app.get("/api/dashboard", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) return res.status(400).send("User ID is required");

    try {
      const complianceStatus = await storage.getComplianceStatusByUserId(userId);
      const recentDocuments = await storage.getRecentDocumentsByUserId(userId, 3);
      const upcomingDeadlines = await storage.getUpcomingDeadlinesByUserId(userId, 3);
      const recentActivities = await storage.getRecentActivitiesByUserId(userId, 3);
      const overallScore = calculateOverallScore(complianceStatus);

      res.json({
        overallScore,
        complianceStatus,
        recentDocuments,
        upcomingDeadlines,
        recentActivities,
        pendingTasks: upcomingDeadlines.length,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).send("Error fetching dashboard data");
    }
  });

  // Documents routes
  app.get("/api/documents", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) return res.status(400).send("User ID is required");

    try {
      const documents = await storage.getDocumentsByUserId(userId);
      res.json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      res.status(500).send("Error fetching documents");
    }
  });

  app.post("/api/documents", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) return res.status(400).send("User ID is required");

    try {
      const validatedData = insertDocumentSchema.parse({ ...req.body, userId });
      const document = await storage.createDocument(validatedData);

      // Log activity
      await storage.logActivity({
        userId,
        action: "Document Created",
        details: `Created document: ${document.title}`,
        activityType: "document",
      });

      res.status(201).json(document);
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).send("Error creating document");
    }
  });

  app.get("/api/documents/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    const documentId = parseInt(req.params.id);

    try {
      const document = await storage.getDocumentById(documentId);
      if (!document) return res.status(404).send("Document not found");
      if (document.userId !== userId) return res.status(403).send("Unauthorized");

      res.json(document);
    } catch (error) {
      console.error("Error fetching document:", error);
      res.status(500).send("Error fetching document");
    }
  });

  // Deadlines routes
  app.get("/api/deadlines", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) return res.status(400).send("User ID is required");

    try {
      const deadlines = await storage.getDeadlinesByUserId(userId);
      res.json(deadlines);
    } catch (error) {
      console.error("Error fetching deadlines:", error);
      res.status(500).send("Error fetching deadlines");
    }
  });

  app.post("/api/deadlines", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) return res.status(400).send("User ID is required");

    try {
      const validatedData = insertDeadlineSchema.parse({ ...req.body, userId });
      const deadline = await storage.createDeadline(validatedData);

      // Log activity
      await storage.logActivity({
        userId,
        action: "Deadline Created",
        details: `Created deadline: ${deadline.title}`,
        activityType: "alert",
      });

      res.status(201).json(deadline);
    } catch (error) {
      console.error("Error creating deadline:", error);
      res.status(500).send("Error creating deadline");
    }
  });

  // Compliance status routes
  app.get("/api/compliance", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) return res.status(400).send("User ID is required");

    try {
      const complianceStatus = await storage.getComplianceStatusByUserId(userId);
      res.json(complianceStatus);
    } catch (error) {
      console.error("Error fetching compliance status:", error);
      res.status(500).send("Error fetching compliance status");
    }
  });

  app.put("/api/compliance/:regulationId", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) return res.status(400).send("User ID is required");

    const regulationId = parseInt(req.params.regulationId);

    try {
      const validatedData = insertComplianceStatusSchema.parse({ 
        ...req.body, 
        userId, 
        regulationId 
      });
      
      const complianceStatus = await storage.updateComplianceStatus(validatedData);

      // Log activity
      await storage.logActivity({
        userId,
        action: "Compliance Status Updated",
        details: `Updated compliance status for regulation #${regulationId}`,
        activityType: "compliance",
      });

      res.json(complianceStatus);
    } catch (error) {
      console.error("Error updating compliance status:", error);
      res.status(500).send("Error updating compliance status");
    }
  });

  // Activity logs
  app.get("/api/activities", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) return res.status(400).send("User ID is required");

    try {
      const activities = await storage.getActivitiesByUserId(userId);
      res.json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).send("Error fetching activities");
    }
  });

  // Generate report
  app.post("/api/generate-report", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    const userId = req.user?.id;
    if (!userId) return res.status(400).send("User ID is required");

    try {
      const complianceStatus = await storage.getComplianceStatusByUserId(userId);
      const user = await storage.getUser(userId);
      
      // Create a report document
      const reportContent = generateComplianceReport(user, complianceStatus);
      
      const document = await storage.createDocument({
        userId,
        title: "Compliance Status Report",
        description: "Automatically generated compliance report",
        type: "report",
        content: reportContent,
        status: "published",
        pageCount: 5,
      });

      // Log activity
      await storage.logActivity({
        userId,
        action: "Report Generated",
        details: "Generated compliance status report",
        activityType: "document",
      });

      res.status(201).json(document);
    } catch (error) {
      console.error("Error generating report:", error);
      res.status(500).send("Error generating report");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to calculate overall compliance score
function calculateOverallScore(complianceStatuses: any[]): number {
  if (!complianceStatuses.length) return 0;
  
  const totalScore = complianceStatuses.reduce((sum, status) => sum + status.score, 0);
  return Math.round(totalScore / complianceStatuses.length);
}

// Helper function to generate a compliance report
function generateComplianceReport(user: any, complianceStatuses: any[]): string {
  const timestamp = new Date().toISOString();
  const overallScore = calculateOverallScore(complianceStatuses);
  
  let report = `# Compliance Status Report\n\n`;
  report += `## Company: ${user.companyName}\n`;
  report += `## Generated: ${new Date().toLocaleString()}\n`;
  report += `## Overall Compliance Score: ${overallScore}%\n\n`;
  
  report += `## Compliance Status by Regulation\n\n`;
  
  complianceStatuses.forEach(status => {
    report += `### ${status.regulation.name}\n`;
    report += `- Score: ${status.score}%\n`;
    report += `- Status: ${status.status}\n`;
    report += `- Actions needed: ${status.actionsNeeded}\n`;
    report += `- Last updated: ${new Date(status.lastUpdated).toLocaleString()}\n\n`;
  });
  
  return report;
}

// Initialize default regulations in the database
async function initializeDefaultRegulations() {
  const existingRegulations = await storage.getAllRegulations();
  
  if (existingRegulations.length === 0) {
    // GDPR
    await storage.createRegulation({
      name: "GDPR",
      description: "General Data Protection Regulation - EU data protection and privacy regulation",
      requirements: [
        "Data processing registry",
        "Privacy policy",
        "User consent management",
        "Data breach notification procedure",
        "Data protection impact assessment",
        "Right to be forgotten implementation",
        "Data portability support",
        "Data minimization practices"
      ],
    });
    
    // CCPA
    await storage.createRegulation({
      name: "CCPA",
      description: "California Consumer Privacy Act - California's data privacy regulation",
      requirements: [
        "Privacy notice",
        "Opt-out mechanism",
        "Data inventory and mapping",
        "Consumer rights processes",
        "Staff training",
        "Vendor management",
        "Data security measures",
        "Record keeping practices"
      ],
    });
    
    // HIPAA
    await storage.createRegulation({
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act - US healthcare data privacy",
      requirements: [
        "Security risk assessment",
        "Privacy policies and procedures",
        "Security safeguards",
        "Access controls",
        "Audit controls",
        "Integrity controls",
        "Transmission security",
        "Business associate agreements"
      ],
    });
  }
}
