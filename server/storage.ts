import { users, type User, type InsertUser, documents, type Document, type InsertDocument, frameworks, type Framework, type InsertFramework, tasks, type Task, type InsertTask, notifications, type Notification, type InsertNotification, activities, type Activity, type InsertActivity, requirements, type Requirement, type InsertRequirement } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Document methods
  getDocuments(userId: number): Promise<Document[]>;
  getDocument(id: number): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: number, document: Partial<Document>): Promise<Document | undefined>;
  deleteDocument(id: number): Promise<boolean>;
  
  // Framework methods
  getFrameworks(userId: number): Promise<Framework[]>;
  getFramework(id: number): Promise<Framework | undefined>;
  createFramework(framework: InsertFramework): Promise<Framework>;
  updateFramework(id: number, framework: Partial<Framework>): Promise<Framework | undefined>;
  
  // Task methods
  getTasks(userId: number): Promise<Task[]>;
  getTasksByFramework(frameworkId: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
  
  // Notification methods
  getNotifications(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<Notification | undefined>;
  
  // Activity methods
  getActivities(userId: number, limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Requirement methods
  getRequirements(frameworkId: number): Promise<Requirement[]>;
  createRequirement(requirement: InsertRequirement): Promise<Requirement>;
  updateRequirement(id: number, requirement: Partial<Requirement>): Promise<Requirement | undefined>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documents: Map<number, Document>;
  private frameworks: Map<number, Framework>;
  private tasks: Map<number, Task>;
  private notifications: Map<number, Notification>;
  private activities: Map<number, Activity>;
  private requirements: Map<number, Requirement>;
  
  sessionStore: session.SessionStore;
  
  userCurrentId: number;
  documentCurrentId: number;
  frameworkCurrentId: number;
  taskCurrentId: number;
  notificationCurrentId: number;
  activityCurrentId: number;
  requirementCurrentId: number;

  constructor() {
    this.users = new Map();
    this.documents = new Map();
    this.frameworks = new Map();
    this.tasks = new Map();
    this.notifications = new Map();
    this.activities = new Map();
    this.requirements = new Map();
    
    this.userCurrentId = 1;
    this.documentCurrentId = 1;
    this.frameworkCurrentId = 1;
    this.taskCurrentId = 1;
    this.notificationCurrentId = 1;
    this.activityCurrentId = 1;
    this.requirementCurrentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
    
    // Create default frameworks
    this._createDefaultFrameworks();
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    
    // Create initial frameworks for the new user
    this._createUserFrameworks(id);
    
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  // Document methods
  async getDocuments(userId: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(
      (doc) => doc.userId === userId
    );
  }
  
  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }
  
  async createDocument(document: InsertDocument): Promise<Document> {
    const id = this.documentCurrentId++;
    const now = new Date();
    const newDocument: Document = { 
      ...document, 
      id,
      createdAt: now,
      updatedAt: now
    };
    this.documents.set(id, newDocument);
    return newDocument;
  }
  
  async updateDocument(id: number, documentData: Partial<Document>): Promise<Document | undefined> {
    const document = await this.getDocument(id);
    if (!document) return undefined;
    
    const updatedDocument = { 
      ...document, 
      ...documentData,
      updatedAt: new Date()
    };
    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }
  
  async deleteDocument(id: number): Promise<boolean> {
    return this.documents.delete(id);
  }
  
  // Framework methods
  async getFrameworks(userId: number): Promise<Framework[]> {
    return Array.from(this.frameworks.values()).filter(
      (framework) => framework.userId === userId
    );
  }
  
  async getFramework(id: number): Promise<Framework | undefined> {
    return this.frameworks.get(id);
  }
  
  async createFramework(framework: InsertFramework): Promise<Framework> {
    const id = this.frameworkCurrentId++;
    const newFramework: Framework = { ...framework, id };
    this.frameworks.set(id, newFramework);
    return newFramework;
  }
  
  async updateFramework(id: number, frameworkData: Partial<Framework>): Promise<Framework | undefined> {
    const framework = await this.getFramework(id);
    if (!framework) return undefined;
    
    const updatedFramework = { ...framework, ...frameworkData };
    this.frameworks.set(id, updatedFramework);
    return updatedFramework;
  }
  
  // Task methods
  async getTasks(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.userId === userId
    );
  }
  
  async getTasksByFramework(frameworkId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.frameworkId === frameworkId
    );
  }
  
  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }
  
  async createTask(task: InsertTask): Promise<Task> {
    const id = this.taskCurrentId++;
    const newTask: Task = { ...task, id };
    this.tasks.set(id, newTask);
    return newTask;
  }
  
  async updateTask(id: number, taskData: Partial<Task>): Promise<Task | undefined> {
    const task = await this.getTask(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...taskData };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }
  
  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }
  
  // Notification methods
  async getNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter((notification) => notification.userId === userId)
      .sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
  }
  
  async createNotification(notification: InsertNotification): Promise<Notification> {
    const id = this.notificationCurrentId++;
    const now = new Date();
    const newNotification: Notification = { ...notification, id, createdAt: now };
    this.notifications.set(id, newNotification);
    return newNotification;
  }
  
  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;
    
    const updatedNotification = { ...notification, read: true };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }
  
  // Activity methods
  async getActivities(userId: number, limit = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter((activity) => activity.userId === userId)
      .sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice(0, limit);
  }
  
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.activityCurrentId++;
    const now = new Date();
    const newActivity: Activity = { ...activity, id, createdAt: now };
    this.activities.set(id, newActivity);
    return newActivity;
  }
  
  // Requirement methods
  async getRequirements(frameworkId: number): Promise<Requirement[]> {
    return Array.from(this.requirements.values()).filter(
      (requirement) => requirement.frameworkId === frameworkId
    );
  }
  
  async createRequirement(requirement: InsertRequirement): Promise<Requirement> {
    const id = this.requirementCurrentId++;
    const newRequirement: Requirement = { ...requirement, id };
    this.requirements.set(id, newRequirement);
    return newRequirement;
  }
  
  async updateRequirement(id: number, requirementData: Partial<Requirement>): Promise<Requirement | undefined> {
    const requirement = await this.getRequirement(id);
    if (!requirement) return undefined;
    
    const updatedRequirement = { ...requirement, ...requirementData };
    this.requirements.set(id, updatedRequirement);
    return updatedRequirement;
  }
  
  async getRequirement(id: number): Promise<Requirement | undefined> {
    return this.requirements.get(id);
  }
  
  // Helper methods for setting up initial data
  private _createDefaultFrameworks() {
    // This will be called on initialization
    // but frameworks will only be cloned for users when they register
  }
  
  private _createUserFrameworks(userId: number) {
    // Create GDPR Framework
    const gdprId = this.frameworkCurrentId++;
    const gdpr: Framework = {
      id: gdprId,
      userId,
      name: "GDPR",
      description: "General Data Protection Regulation",
      complianceScore: 85,
      status: "in_progress"
    };
    this.frameworks.set(gdprId, gdpr);
    
    // Create GDPR requirements
    const gdprReqs = [
      { name: "Data Processing", description: "Document all data processing activities", status: "complete" },
      { name: "User Consent", description: "Implement consent management for users", status: "complete" },
      { name: "Privacy Policy", description: "Update privacy policy with GDPR requirements", status: "in_progress" },
      { name: "Data Portability", description: "Enable users to export their data", status: "complete" },
      { name: "Breach Notification", description: "Set up process for breach notifications", status: "in_progress" }
    ];
    
    gdprReqs.forEach(req => {
      const reqId = this.requirementCurrentId++;
      this.requirements.set(reqId, {
        id: reqId,
        frameworkId: gdprId,
        name: req.name,
        description: req.description,
        status: req.status
      });
    });
    
    // Create CCPA Framework
    const ccpaId = this.frameworkCurrentId++;
    const ccpa: Framework = {
      id: ccpaId,
      userId,
      name: "CCPA",
      description: "California Consumer Privacy Act",
      complianceScore: 67,
      status: "in_progress"
    };
    this.frameworks.set(ccpaId, ccpa);
    
    // Create CCPA requirements
    const ccpaReqs = [
      { name: "Notice At Collection", description: "Provide notice at collection of personal information", status: "complete" },
      { name: "Opt-Out Mechanism", description: "Implement 'Do Not Sell My Info' opt-out", status: "in_progress" },
      { name: "Data Inventory", description: "Create inventory of all personal information", status: "not_started" },
      { name: "Privacy Rights", description: "Implement consumer privacy rights requests", status: "complete" },
      { name: "Training Program", description: "Train employees on CCPA requirements", status: "in_progress" }
    ];
    
    ccpaReqs.forEach(req => {
      const reqId = this.requirementCurrentId++;
      this.requirements.set(reqId, {
        id: reqId,
        frameworkId: ccpaId,
        name: req.name,
        description: req.description,
        status: req.status
      });
    });
    
    // Create HIPAA Framework
    const hipaaId = this.frameworkCurrentId++;
    const hipaa: Framework = {
      id: hipaaId,
      userId,
      name: "HIPAA",
      description: "Health Insurance Portability and Accountability Act",
      complianceScore: 55,
      status: "in_progress"
    };
    this.frameworks.set(hipaaId, hipaa);
    
    // Create HIPAA requirements
    const hipaaReqs = [
      { name: "Security Risk Assessment", description: "Conduct comprehensive risk assessment", status: "in_progress" },
      { name: "Access Controls", description: "Implement access controls for PHI", status: "in_progress" },
      { name: "Data Encryption", description: "Encrypt PHI data at rest and in transit", status: "not_started" },
      { name: "Audit Controls", description: "Implement audit controls and logging", status: "not_started" },
      { name: "Business Associate Agreements", description: "Update all BAAs with vendors", status: "complete" }
    ];
    
    hipaaReqs.forEach(req => {
      const reqId = this.requirementCurrentId++;
      this.requirements.set(reqId, {
        id: reqId,
        frameworkId: hipaaId,
        name: req.name,
        description: req.description,
        status: req.status
      });
    });
    
    // Create some initial tasks
    const now = new Date();
    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    const nextMonth = new Date(now);
    nextMonth.setDate(now.getDate() + 30);
    
    // GDPR Tasks
    this.createTask({
      userId,
      frameworkId: gdprId,
      name: "Quarterly GDPR Review",
      description: "Review and update all GDPR compliance documentation",
      dueDate: nextMonth,
      status: "not_started",
      priority: "medium"
    });
    
    // CCPA Tasks
    this.createTask({
      userId,
      frameworkId: ccpaId,
      name: "CCPA Opt-Out Implementation",
      description: "Finalize the 'Do Not Sell My Info' button on website",
      dueDate: nextWeek,
      status: "in_progress",
      priority: "high"
    });
    
    // HIPAA Tasks
    this.createTask({
      userId,
      frameworkId: hipaaId,
      name: "HIPAA Data Encryption Requirements",
      description: "Implement encryption for all PHI data",
      dueDate: new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000)), // 3 days from now
      status: "not_started",
      priority: "high"
    });
    
    // Create initial documents
    this.createDocument({
      userId,
      title: "Privacy Policy v2.3",
      type: "policy",
      content: "# Privacy Policy\n\nThis is your privacy policy document.",
      status: "published"
    });
    
    this.createDocument({
      userId,
      title: "GDPR Compliance Checklist",
      type: "checklist",
      content: "# GDPR Checklist\n\n- [ ] Update privacy policy\n- [ ] Implement consent management\n- [ ] Data breach process",
      status: "published"
    });
    
    // Create initial notifications
    this.createNotification({
      userId,
      title: "HIPAA Deadline Approaching",
      message: "HIPAA Data Encryption Requirements due in 3 days",
      type: "warning",
      read: false
    });
    
    this.createNotification({
      userId,
      title: "CCPA Update Required",
      message: "CCPA Privacy Policy Update Required",
      type: "warning",
      read: false
    });
    
    this.createNotification({
      userId,
      title: "New Compliance Framework Available",
      message: "ISO 27001 framework is now available for your compliance program",
      type: "info",
      read: false
    });
  }
}

export const storage = new MemStorage();
