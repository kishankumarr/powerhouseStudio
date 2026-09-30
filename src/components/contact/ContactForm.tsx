"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { enquiryText, validateEnquiry, type EnquiryField, type EnquiryValues } from "@/lib/enquiry";
import { enquiryTypes } from "@/content/services";
import { site } from "@/content/site";

/**
 * Optional form backend (e.g. Formspree, Getform, Basin) that accepts a JSON POST.
 * Without it the site is fully static, so the enquiry opens in the visitor's email app instead.
 */
const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = { kind: "idle" } | { kind: "sent"; firstName: string; via: "form" | "email" } | { kind: "failed" };

function Field({
  name,
  label,
  error,
  hint,
  children,
  className,
}: {
  name: EnquiryField;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={`f-${name}`} className="text-[0.85rem] text-muted">
        {label}
        {hint && <span className="ml-2 text-muted/70">{hint}</span>}
      </label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`f-${name}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 text-[0.85rem] text-[#e5484d]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const preset = params.get("type");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<EnquiryField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});

  const submit = async (form: HTMLFormElement) => {
    const data = Object.fromEntries(new FormData(form)) as EnquiryValues & { website?: string };
    const found = validateEnquiry(data);
    if (Object.keys(found).length) {
      setErrors(found);
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const firstName = (data.name ?? "").trim().split(/\s+/)[0];
    // Honeypot: bots fill the hidden field; pretend success and send nothing.
    if (data.website) return setStatus({ kind: "sent", firstName, via: "form" });
    delete data.website;

    if (FORM_ENDPOINT) {
      setPending(true);
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: `New enquiry: ${data.type} from ${data.name}` }),
        });
        setStatus(res.ok ? { kind: "sent", firstName, via: "form" } : { kind: "failed" });
      } catch {
        setStatus({ kind: "failed" });
      } finally {
        setPending(false);
      }
      return;
    }

    const subject = encodeURIComponent(`Enquiry: ${data.type} from ${data.name}`);
    const body = encodeURIComponent(enquiryText(data));
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setStatus({ kind: "sent", firstName, via: "email" });
  };

  const revalidate = (form: HTMLFormElement, field: EnquiryField) => {
    const data = Object.fromEntries(new FormData(form)) as Record<EnquiryField, string>;
    const all = validateEnquiry(data);
    setErrors((prev) => ({ ...prev, [field]: all[field] }));
  };

  const props = (name: EnquiryField) => ({
    id: `f-${name}`,
    name,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `f-${name}-error` : undefined,
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setTouched((t) => ({ ...t, [name]: true }));
      revalidate(e.currentTarget.form!, name);
    },
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      if (touched[name] || errors[name]) revalidate(e.currentTarget.form!, name);
    },
    className: "field",
  });

  return (
    <AnimatePresence mode="wait">
      {status.kind === "sent" ? (
        <motion.div
          key="done"
          role="status"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="flex min-h-[32rem] flex-col justify-center"
        >
          <motion.span
            className="mb-10 grid size-16 place-items-center bg-accent text-accent-ink rounded-ui"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.2 }}
          >
            <Check className="size-7" strokeWidth={2} aria-hidden />
          </motion.span>
          <h2 className="display t-lg">
            Thank you{status.firstName ? `, ${status.firstName}` : ""}.
            <br />
            <span className="display-accent">{status.via === "form" ? "Enquiry received." : "Almost there."}</span>
          </h2>
          <p className="lede mt-6 text-muted">
            {status.via === "form"
              ? "The Powerhouse team will read your brief and get back to you."
              : `Your email app has opened with the enquiry written out. Press send to reach ${site.contact.email}.`}{" "}
            If it&apos;s urgent, call{" "}
            <a href={site.contact.phoneHref} className="text-fg underline underline-offset-4">
              {site.contact.phoneDisplay}
            </a>
            .
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="relative grid gap-x-8 gap-y-9 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            void submit(e.currentTarget);
          }}
        >
          <Field name="name" label="Name" error={errors.name}>
            <input {...props("name")} type="text" autoComplete="name" placeholder="Your name" required />
          </Field>
          <Field name="email" label="Email" error={errors.email}>
            <input {...props("email")} type="email" autoComplete="email" placeholder="you@brand.com" required />
          </Field>
          <Field name="phone" label="Phone" hint="Optional" error={errors.phone}>
            <input {...props("phone")} type="tel" autoComplete="tel" placeholder="+91" />
          </Field>
          <Field name="type" label="What do you need?" error={errors.type}>
            <select {...props("type")} defaultValue={preset && enquiryTypes.includes(preset) ? preset : ""} required>
              <option value="" disabled>
                Choose a service
              </option>
              {enquiryTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
          <Field name="date" label="Event or shoot date" hint="Optional" error={errors.date}>
            <input {...props("date")} type="date" />
          </Field>
          <Field name="location" label="Location" hint="Optional" error={errors.location}>
            <input {...props("location")} type="text" placeholder="Mangaluru, or elsewhere" />
          </Field>
          <Field name="message" label="Tell us about the project" error={errors.message} className="sm:col-span-2">
            <textarea
              {...props("message")}
              rows={5}
                            placeholder="A brief, a date, a budget range, or only an idea."
              className="field resize-y"
              required
            />
          </Field>

          {/* Honeypot */}
          <div aria-hidden className="absolute -left-[9999px] h-0 overflow-hidden">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[0.85rem] text-muted" role={status.kind === "failed" ? "alert" : undefined}>
              {status.kind === "failed" ? (
                <span className="text-[#e5484d]">
                  We couldn&apos;t send this just now. Please email{" "}
                  <a href={`mailto:${site.contact.email}`} className="underline">
                    {site.contact.email}
                  </a>
                  .
                </span>
              ) : FORM_ENDPOINT ? (
                "We use these details only to reply to your enquiry."
              ) : (
                "Sending opens your email app with the enquiry ready to go."
              )}
            </p>
            <button
              type="submit"
              disabled={pending}
              className="group inline-flex items-center justify-center gap-3 bg-accent px-8 py-[1.1rem] font-medium text-accent-ink transition-[box-shadow,opacity] duration-500 hover:glow disabled:opacity-70 rounded-ui"
            >
              {pending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending
                </>
              ) : (
                <>
                  Send enquiry
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" aria-hidden />
                </>
              )}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
