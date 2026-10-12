import type { ContactFormData } from "../types/contact";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "";

export function isContactApiConfigured() {
  return Boolean(apiBaseUrl);
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  if (!apiBaseUrl) throw new Error("Online inquiry submission is temporarily unavailable.");

  const response = await fetch(`${apiBaseUrl}/api/contact`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) return;

  let message = "We could not submit your inquiry. Please try again.";
  try {
    const payload = (await response.json()) as { message?: string };
    if (payload.message) message = payload.message;
  } catch {
    // A non-JSON error still receives a safe, visible response.
  }
  throw new Error(message);
}
