import type { Metadata } from "next";
import { siteUrl, socialImages } from "@/lib/seo";
export const metadata: Metadata = {
  title: "על התמונות | רימון", description: "מידע על ההדמיות המקוריות בקולקציית רימון.",
  ...(siteUrl ? { alternates: { canonical: "/photo-credits/" } } : {}),
  openGraph: { title: "על התמונות | רימון", siteName: "רימון", images: socialImages, ...(siteUrl ? { url: `${siteUrl}/photo-credits/` } : {}) },
};
export default function PhotoCredits() {
  return <main id="main" className="document-page container" tabIndex={-1}><a className="text-link" href="/">→ חזרה לאתר</a><p className="eyebrow">RIMON / VISUAL WORLD</p><h1>עולם של צבע ודמיון.</h1><p>התמונות באתר הן הדמיות מקוריות שנוצרו באמצעות בינה מלאכותית עבור העיצוב הנוכחי. הן מדגימות כיווני עיצוב לפריטי יודאיקה ואמנות לבית ואינן צילומים של מלאי או מוצרים קיימים.</p><h2>מה מוצג בקולקציה?</h2><p>פמוטים, גביע קידוש, בית מזוזה, חמסה, צלחת רימון ואמנות גאומטרית בהשראת ירושלים. התמונות אינן מיוחסות ליוצר או לסטודיו חיצוני.</p><h2>בחירה והזמנה</h2><p>רשימת הבחירות נועדה לשמירת השראה בלבד. אין תשלום באתר, הבטחת זמינות או שמירת מוצר. פרטי מכירה וערוצי קשר יתווספו לפני השקת חנות פעילה.</p></main>;
}
