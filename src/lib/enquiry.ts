import { enquiryTypes } from "@/content/services";

export type EnquiryField = "name" | "email" | "phone" | "type" | "date" | "location" | "message";
export type EnquiryValues = Partial<Record<EnquiryField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-\s\d]{7,20}$/;

export function validateEnquiry(values: EnquiryValues) {
  const errors: Partial<Record<EnquiryField, string>> = {};
  const v = (k: EnquiryField) => (values[k] ?? "").trim();

  if (v("name").length < 2) errors.name = "Enter your name.";
  if (!EMAIL.test(v("email"))) errors.email = "Enter an email address like name@example.com.";
  if (v("phone") && (!PHONE.test(v("phone")) || v("phone").replace(/\D/g, "").length < 7))
    errors.phone = "Enter a phone number with at least 7 digits, or leave it blank.";
  if (!enquiryTypes.includes(v("type"))) errors.type = "Choose what you need help with.";
  if (v("date") && Number.isNaN(Date.parse(v("date")))) errors.date = "Enter a valid date, or leave it blank.";
  if (v("message").length < 10) errors.message = "Tell us a little about the project (at least 10 characters).";
  return errors;
}

/** Plain-text version of an enquiry, used for the email fallback. */
export function enquiryText(v: EnquiryValues) {
  return [
    `Name: ${v.name ?? ""}`,
    `Email: ${v.email ?? ""}`,
    `Phone: ${v.phone || "-"}`,
    `Enquiry: ${v.type ?? ""}`,
    `Date: ${v.date || "-"}`,
    `Location: ${v.location || "-"}`,
    "",
    v.message ?? "",
  ].join("\n");
}
