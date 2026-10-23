import { describe, expect, it } from "vitest";
import { contactSchema } from "@/app/features/marketing/types/contact";

const validContact = {
  fullName: "BHA Tech Contact",
  email: "contact@example.com",
  phone: "",
  company: "BHA Tech",
  service: "Web Application",
  projectType: "New product or system",
  message: "We need a website that explains our product and services clearly.",
  consent: true,
};

describe("contactSchema", () => {
  it("accepts a valid public inquiry", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("requires consent and a meaningful message", () => {
    expect(
      contactSchema.safeParse({ ...validContact, consent: false }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...validContact, message: "Too short" })
        .success,
    ).toBe(false);
  });
});
