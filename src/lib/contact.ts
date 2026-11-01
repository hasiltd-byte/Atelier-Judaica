import { site } from "@/data/site";

export type ContactValues = { name: string; phone: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = "איך קוראים לכם? יש למלא שם.";
  else if (values.name.trim().length > 80) errors.name = "אפשר להזין שם באורך של עד 80 תווים.";
  if (!values.message.trim()) errors.message = "כתבו כמה מילים כדי שאסתר תדע במה לעזור.";
  else if (values.message.trim().length > 1500) errors.message = "אפשר לכתוב הודעה באורך של עד 1,500 תווים.";
  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (phone && (!/^\+?[\d\s()\-]{7,22}$/.test(phone) || digits.length < 7 || digits.length > 15)) errors.phone = "בדקו שמספר הטלפון תקין, או השאירו את השדה ריק.";
  return errors;
}

export function whatsappUrl(message = "שלום אסתר, הגעתי דרך האתר של Atelier Judaica ואשמח לפרטים על העבודות.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function contactWhatsAppUrl(values: ContactValues) {
  return whatsappUrl([
    "שלום אסתר, הגעתי דרך האתר של Atelier Judaica.",
    `שמי ${values.name.trim()}.`,
    ...(values.phone.trim() ? [`טלפון לחזרה: ${values.phone.trim()}`] : []),
    "", values.message.trim(),
  ].join("\n"));
}
