"use client";

import { useEffect, useRef, useState } from "react";
import { contactWhatsAppUrl, validateContact, whatsappUrl, type ContactErrors, type ContactValues } from "@/lib/contact";
import { site } from "@/data/site";
import { ArrowIcon, WhatsAppIcon } from "./icons";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [readyUrl, setReadyUrl] = useState("");
  const [interactive, setInteractive] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => { setInteractive(true); }, []);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: ContactValues = { name: String(data.get("name") || ""), phone: String(data.get("phone") || ""), message: String(data.get("message") || "") };
    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    setReadyUrl("");
    const first = Object.keys(nextErrors)[0];
    if (first) { (form.current?.elements.namedItem(first) as HTMLElement | null)?.focus(); return; }
    const url = contactWhatsAppUrl(values);
    setReadyUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return <form ref={form} className="contact-form" onSubmit={submit} noValidate onChange={() => setReadyUrl("")}>
    <div className="form-heading"><span>נשאיר מקום לשיחה.</span><WhatsAppIcon size={24}/></div>
    <div className="form-row">
      <div className="field"><label htmlFor="contact-name">השם שלכם <span>(חובה)</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="איך קוראים לכם?" required maxLength={80} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}/>{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div>
      <div className="field"><label htmlFor="contact-phone">טלפון <span>(לא חובה)</span></label><input id="contact-phone" name="phone" type="tel" dir="ltr" autoComplete="tel" placeholder="050-000-0000" maxLength={22} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined}/>{errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}</div>
    </div>
    <div className="field"><label htmlFor="contact-message">במה אפשר לעזור? <span>(חובה)</span></label><textarea id="contact-message" name="message" placeholder="אשמח לשמוע עוד על…" required maxLength={1500} rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined}/>{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
    <button className="button button-dark form-submit" type="submit" disabled={!interactive}>הכנת הודעה ב־WhatsApp <ArrowIcon/></button>
    <noscript><p className="form-note">להכנת הודעה דרך הטופס יש להפעיל JavaScript. אפשר גם <a href={whatsappUrl()}>לפתוח שיחה ישירה ב־WhatsApp</a>.</p></noscript>
    <p className="form-note">{site.contact.formNote}</p>
    <div role="status" aria-live="polite" className="form-status">{readyUrl && <p>ההודעה מוכנה. אם WhatsApp לא נפתח, <a href={readyUrl} target="_blank" rel="noopener noreferrer">לחצו כאן לפתיחת ההודעה</a>. השליחה מתבצעת ב־WhatsApp בלבד.</p>}</div>
  </form>;
}
