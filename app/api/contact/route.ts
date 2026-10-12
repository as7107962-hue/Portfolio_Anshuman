import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type Payload = {
  name?: string;
  business?: string;
  idea?: string;
  projectDetails?: string;
  email?: string;
  whatsapp?: string;
};

const clean = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    const name = clean(body.name);
    const business = clean(body.business);
    const idea = clean(body.idea);
    const projectDetails = clean(body.projectDetails);
    const email = clean(body.email);
    const whatsapp = clean(body.whatsapp);

    if (!name || !business || !idea || !projectDetails || !email || !whatsapp) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER;

    if (smtpHost && smtpUser && smtpPass && toEmail) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: process.env.MAIL_FROM ?? `"Anshuman Portfolio" <${smtpUser}>`,
        to: toEmail,
        replyTo: email,
        subject: `New portfolio enquiry from ${name}`,
        text: [
          `Name: ${name}`,
          `Business: ${business}`,
          `Work or idea: ${idea}`,
          `Project details: ${projectDetails}`,
          `Email: ${email}`,
          `WhatsApp: ${whatsapp}`,
        ].join("\n"),
      });

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      {
        ok: true,
        note:
          "Mail transport is not configured yet. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and CONTACT_TO_EMAIL to deliver emails.",
      },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ error: "Unable to submit the form." }, { status: 500 });
  }
}
