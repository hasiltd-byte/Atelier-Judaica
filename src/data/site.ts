export type WorkCategory = "לשולחן ולשבת" | "אמנות לבית";
export type ArtworkImage = { src: string; alt: string; width: number; height: number };
export type GalleryItem = { id: string; title: string; description: string; image: ArtworkImage; category: WorkCategory; subtitle: string };
const photo = (name: string, alt: string): ArtworkImage => ({ src: `/images/rimon/${name}.webp`, alt, width: name === "jerusalem" ? 1086 : 1024, height: name === "jerusalem" ? 1448 : 1536 });
export const artworkImages = {
  candlesticks: photo("candlesticks", "הדמיה של זוג פמוטי קרמיקה בכחול קובלט עם נרות לבנים"),
  kiddush: photo("kiddush", "הדמיה של גביע קידוש וקערית מקרמיקה בגוון קורל"),
  mezuzah: photo("mezuzah", "הדמיה של בית מזוזה מקרמיקה בגוון טורקיז"),
  hamsa: photo("hamsa", "הדמיה של חמסה צבעונית מקרמיקה על קיר צהוב"),
  pomegranate: photo("pomegranate", "הדמיה של צלחת רימון בגוון טורקיז"),
  jerusalem: photo("jerusalem", "הדמיה של אמנות גאומטרית צבעונית בהשראת ירושלים במסגרת עץ"),
} satisfies Record<string, ArtworkImage>;
export const site = {
  name: "רימון",
  title: "רימון | יודאיקה בצבע אחר — אמנות, שבת ובית",
  description: "יודאיקה בצבע אחר. פמוטים, כלי קידוש, מזוזות ואמנות לבית בשפה עכשווית של צבע, צורה ומסורת. גלו את עולם ההשראה של רימון.",
  service: "מסורת. עם טוויסט.",
  nav: [{ label: "ההשראה", href: "#gallery" }, { label: "הקולקציה", href: "#shop" }, { label: "העולם שלנו", href: "#about" }, { label: "שאלות נפוצות", href: "#faq" }],
  hero: { eyebrow: "A FRESH TAKE ON TRADITION", description: "לרגע שבו מדליקים נרות. לשולחן שכולם מתכנסים סביבו. לפינה שעושה לכם שמח. יודאיקה שמחברת מסורת, עיצוב והמון צבע." },
  about: { paragraphs: ["אנחנו אוהבים את הרגעים הקטנים שהופכים מקום לבית: אור של נר, שולחן ערוך, חפץ עם משמעות. רימון הוא עולם של יודאיקה שמסתכל על המסורת בעיניים רעננות.", "כחול עמוק לצד קורל, צורות רכות ליד קווים נקיים. מפגש בין סמלים מוכרים לשפה עכשווית, שמזמין לתת לאופי שלכם מקום גם בחפצים שסביבכם.", "כאן אפשר לגלות כיוונים, לשמור פריטים שאהבתם ולדמיין את החיבור הבא לבית שלכם."] },
  faq: [
    { question: "מה אפשר למצוא בקולקציה?", answer: "פמוטים, גביע קידוש, בית מזוזה, חמסה, צלחת רימון ואמנות בהשראת ירושלים. אפשר לסנן בין פריטים לשולחן ולשבת לבין אמנות לבית." },
    { question: "איך שומרים פריטים שאהבנו?", answer: "לוחצים על סימן הפלוס ליד הפריט. אפשר לפתוח את רשימת הבחירות ולהוריד אותה כקובץ טקסט למכשיר. הבחירה נשמרת רק במהלך הביקור הנוכחי." },
    { question: "האם ניתן לרכוש דרך האתר?", answer: "כרגע הקולקציה היא קטלוג השראה. התמונות הן הדמיות שנוצרו עבור האתר, ולא מוצרים שמוצעים למכירה. מחירים, מלאי ואפשרויות הזמנה יתווספו עם השקת החנות." },
    { question: "אפשר להכין פנייה עם רעיון אישי?", answer: "כן. באזור הפנייה אפשר לנסח רעיון ולהעתיק אותו. לא נשלחת הודעה ולא נשמרים פרטים באתר; ערוצי הקשר יתווספו עם פתיחת ההזמנות." },
  ],
} as const;
export const galleryItems: GalleryItem[] = [
  { id: "01", title: "אור בכחול", subtitle: "SHABBAT / COBALT", category: "לשולחן ולשבת", image: artworkImages.candlesticks, description: "זוג פמוטים בגוון קובלט ובצורות רכות. רעיון לשולחן שבת עם נוכחות צבעונית ושקטה בו־זמנית." },
  { id: "02", title: "לחיים בקורל", subtitle: "KIDDUSH / CORAL", category: "לשולחן ולשבת", image: artworkImages.kiddush, description: "גביע קידוש וקערית בגוון קורל חם. פרשנות עכשווית לרגע של ברכה סביב השולחן." },
  { id: "03", title: "ברכה בפתח", subtitle: "MEZUZAH / TURQUOISE", category: "אמנות לבית", image: artworkImages.mezuzah, description: "בית מזוזה בגוון טורקיז ובצללית מאורכת. נגיעה קטנה של צבע ומשמעות בכניסה לבית. ההדמיה מציגה את הבית החיצוני בלבד, ללא קלף." },
  { id: "04", title: "יד של צבע", subtitle: "HAMSA / GOOD ENERGY", category: "אמנות לבית", image: artworkImages.hamsa, description: "חמסה בקורל ובכחול, עם משחק גאומטרי וקווים חופשיים. רעיון לקיר שמעלה חיוך." },
  { id: "05", title: "שפע בטורקיז", subtitle: "POMEGRANATE / ABUNDANCE", category: "לשולחן ולשבת", image: artworkImages.pomegranate, description: "צלחת בהשראת הרימון, בגוון טורקיז עשיר ובצללית משחקית. מפגש של סמל מוכר עם שולחן עכשווי." },
  { id: "06", title: "ירושלים בצבע", subtitle: "JERUSALEM / NEW PERSPECTIVE", category: "אמנות לבית", image: artworkImages.jerusalem, description: "קשתות, גגות וצורות גאומטריות בקובלט, קורל וצהוב. מבט מופשט על ירושלים, במסגרת עץ חמימה." },
];
export const catalogCategories = ["הכול", "לשולחן ולשבת", "אמנות לבית"] as const;
