import { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Get available compliance frameworks
  app.get("/api/compliance/frameworks", (req, res) => {
    const frameworks = [
      { id: "gdpr", name: "GDPR", description: "General Data Protection Regulation" },
      { id: "ccpa", name: "CCPA", description: "California Consumer Privacy Act" },
      { id: "hipaa", name: "HIPAA", description: "Health Insurance Portability and Accountability Act" }
    ];
    res.json(frameworks);
  });

  // Get compliance score for a user
  app.get("/api/compliance/score", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    
    const scores = {
      gdpr: {
        score: 85,
        change: 12,
        issues: 4,
        metRequirements: 17,
        totalRequirements: 20
      },
      ccpa: {
        score: 65,
        change: 5,
        issues: 7,
        metRequirements: 13,
        totalRequirements: 20
      },
      hipaa: {
        score: 40,
        change: 0,
        issues: 12,
        metRequirements: 8,
        totalRequirements: 20
      }
    };
    
    res.json(scores);
  });

  // Get deadlines for a user
  app.get("/api/deadlines", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    
    const deadlines = [
      {
        id: 1,
        title: 'GDPR Cookie Policy Update',
        due: 'Due in 5 days (May 15, 2023)',
        status: 'upcoming',
        type: 'event'
      },
      {
        id: 2,
        title: 'CCPA Annual Data Audit',
        due: 'Overdue by 2 days',
        status: 'overdue',
        type: 'priority'
      },
      {
        id: 3,
        title: 'HIPAA Security Risk Assessment',
        due: 'Due in 14 days (May 24, 2023)',
        status: 'normal',
        type: 'assignment'
      },
      {
        id: 4,
        title: 'Quarterly Compliance Review',
        due: 'Due in 21 days (May 31, 2023)',
        status: 'normal',
        type: 'security'
      }
    ];
    
    res.json(deadlines);
  });

  // Get documents for a user
  app.get("/api/documents", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    
    const documents = [
      {
        id: 1,
        title: 'Privacy Policy v2.1',
        status: 'approved',
        updated: 'Updated 2 days ago',
        regulation: 'GDPR'
      },
      {
        id: 2,
        title: 'Data Processing Agreement',
        status: 'in-review',
        updated: 'Updated 5 days ago',
        regulation: 'GDPR'
      },
      {
        id: 3,
        title: 'CCPA Compliance Report',
        status: 'approved',
        updated: 'Updated 1 week ago',
        regulation: 'CCPA'
      }
    ];
    
    res.json(documents);
  });

  // Get compliance issues for a user
  app.get("/api/compliance/issues", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    
    const issues = [
      {
        id: 1,
        title: 'Missing consent mechanism for cookies',
        description: 'Cookie banner needs implementation',
        regulation: 'GDPR',
        severity: 'critical',
        status: 'pending',
        action: 'Fix',
        actionLink: '#'
      },
      {
        id: 2,
        title: 'Incomplete data inventory',
        description: 'Missing 40% of system data mapping',
        regulation: 'CCPA',
        severity: 'high',
        status: 'in-progress',
        action: 'Continue',
        actionLink: '#'
      },
      {
        id: 3,
        title: 'No data breach response plan',
        description: 'Required for HIPAA compliance',
        regulation: 'HIPAA',
        severity: 'critical',
        status: 'not-started',
        action: 'Start',
        actionLink: '#'
      },
      {
        id: 4,
        title: 'Privacy notice out of date',
        description: 'Last updated 11 months ago',
        regulation: 'GDPR',
        severity: 'medium',
        status: 'pending',
        action: 'Fix',
        actionLink: '#'
      }
    ];
    
    res.json(issues);
  });

  // Generate a report based on compliance data
  app.post("/api/compliance/report", (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    
    // In a real implementation, this would generate a PDF report
    res.json({ 
      message: "Report generated", 
      reportUrl: "/api/downloads/report-12345.pdf" 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
