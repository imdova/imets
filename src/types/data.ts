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
  location: {
    country: string;
    countryCode: string;
  };
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
  location: string;
  amount: string;
  stage: "qualify" | "contact" | "presentation" | "proposal";
  expecteDate?: string;
  property: number;
  status: "open" | "last" | "won";
}
