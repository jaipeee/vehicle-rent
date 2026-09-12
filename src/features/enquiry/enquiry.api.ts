import { apiFetch } from "@/lib/api";
import type { EnquiryInput } from "./enquiry.schema";

// Combines firstName/lastName into the single `name` field the backend expects.
export function submitEnquiry(data: EnquiryInput) {
  const { firstName, lastName, phone } = data;
  return apiFetch("/enquiries", {
    method: "POST",
    body: JSON.stringify({ name: `${firstName} ${lastName ?? ""}`.trim(), phone }),
  });
}

const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;

/**
 * Best-effort direct write to a Google Sheet via Apps Script, run alongside
 * the backend save (not instead of it). Silently no-ops if the env var isn't
 * set, and failures here don't affect the main submission.
 */
export async function submitToGoogleScript(data: EnquiryInput) {
  if (!GOOGLE_SCRIPT_URL) return;

  const formData = new FormData();
  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName ?? "");
  formData.append("phone", data.phone);

  await fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: formData });
}