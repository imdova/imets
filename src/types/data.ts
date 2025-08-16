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
