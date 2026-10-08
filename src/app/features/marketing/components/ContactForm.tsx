import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { isContactApiConfigured, submitContactForm } from "@/app/shared/api/contact";
import { contactSchema, type ContactFormData } from "@/app/shared/types/contact";

const serviceOptions = [
  "Custom Business System",
  "SaaS Development",
  "Web Application",
  "Mobile Application",
  "AI Integration",
  "Maintenance and Support",
  "Partnership",
  "Other",
] as const;

type ContactStatus = "idle" | "success" | "error";

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-2 text-sm font-semibold text-danger" role="alert">{message}</p> : null;
}

const inputClass = "mt-2 min-h-12 w-full rounded-sm border border-muted bg-background px-4 text-base text-foreground transition placeholder:text-muted focus:border-accent";

export function ContactForm() {
  const apiConfigured = isContactApiConfigured();
  const [status, setStatus] = useState<ContactStatus>("idle");
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: "", email: "", phone: "", company: "", service: "", projectType: "", message: "", consent: false },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!apiConfigured) return;
    clearErrors("root");
    setStatus("idle");
    try {
      await submitContactForm(data);
      setStatus("success");
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "We could not submit your inquiry. Please try again.";
      setError("root", { message });
      setStatus("error");
    }
  };

  return (
    <form className="border border-line bg-surface p-6 sm:p-8" noValidate onSubmit={handleSubmit(onSubmit)}>
      {!apiConfigured ? <p className="mb-5 border border-line bg-background-soft p-4 text-sm font-semibold text-accent" role="status">Online inquiry submission is temporarily unavailable. Please check back soon.</p> : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold">Full name <span className="text-danger" aria-hidden="true">*</span>
          <input className={inputClass} autoComplete="name" aria-invalid={Boolean(errors.fullName)} {...register("fullName")} />
          <FieldError message={errors.fullName?.message} />
        </label>
        <label className="text-sm font-bold">Email address <span className="text-danger" aria-hidden="true">*</span>
          <input className={inputClass} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
          <FieldError message={errors.email?.message} />
        </label>
        <label className="text-sm font-bold">Phone number
          <input className={inputClass} type="tel" autoComplete="tel" aria-invalid={Boolean(errors.phone)} {...register("phone")} />
          <FieldError message={errors.phone?.message} />
        </label>
        <label className="text-sm font-bold">Company name
          <input className={inputClass} autoComplete="organization" aria-invalid={Boolean(errors.company)} {...register("company")} />
          <FieldError message={errors.company?.message} />
        </label>
        <label className="text-sm font-bold">Service interested in <span className="text-danger" aria-hidden="true">*</span>
          <select className={inputClass} aria-invalid={Boolean(errors.service)} {...register("service")}>
            <option value="">Select a service</option>
            {serviceOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
          <FieldError message={errors.service?.message} />
        </label>
        <label className="text-sm font-bold">Estimated project type <span className="text-danger" aria-hidden="true">*</span>
          <select className={inputClass} aria-invalid={Boolean(errors.projectType)} {...register("projectType")}>
            <option value="">Select a project type</option>
            <option>New product or system</option>
            <option>Existing product improvement</option>
            <option>Integration or automation</option>
            <option>Ongoing support</option>
            <option>Not sure yet</option>
          </select>
          <FieldError message={errors.projectType?.message} />
        </label>
      </div>
      <label className="mt-5 block text-sm font-bold">Message <span className="text-danger" aria-hidden="true">*</span>
        <textarea className={`${inputClass} resize-y py-3`} rows={6} placeholder="Tell us about the workflow, challenge, or product you have in mind." aria-invalid={Boolean(errors.message)} {...register("message")} />
        <FieldError message={errors.message?.message} />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-muted">
        <input className="mt-1 size-5 shrink-0 accent-primary" type="checkbox" aria-invalid={Boolean(errors.consent)} {...register("consent")} />
        <span>I agree that BHA Tech may use these details to respond to my inquiry. <strong className="text-danger" aria-hidden="true">*</strong></span>
      </label>
      <FieldError message={errors.consent?.message} />
      {status === "success" ? <p className="mt-5 flex gap-3 border border-success/60 bg-background-soft p-4 text-sm font-semibold text-success" role="status"><CheckCircle2 className="shrink-0" aria-hidden="true" size={20} /> Your message was received. We will get back to you soon.</p> : null}
      {status === "error" ? <p className="mt-5 flex gap-3 border border-danger/60 bg-background-soft p-4 text-sm font-semibold text-danger" role="alert"><AlertCircle className="shrink-0" aria-hidden="true" size={20} /> {errors.root?.message}</p> : null}
      <button className="mt-6 inline-flex min-h-12 w-full items-center justify-center border border-primary bg-primary px-6 font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto" type="submit" disabled={!apiConfigured || isSubmitting}>
        {isSubmitting ? <><LoaderCircle aria-hidden="true" className="mr-2 animate-spin" size={18} /> Sending…</> : "Send Inquiry"}
      </button>
    </form>
  );
}
