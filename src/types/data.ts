export interface Location {
  city: string;
  country: string;
  countryCode: string;
}

export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  owner: Contact;
  status: "active" | "inactive";
  location: Location;
  avatar: string; // URL to company logo
  website: string;
  industry: string;
  employees: number;
  revenue?: string;
  founded?: number;
  role?: string; // Optional role for the owner
  isPrivate?: boolean; // Optional field to indicate if the company is private
  rating: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  email: string;
  status: "active" | "inactive";
  phone: string;
  rating: string;
  tags: string[];
  isPrivate: boolean;
  location: Location;
}

export interface Deal {
  id: string;
  name: string;
  contact: {
    name: string;
    avatar: string;
  };
  tags?: string[];
  email: string;
  phone: string;
  location: Location;
  amount: string;
  stage: "qualify" | "contact" | "presentation" | "proposal";
  expecteDate?: string;
  property: number;
  status: "open" | "last" | "won";
  isPrivate: boolean;
  projects?: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: Company;
  owner?: Contact; // Optional field for owner
  title?: string;
  stage: "notcontacted" | "contacted" | "closed" | "lost";
  source: "website" | "referral" | "social" | "event" | "other";
  value?: number;
  notes?: string;
  tags?: string[];
  avatar: string;
  location: Location;
  lastContact?: string;
  priority: "high" | "medium" | "low";
  ceatedAt?: string; // Optional field for creation date
  isPrivate?: boolean; // Optional field to indicate if the lead is private
  projects?: string[];
}

export type PipelineStage = "win" | "inPipeline" | "conversation" | "lost";

export interface Pipeline {
  id: string;
  name: string;
  totalValue: number;
  dealCount: number;
  stages: PipelineStage;
  createdAt: string;
  updatedAt?: string;
  status: "active" | "inactive" | "draft";
  description?: string;
}

export type ProjectStatus = "active" | "inactive";
export type ProjectPriority = "high" | "medium" | "low";
export type ProjectCategory = "website" | "mobile" | "branding" | "marketing";

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate: string; // ISO format "YYYY-MM-DD"
  endDate: string; // ISO format "YYYY-MM-DD"
  progress: number; // 0-100
  team: string[];
  value: string;
  category: ProjectCategory;
  budget: number;
  users: Contact[];
  teamLeader: Contact;
  client: Company;
  hours: number;
  isPrivate: boolean;
  pipelineStage: PipelineStage;
  avatar: string; // URL to image
  createdAt?: string; // Optional for sorting
  updatedAt?: string; // Optional for tracking changes
}

export type InvoiceStatus = "partially paid" | "unpaid" | "paid" | "overdue";
export type PaymentStatus = "paid" | "unpaid" | "partial";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  client: Company;
  project?: Project;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  status: InvoiceStatus;
  paymentStatus: PaymentStatus;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Activity {
  id: string;
  title: string;
  type: "meeting" | "task" | "email" | "call" | "event";
  status: "not-started" | "in-progress" | "completed";
  priority: "high" | "medium" | "low";
  dueDate: Date;
  owner: Contact;
  duration: number;
  description: string;
  createdAt: Date;
  completedAt?: Date;
}

// Define User type
export interface User {
  id: string;
  name: string;
  phone: string;
  role: string;
  email: string;
  created: Date;
  lastActivity: string;
  status: "active" | "inactive";
  avatar: string;
}

export type Ticket = {
  id: string;
  ticketId: string;
  subject: string;
  description: string;
  assigned: Contact;
  assignee: Contact;
  createdOn: Date;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved" | "closed";
  category: string;
  lastUpdated: Date;
};

// Define Employee type
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  joiningDate: string;
  status: "active" | "inactive";
  avatar: string;
  department: string;
  location: {
    country: string;
    countryCode: string;
  };
  rating: number;
}
