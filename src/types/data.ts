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
