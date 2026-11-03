export type ContactValues = { name: string; phone: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = "יש למלא שם.";
  else if (values.name.trim().length > 80) errors.name = "אפשר להזין שם באורך של עד 80 תווים.";
  if (!values.message.trim()) errors.message = "כתבו כמה מילים על הרעיון שלכם.";
  else if (values.message.trim().length > 1500) errors.message = "אפשר לכתוב עד 1,500 תווים.";
  const phone = values.phone.trim();
  const digits = phone.replace(/\D/g, "");
  if (phone && (!/^\+?[\d\s()\-]{7,22}$/.test(phone) || digits.length < 7 || digits.length > 15)) errors.phone = "בדקו את מספר הטלפון או השאירו את השדה ריק.";
  return errors;
}
export function contactText(values: ContactValues) {
  return ["פנייה לרימון", `שם: ${values.name.trim()}`, ...(values.phone.trim() ? [`טלפון: ${values.phone.trim()}`] : []), "", values.message.trim()].join("\n");
}
export function saveText(text: string, filename: string) {
  const url = URL.createObjectURL(new Blob(["\ufeff", text], { type: "text/plain;charset=utf-8" }));
  const link = document.createElement("a"); link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
