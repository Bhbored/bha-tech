import type { Founder, Product, Service } from "../types/marketing";

export const principles = [
  {
    title: "Start with the operation",
    description:
      "We map the work, people, and information involved before defining the software.",
  },
  {
    title: "Build for change",
    description:
      "Systems are structured to remain useful as teams, processes, and priorities develop.",
  },
  {
    title: "Stay close to the work",
    description:
      "You work directly with the people planning and building the product.",
  },
] as const;

export const products: readonly Product[] = [
  {
    id: "shabakat",
    name: "Shabakat",
    category: "Flagship SaaS Platform",
    description:
      "A modern business-management platform designed to help companies manage their operations through one connected digital experience.",
    status: "available",
    features: [
      "Business Management",
      "Operational Tools",
      "Cloud-Based Access",
      "Reporting and Insights",
      "Scalable Modules",
      "User and Role Management",
    ],
    websiteUrl: "https://shabakatlb.com",
  },
] as const;

export const services: readonly Service[] = [
  {
    id: "custom-systems",
    title: "Custom Business Systems",
    description:
      "Tailored systems for workflows, operations, reporting, administration, and internal management.",
  },
  {
    id: "saas",
    title: "SaaS Product Development",
    description:
      "Scalable subscription software platforms developed from concept to production.",
  },
  {
    id: "web",
    title: "Web Application Development",
    description:
      "Responsive portals, dashboards, platforms, and customer-facing web applications.",
  },
  {
    id: "mobile",
    title: "Mobile Application Development",
    description:
      "Mobile experiences for customers, employees, managers, and field teams.",
  },
  {
    id: "integrations",
    title: "API and System Integration",
    description:
      "Connect platforms, payments, providers, accounting tools, and existing systems.",
  },
  {
    id: "ai",
    title: "AI Integration and Automation",
    description:
      "Assistants, document processing, reporting, workflow automation, and AI capabilities.",
  },
  {
    id: "support",
    title: "Maintenance and Technical Support",
    description:
      "Continuous improvement, updates, technical assistance, monitoring, and maintenance.",
  },
] as const;

export const processSteps = [
  {
    title: "Discover",
    description:
      "We understand the business, workflow, users, and core problem.",
  },
  {
    title: "Plan",
    description:
      "We define requirements, product scope, technical structure, and implementation stages.",
  },
  {
    title: "Build",
    description:
      "We develop the solution using modern technologies and reusable architecture.",
  },
  {
    title: "Improve",
    description:
      "We use feedback, maintain the system, and add capabilities as the business grows.",
  },
] as const;

export const founders: readonly Founder[] = [
  {
    name: "Bourhan",
    role: "Co-Founder and Software Developer",
    bio: "Focused on building practical, scalable software products for modern businesses.",
  },
  {
    name: "Hamed",
    role: "Co-Founder and Software Developer",
    bio: "Focused on building practical, scalable software products for modern businesses.",
  },
  {
    name: "Anwar",
    role: "Co-Founder and Software Developer",
    bio: "Focused on building practical, scalable software products for modern businesses.",
  },
] as const;
