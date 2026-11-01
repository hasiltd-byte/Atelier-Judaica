import type { Metadata } from "next";
import { galleryItems, socialLinks } from "@/data/site";
import { sharingOrigin, siteUrl, socialImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "מקורות וצילומי העבודות | Atelier Judaica",
  description: "הפרסומים המקוריים של עבודות Atelier Judaica והמקורות לסיפור האטלייה.",
  ...(siteUrl ? { alternates: { canonical: "/photo-credits/" } } : {}),
  openGraph: { title: "מקורות וצילומי העבודות | Atelier Judaica", url: `${sharingOrigin}/photo-credits/`, images: [socialImage] },
};

export default function PhotoCredits() {
  return <main id="main" className="document-page container" tabIndex={-1}><a className="text-link" href="/">→ חזרה לאתר</a><p className="eyebrow">ATELIER JUDAICA / ORIGINAL WORKS</p><h1>העבודות והסיפור שלהן.</h1><p>צילומי היצירות באתר מופיעים בפרופילים של Atelier Judaica ב־Instagram וב־Facebook. זכויות היוצרים ביצירות ובצילומים שמורות לבעליהן. לצד כל עבודה בקטלוג מופיע קישור לפרסום המקורי שלה.</p><h2>היצירות בקולקציה</h2><ul>{galleryItems.map(item => <li key={item.id}><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">{item.title} — לפרסום המקורי ↗</a>{item.dimensions && <span> · {item.dimensions}</span>}</li>)}</ul><h2>הסיפור של אסתר</h2><p>הטקסט על תחילת היצירה מבוסס על <a href={socialLinks.story} target="_blank" rel="noopener noreferrer">הפוסט שבו אסתר מספרת את סיפור האטלייה</a>. המידע על הזמנות אישיות ועל ההשראה מישראל ומהמורשת היהודית מופיע בפרופילי העסק.</p><h2>צילומים נוספים</h2><ul><li><a href="https://www.facebook.com/photo/?fbid=963026403012432" target="_blank" rel="noopener noreferrer">תקריב טקסטורה — מתוך עמוד Facebook של Atelier Judaica ↗</a></li><li><a href={socialLinks.story} target="_blank" rel="noopener noreferrer">הצילום של אסתר עם יצירתה — מתוך פוסט סיפור האטלייה ↗</a></li></ul><p>בחירת עבודה באתר משמשת להכנת פנייה אישית בלבד. מחיר, מידות, התאמה אישית, זמינות ומשלוח יש לתאם ישירות עם אסתר.</p><div className="social-links"><a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a></div></main>;
}
