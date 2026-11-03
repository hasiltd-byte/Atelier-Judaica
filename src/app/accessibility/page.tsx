import type { Metadata } from "next";
import { siteUrl, socialImages } from "@/lib/seo";
export const metadata: Metadata = {
  title: "נגישות | רימון", description: "אפשרויות הנגישות באתר רימון.",
  ...(siteUrl ? { alternates: { canonical: "/accessibility/" } } : {}),
  openGraph: { title: "נגישות | רימון", siteName: "רימון", images: socialImages, ...(siteUrl ? { url: `${siteUrl}/accessibility/` } : {}) },
};
export default function AccessibilityPage() {
  return <main id="main" className="document-page container" tabIndex={-1}><a className="text-link" href="/">→ חזרה לאתר</a><p className="eyebrow">RIMON / ACCESSIBILITY</p><h1>נגישות</h1><p>האתר כולל התאמות לשימוש במקלדת, בקוראי מסך ובמסכים בגדלים שונים.</p><h2>אפשרויות באתר</h2><ul><li>קישור לדילוג לתוכן הראשי ומבנה כותרות מסודר.</li><li>מיקוד ברור, ניווט מקלדת וחלונות קטלוג נגישים.</li><li>תוויות ושגיאות טקסטואליות בטופס.</li><li>כפתור השהיית אנימציות ותמיכה בהעדפה להפחתת תנועה.</li></ul><h2>משוב ובקשות</h2><p>פרטי הגורם המטפל בפניות נגישות יתווספו לפני פתיחת החנות. אפשר להכין ולשמור תיאור של הקושי באמצעות <a href="/#contact">אזור הפנייה</a>; הטופס אינו שולח הודעות.</p><p className="content-placeholder">הצהרת נגישות מלאה ופרטי קשר יושלמו לפני הפעלת שירות מסחרי. המידע כאן מתאר את ההתאמות באתר ואינו אישור עמידה בתקן.</p></main>;
}
