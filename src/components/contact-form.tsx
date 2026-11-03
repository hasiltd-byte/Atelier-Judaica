"use client";
import { useEffect, useRef, useState } from "react";
import { contactText, saveText, validateContact, type ContactErrors, type ContactValues } from "@/lib/contact";
import { ArrowIcon, Spark } from "./icons";

export function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [ready, setReady] = useState("");
  const [status, setStatus] = useState("");
  const [interactive, setInteractive] = useState(false);
  useEffect(() => { setInteractive(true); }, []);
  const form = useRef<HTMLFormElement>(null);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values: ContactValues = { name: String(data.get("name") || ""), phone: String(data.get("phone") || ""), message: String(data.get("message") || "") };
    const nextErrors = validateContact(values); setErrors(nextErrors); setReady(""); setStatus("");
    const first = Object.keys(nextErrors)[0];
    if (first) { (form.current?.elements.namedItem(first) as HTMLElement | null)?.focus(); return; }
    setReady(contactText(values)); setStatus("הטקסט מוכן. אפשר להעתיק או לשמור אותו; הוא לא נשלח.");
  }
  async function copy() {
    try { await navigator.clipboard.writeText(ready); setStatus("הטקסט הועתק. לא נשלחה פנייה."); }
    catch { setStatus("אפשר לבחור ולהעתיק את הטקסט משדה ההודעה המוכנה, או לשמור אותו כקובץ."); }
  }
  return <form ref={form} className="contact-form" onSubmit={submit} noValidate onChange={() => { setReady(""); setStatus(""); }}>
    <div className="form-heading"><span>יש לכם רעיון? יש לו מקום.</span><Spark/></div>
    <div className="form-row"><div className="field"><label htmlFor="contact-name">השם שלכם <span>(חובה)</span></label><input id="contact-name" name="name" autoComplete="name" placeholder="איך קוראים לכם?" required maxLength={80} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}/>{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div><div className="field"><label htmlFor="contact-phone">טלפון <span>(לא חובה)</span></label><input id="contact-phone" name="phone" type="tel" dir="ltr" autoComplete="tel" placeholder="מספר לחזרה בעתיד" maxLength={22} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined}/>{errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}</div></div>
    <div className="field"><label htmlFor="contact-message">ספרו לנו על הרעיון <span>(חובה)</span></label><textarea id="contact-message" name="message" placeholder="חשבתי על משהו בצבע…" required maxLength={1500} rows={4} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined}/>{errors.message && <p className="field-error" id="message-error">{errors.message}</p>}</div>
    <button className="button button-dark form-submit" type="submit" disabled={!interactive}>הכנת פנייה לשמירה <ArrowIcon/></button><p className="form-note">הטופס מכין טקסט בלבד. אין שליחה או שמירת פרטים באתר. ערוצי הקשר יתווספו בהמשך.</p>
    {ready && <div className="prepared-message"><label htmlFor="prepared-text">הפנייה המוכנה שלכם</label><textarea id="prepared-text" readOnly value={ready} rows={6}/><div><button type="button" className="text-link" onClick={copy}>העתקת הטקסט</button><button type="button" className="text-link" onClick={() => saveText(ready, "rimon-message.txt")}>שמירה כקובץ</button></div></div>}
    <p role="status" aria-live="polite" className="form-status">{status}</p><noscript><p className="form-note">להכנת פנייה לשמירה נדרש JavaScript.</p></noscript>
  </form>;
}
