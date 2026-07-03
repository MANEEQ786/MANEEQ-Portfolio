import { NextResponse } from "next/server";
import { validateContact } from "@/lib/validations";
import { validateCompanyEmail } from "@/lib/validation/companyEmail.server";
import { formRejectionMessage } from "@/lib/validation/companyEmail";

// Replacement for the original contact.php.
// - Accepts both JSON and urlencoded/form-data POST bodies.
// - Validates name / email / message (subject + phone optional).
// - Returns plain text on success/error so the original ajax-style UI
//   (which shows `response` text) keeps working unchanged.
// - Email sending is an optional, safe no-op unless SMTP env vars are set.

async function parseBody(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await request.json()) as Record<string, unknown>;
  }
  // urlencoded or multipart form data
  const form = await request.formData();
  const obj: Record<string, unknown> = {};
  form.forEach((value, key) => {
    obj[key] = value;
  });
  return obj;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await parseBody(request);
  } catch {
    return new NextResponse("There was a problem with your submission, please try again.", {
      status: 400,
    });
  }

  const { valid, errors, data } = validateContact(body);
  if (!valid) {
    return new NextResponse(errors.join(" "), { status: 422 });
  }

  // Authoritative async check (real-time disposable API) — catches new temp-mail
  // domains the synchronous list in validateContact can't know about.
  const company = await validateCompanyEmail(data.email);
  if (!company.valid) {
    return new NextResponse(formRejectionMessage(company.reason!), { status: 422 });
  }

  try {
    await sendContactEmail(data);
  } catch (err) {
    console.error("[contact] send failed:", err);
    return new NextResponse(
      "Oops! Something went wrong and we couldn't send your message.",
      { status: 500 }
    );
  }

  return new NextResponse(
    "Your message delivered successfully, I will contact you soon!",
    { status: 200 }
  );
}

// GET/other methods are not allowed (mirrors contact.php's 403 for non-POST).
export async function GET() {
  return new NextResponse("There was a problem with your submission, please try again.", {
    status: 403,
  });
}

/**
 * Sends the contact email if SMTP is configured. If it is not configured, this
 * is a safe no-op that logs the submission server-side, so the form still
 * "works" in local/dev without any mail setup.
 */
async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    CONTACT_TO_EMAIL,
  } = process.env;

  // Not configured -> log and return (no crash, no external dependency).
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.info("[contact] SMTP not configured — submission received:", data);
    return;
  }

  const nodemailer = (await import("nodemailer")).default;

  const port = Number(SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // Honour SMTP_SECURE if set, otherwise infer from the port (465 = implicit TLS).
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const to = CONTACT_TO_EMAIL || SMTP_USER;
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "-"],
    ["Message", data.message],
  ];

  await transporter.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to,
    replyTo: data.email,
    subject: `Contact me Saqib – message from ${data.name}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `
      <h2 style="margin:0 0 16px">New contact form submission</h2>
      <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 12px 4px 0;color:#666;font-weight:600;vertical-align:top">${k}</td><td style="padding:4px 0;white-space:pre-line">${escapeHtml(
                String(v)
              )}</td></tr>`
          )
          .join("")}
      </table>
    `,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
