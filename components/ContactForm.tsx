"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

const initialState = {
  name: "",
  business: "",
  idea: "",
  projectDetails: "",
  email: "",
  whatsapp: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<{ type: "idle" | "success" | "error"; message: string }>({
    type: "idle",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  function updateField(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong.");
      }

      setForm(initialState);
      setStatus({
        type: "success",
        message: "Submitted successfully. I will review the details and reply soon.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Submission failed.";
      setStatus({ type: "error", message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-group">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={form.name} onChange={updateField} required />
      </div>
      <div className="field-group">
        <label htmlFor="business">Business</label>
        <input id="business" name="business" value={form.business} onChange={updateField} required />
      </div>
      <div className="field-group">
        <label htmlFor="idea">Work or idea</label>
        <input id="idea" name="idea" value={form.idea} onChange={updateField} required />
      </div>
      <div className="field-group">
        <label htmlFor="projectDetails">Project details</label>
        <textarea id="projectDetails" name="projectDetails" value={form.projectDetails} onChange={updateField} required />
      </div>
      <div className="field-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={form.email} onChange={updateField} required />
      </div>
      <div className="field-group">
        <label htmlFor="whatsapp">WhatsApp number</label>
        <input id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={updateField} required />
      </div>
      <button className="btn primary" type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Fill out the form"}
      </button>
      <div className="form-note">
        By submitting, you agree that your details will be used to review the project and respond to your inquiry.
      </div>
      {status.type !== "idle" ? (
        <div className={`status ${status.type === "success" ? "ok" : "error"}`}>{status.message}</div>
      ) : null}
    </form>
  );
}
