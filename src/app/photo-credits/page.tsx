import type { Metadata } from "next";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "קרדיטים לצילומים | Atelier Judaica",
  description: "מקורות הצילומים המשמשים להשראה ולהמחשת העיצוב באתר Atelier Judaica.",
  ...(siteUrl ? { alternates: { canonical: "/photo-credits/" } } : {}),
};

const photos = [
  ["Tamara Harhai", "כלי קרמיקה על בד טבעי", "https://unsplash.com/photos/-cfd9px-GV8"],
  ["Tamara Harhai", "זוג כלי קרמיקה", "https://unsplash.com/photos/tSkPbVkiCqY"],
  ["Mary Skrynnikova", "אגרטלים לבנים באור טבעי", "https://unsplash.com/photos/7T12an8w_hQ"],
  ["Earl Wilcox", "תהליך עבודה באובניים", "https://unsplash.com/photos/88DYIsFhuSs"],
  ["Chloe Bolton", "אוסף כלי קרמיקה", "https://unsplash.com/photos/R0qthXq3jec"],
];
export default function PhotoCredits() {
  return <main id="main" className="document-page container" tabIndex={-1}><a className="text-link" href="/">→ חזרה לאתר</a><p className="eyebrow">ATELIER JUDAICA / PHOTOGRAPHY</p><h1>מאחורי הצילומים.</h1><p>הצילומים באתר הם צילומי אווירה והשראה מ־Unsplash. הם אינם מתעדים את אסתר, את הסטודיו שלה או את מוצרי Atelier Judaica. הכותרות בקטלוג מתארות כיווני השראה, ולא שמות של מוצרים למכירה.</p><h2>הצלמים והמקורות</h2><ul>{photos.map(([author, description, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{description} — <span dir="ltr">{author}</span></a></li>)}</ul><p>הצילומים הורדו מהאוסף החינמי ומשמשים בהתאם ל־<a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer">רישיון Unsplash</a>. הקבצים דחוסים ומוגשים מקומית, ללא טעינה משירות תמונות חיצוני בזמן הגלישה.</p><p>לפני השקת הקולקציה למכירה, יש להחליף את צילומי ההשראה בתמונות ובפרטי מוצרים מאושרים של בעלת העסק.</p></main>;
}
