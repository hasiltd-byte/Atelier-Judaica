export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  category: "כלים ואובייקטים" | "אמנות בחלל";
  subtitle: string;
};

export const site = {
  name: "Atelier Judaica",
  contactName: "אסתר",
  title: "Atelier Judaica | אמנות לבית מבית אסתר",
  description: "Atelier Judaica — אמנות לבית. מכירות ושירות אונליין עם אסתר. לבירור על עבודות ומוצרים, צרו קשר ב־WhatsApp, בטלפון או במייל.",
  phone: "054-700-7608",
  phoneHref: "+972547007608",
  whatsapp: "972547007608",
  email: "myatelierjudaica@gmail.com",
  service: "מכירות ושירות אונליין",
  nav: [
    { label: "הגלריה", href: "#gallery" },
    { label: "החנות", href: "#shop" },
    { label: "נעים להכיר", href: "#about" },
    { label: "שאלות נפוצות", href: "#faq" },
  ],
  hero: {
    eyebrow: "ATELIER JUDAICA · אמנות לבית",
    heading: "אמנות עם נשמה.",
    headingSecond: "מבית Atelier Judaica",
    tagline: "לבית עם אופי.",
    description: "ברוכים הבאים ל־Atelier Judaica. מרחב לאמנות לבית, עם מכירות ושירות אונליין וקשר ישיר עם אסתר.",
  },
  gallery: {
    eyebrow: "THE GALLERY",
    heading: "כשאמנות הופכת לבית.",
    description: "מפגש של צורה, אור וטקסטורה. גלריית השראה לאמנות שמכניסה עוד רובד אל החלל האישי שלנו.",
    placeholder: "מקום לתמונת יצירה מקורית",
    note: "הצילומים בגלריה ובקטלוג הם צילומי אווירה מ־Unsplash, ואינם עבודות או מוצרים של אסתר. הקולקציה המקורית תתווסף לאחר אישור.",
  },
  about: {
    eyebrow: "BEHIND THE ATELIER",
    heading: "נעים להכיר, אסתר.",
    paragraphs: [
      "Atelier Judaica הוא עסק בתחום האמנות לבית. המכירות והשירות מתקיימים אונליין, ואפשר לפנות ישירות לאסתר לשאלות ולמידע על המוצרים.",
    ],
    placeholder: "סיפור האטלייה, תהליך היצירה וההיכרות עם אסתר יתווספו כאן בהמשך, במילים שלה.",
  },
  faq: [
    { question: "איך אפשר ליצור קשר עם אסתר?", answer: "אפשר לשלוח הודעה ב־WhatsApp, להתקשר ל־054-700-7608 או לכתוב למייל myatelierjudaica@gmail.com. פרטי הקשר זמינים גם בהמשך העמוד." },
    { question: "איך אפשר לברר על עבודות ומוצרים?", answer: "אפשר לבחור תמונות השראה בקטלוג ולשלוח את הבחירה לאסתר דרך סל הפנייה ב־WhatsApp. התמונות הן צילומי אווירה, ולא מוצרים למכירה. על עבודות אמיתיות, מחירים וזמינות יש לברר ישירות עם אסתר." },
    { question: "היכן מתקיימים המכירות והשירות?", answer: "המכירות והשירות של Atelier Judaica מתקיימים אונליין. לבירור פרטים נוספים אפשר לפנות לאסתר באחד מערוצי הקשר באתר." },
    { question: "מה לגבי משלוחים, זמינות והתאמה אישית?", answer: "המידע בנושאים אלו טרם אושר לפרסום באתר. לקבלת פרטים עדכניים על זמינות, אפשרויות התאמה ותנאי משלוח, יש לפנות לאסתר לפני הזמנה." },
  ],
  contact: {
    eyebrow: "LET’S TALK",
    heading: "כל דבר יפה מתחיל בשיחה.",
    description: "יש שאלה על יצירה או מוצר? אסתר כאן לשיחה ישירה. בחרו את הדרך שנוחה לכם.",
    formNote: "הטופס מכין הודעה בלבד. היא תישלח רק לאחר אישור שלכם ב־WhatsApp. הפרטים אינם נשמרים באתר.",
  },
} as const;

export const galleryItems: GalleryItem[] = [
  { id: "01", title: "דיאלוג בחומר", subtitle: "FORM & TEXTURE", category: "כלים ואובייקטים", description: "גוונים טבעיים וקווים שקטים. צילום השראה בלבד; לבירור על הקולקציה של אסתר אפשר לשלוח פנייה.", image: { src: "/images/ceramic-pair.webp", alt: "צילום השראה: שני כלי קרמיקה על בד טבעי, צילום Tamara Harhai", width: 1000, height: 1499 } },
  { id: "02", title: "רגע של אור", subtitle: "LIGHT & STILLNESS", category: "אמנות בחלל", description: "מפגש של אור רך, לבן וטבע. צילום השראה בלבד, שאינו מוצר של Atelier Judaica.", image: { src: "/images/white-vases.webp", alt: "צילום השראה: אגרטלים לבנים עם ענף ופירות אדומים, צילום Mary Skrynnikova", width: 1000, height: 1312 } },
  { id: "03", title: "אוסף של צורות", subtitle: "THE ART OF COLLECTING", category: "כלים ואובייקטים", description: "צורות וטקסטורות שיוצרות יחד שפה. צילום השראה בלבד; פרטי עבודות מקוריות יתווספו לאחר אישור.", image: { src: "/images/ceramic-collection.webp", alt: "צילום השראה: אוסף אגרטלי קרמיקה על מדף עץ, צילום Chloe Bolton", width: 1100, height: 733 } },
];
