import type { Metadata } from "next";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `נגישות ויצירת קשר | ${site.name}`,
  description: "מידע על אפשרויות הנגישות ודרכי הפנייה בנושא נגישות באתר Atelier Judaica.",
  ...(siteUrl ? { alternates: { canonical: "/accessibility/" }, openGraph: { title: `נגישות ויצירת קשר | ${site.name}`, url: `${siteUrl}/accessibility/` } } : {}),
};

export default function AccessibilityPage() {
  return <main id="main" className="document-page container" tabIndex={-1}><a className="text-link" href="/">→ חזרה לאתר</a><p className="eyebrow">ATELIER JUDAICA</p><h1>נגישות ויצירת קשר</h1><p>האתר נבנה תוך התחשבות בשימוש במקלדת, בקוראי מסך ובמסכים בגדלים שונים.</p><h2>אפשרויות באתר</h2><ul><li>קישור לדילוג ישירות לתוכן הראשי ומבנה כותרות מסודר.</li><li>ניווט במקלדת ומיקוד ברור בקישורים ובכפתורים.</li><li>תוויות ושגיאות טקסטואליות בטופס הפנייה.</li><li>תמיכה בהגדלת התצוגה ובהעדפת מערכת להפחתת תנועה.</li></ul><h2>נתקלתם בקושי?</h2><p>אפשר לפנות לאסתר במייל <a href={`mailto:${site.email}`}>{site.email}</a> או בטלפון <a href={`tel:${site.phoneHref}`} dir="ltr">{site.phone}</a>. מומלץ לציין מה ניסיתם לבצע, באיזה עמוד ובאיזה מכשיר או דפדפן.</p><p className="content-placeholder">פרטי הצהרת נגישות מלאה ובדיקות נוספות יושלמו לאחר אישור בעלת העסק. המידע כאן מתאר את ההתאמות שיושמו ואינו אישור עמידה בתקן.</p></main>;
}
