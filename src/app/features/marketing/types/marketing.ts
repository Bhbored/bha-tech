export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  status: "available" | "in-development";
  features: readonly string[];
  websiteUrl?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
};

export type Founder = {
  name: string;
  role: string;
  bio: string;
  image?: string;
};
