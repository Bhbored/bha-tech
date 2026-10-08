import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email address."),
  phone: z.string().trim().max(30, "Please use 30 characters or fewer.").optional(),
  company: z.string().trim().max(120, "Please use 120 characters or fewer.").optional(),
  service: z.string().trim().min(1, "Please select a service."),
  projectType: z.string().trim().min(1, "Please select a project type."),
  message: z.string().trim().min(20, "Please share at least 20 characters about your project.").max(3000, "Please use 3,000 characters or fewer."),
  consent: z.boolean().refine((value) => value, "Please confirm that we may respond to your inquiry."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
