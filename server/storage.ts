import { 
  users, 
  type User, 
  type InsertUser,
  documents,
  type Document,
  type InsertDocument,
  regulations,
  type Regulation,
  type InsertRegulation,
  complianceStatus,
  type ComplianceStatus,
  type InsertComplianceStatus,
  deadlines,
  type Deadline,
  type InsertDeadline,
  activityLogs,
  type ActivityLog,
  type InsertActivityLog
} from "@shared/schema";

import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Document methods
  getDocumentById(id: number): Promise<Document & { user: User } | undefined>;
  getDocumentsByUserId(userId: number): Promise<Document[]>;
  getRecentDocumentsByUserId(userId: number, limit: number): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: number, document: Partial<Document>): Promise<Document | undefined>;
  deleteDocument(id: number): Promise<boolean>;
  
  // Regulation methods
  getRegulationById(id: number): Promise<Regulation | undefined>;
  getAllRegulations(): Promise<Regulation[]>;
  createRegulation(regulation: InsertRegulation): Promise<Regulation>;
  
  // Compliance status methods
  getComplianceStatusById(id: number): Promise<ComplianceStatus & { regulation: Regulation } | undefined>;
  getComplianceStatusByUserId(userId: number): Promise<(ComplianceStatus & { regulation: Regulation })[]>;
  createComplianceStatus(status: InsertComplianceStatus): Promise<ComplianceStatus>;
  updateComplianceStatus(status: InsertComplianceStatus): Promise<ComplianceStatus>;
  
  // Deadline methods
  getDeadlineById(id: number): Promise<Deadline | undefined>;
  getDeadlinesByUserId(userId: number): Promise<Deadline[]>;
  getUpcomingDeadlinesByUserId(userId: number, limit: number): Promise<Deadline[]>;
  createDeadline(deadline: InsertDeadline): Promise<Deadline>;
  updateDeadline(id: number, deadline: Partial<Deadline>): Promise<Deadline | undefined>;
  deleteDeadline(id: number): Promise<boolean>;
  
  // Activity log methods
  getActivityById(id: number): Promise<ActivityLog | undefined>;
  getActivitiesByUserId(userId: number): Promise<ActivityLog[]>;
  getRecentActivitiesByUserId(userId: number, limit: number): Promise<ActivityLog[]>;
  logActivity(activity: InsertActivityLog): Promise<ActivityLog>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documents: Map<number, Document>;
  private regulations: Map<number, Regulation>;
  private complianceStatuses: Map<number, ComplianceStatus>;
  private deadlines: Map<number, Deadline>;
  private activityLogs: Map<number, ActivityLog>;
  
  private userIdCounter: number;
  private documentIdCounter: number;
  private regulationIdCounter: number;
  private complianceStatusIdCounter: number;
  private deadlineIdCounter: number;
  private activityLogIdCounter: number;
  
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.documents = new Map();
    this.regulations = new Map();
    this.complianceStatuses = new Map();
    this.deadlines = new Map();
    this.activityLogs = new Map();
    
    this.userIdCounter = 1;
    this.documentIdCounter = 1;
    this.regulationIdCounter = 1;
    this.complianceStatusIdCounter = 1;
    this.deadlineIdCounter = 1;
    this.activityLogIdCounter = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const timestamp = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: timestamp
    };
    this.users.set(id, user);
    return user;
  }

  // Document methods
  async getDocumentById(id: number): Promise<Document & { user: User } | undefined> {
    const document = this.documents.get(id);
    if (!document) return undefined;
    
    const user = this.users.get(document.userId);
    if (!user) return undefined;
    
    return { ...document, user };
  }

  async getDocumentsByUserId(userId: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(
      (document) => document.userId === userId,
    );
  }

  async getRecentDocumentsByUserId(userId: number, limit: number): Promise<Document[]> {
    return Array.from(this.documents.values())
      .filter((document) => document.userId === userId)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.documentIdCounter++;
    const timestamp = new Date();
    const document: Document = {
      ...insertDocument,
      id,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.documents.set(id, document);
    return document;
  }

  async updateDocument(id: number, updateDocument: Partial<Document>): Promise<Document | undefined> {
    const document = this.documents.get(id);
    if (!document) return undefined;
    
    const updatedDocument: Document = {
      ...document,
      ...updateDocument,
      updatedAt: new Date(),
    };
    
    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }

  async deleteDocument(id: number): Promise<boolean> {
    return this.documents.delete(id);
  }

  // Regulation methods
  async getRegulationById(id: number): Promise<Regulation | undefined> {
    return this.regulations.get(id);
  }

  async getAllRegulations(): Promise<Regulation[]> {
    return Array.from(this.regulations.values());
  }

  async createRegulation(insertRegulation: InsertRegulation): Promise<Regulation> {
    const id = this.regulationIdCounter++;
    const timestamp = new Date();
    const regulation: Regulation = {
      ...insertRegulation,
      id,
      createdAt: timestamp,
    };
    this.regulations.set(id, regulation);
    return regulation;
  }

  // Compliance status methods
  async getComplianceStatusById(id: number): Promise<(ComplianceStatus & { regulation: Regulation }) | undefined> {
    const status = this.complianceStatuses.get(id);
    if (!status) return undefined;
    
    const regulation = this.regulations.get(status.regulationId);
    if (!regulation) return undefined;
    
    return { ...status, regulation };
  }

  async getComplianceStatusByUserId(userId: number): Promise<(ComplianceStatus & { regulation: Regulation })[]> {
    const statuses = Array.from(this.complianceStatuses.values()).filter(
      (status) => status.userId === userId,
    );
    
    return statuses.map(status => {
      const regulation = this.regulations.get(status.regulationId);
      if (!regulation) throw new Error(`Regulation not found for ID: ${status.regulationId}`);
      
      return { ...status, regulation };
    });
  }

  async createComplianceStatus(insertStatus: InsertComplianceStatus): Promise<ComplianceStatus> {
    const id = this.complianceStatusIdCounter++;
    const timestamp = new Date();
    const status: ComplianceStatus = {
      ...insertStatus,
      id,
      lastUpdated: timestamp,
    };
    this.complianceStatuses.set(id, status);
    return status;
  }

  async updateComplianceStatus(updateStatus: InsertComplianceStatus): Promise<ComplianceStatus> {
    // Find existing status by userId and regulationId
    const existingStatus = Array.from(this.complianceStatuses.values()).find(
      (status) => status.userId === updateStatus.userId && status.regulationId === updateStatus.regulationId,
    );
    
    if (existingStatus) {
      // Update existing status
      const updatedStatus: ComplianceStatus = {
        ...existingStatus,
        ...updateStatus,
        lastUpdated: new Date(),
      };
      
      this.complianceStatuses.set(existingStatus.id, updatedStatus);
      return updatedStatus;
    } else {
      // Create new status if not exists
      return this.createComplianceStatus(updateStatus);
    }
  }

  // Deadline methods
  async getDeadlineById(id: number): Promise<Deadline | undefined> {
    return this.deadlines.get(id);
  }

  async getDeadlinesByUserId(userId: number): Promise<Deadline[]> {
    return Array.from(this.deadlines.values()).filter(
      (deadline) => deadline.userId === userId,
    );
  }

  async getUpcomingDeadlinesByUserId(userId: number, limit: number): Promise<Deadline[]> {
    const now = new Date();
    
    return Array.from(this.deadlines.values())
      .filter((deadline) => deadline.userId === userId && deadline.status !== "completed" && new Date(deadline.dueDate) > now)
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
      .slice(0, limit);
  }

  async createDeadline(insertDeadline: InsertDeadline): Promise<Deadline> {
    const id = this.deadlineIdCounter++;
    const timestamp = new Date();
    const deadline: Deadline = {
      ...insertDeadline,
      id,
      createdAt: timestamp,
    };
    this.deadlines.set(id, deadline);
    return deadline;
  }

  async updateDeadline(id: number, updateDeadline: Partial<Deadline>): Promise<Deadline | undefined> {
    const deadline = this.deadlines.get(id);
    if (!deadline) return undefined;
    
    const updatedDeadline: Deadline = {
      ...deadline,
      ...updateDeadline,
    };
    
    this.deadlines.set(id, updatedDeadline);
    return updatedDeadline;
  }

  async deleteDeadline(id: number): Promise<boolean> {
    return this.deadlines.delete(id);
  }

  // Activity log methods
  async getActivityById(id: number): Promise<ActivityLog | undefined> {
    return this.activityLogs.get(id);
  }

  async getActivitiesByUserId(userId: number): Promise<ActivityLog[]> {
    return Array.from(this.activityLogs.values())
      .filter((activity) => activity.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  async getRecentActivitiesByUserId(userId: number, limit: number): Promise<ActivityLog[]> {
    return Array.from(this.activityLogs.values())
      .filter((activity) => activity.userId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  async logActivity(insertActivity: InsertActivityLog): Promise<ActivityLog> {
    const id = this.activityLogIdCounter++;
    const timestamp = new Date();
    const activity: ActivityLog = {
      ...insertActivity,
      id,
      timestamp,
    };
    this.activityLogs.set(id, activity);
    return activity;
  }
}

export const storage = new MemStorage();
