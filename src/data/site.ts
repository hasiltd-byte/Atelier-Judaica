export type WorkCategory = "מפות ישראל" | "מילים וסמלים";
export type ArtworkImage = { src: string; alt: string; width: number; height: number };
export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  image: ArtworkImage;
  category: WorkCategory;
  subtitle: string;
  sourceUrl: string;
  dimensions?: string;
};

export const socialLinks = {
  instagram: "https://www.instagram.com/atelierjudaica/",
  facebook: "https://www.facebook.com/p/Atelier-Judaica-100079152423019/",
  story: "https://www.instagram.com/atelierjudaica/reel/DF2UYYxMxZl/",
} as const;

export const artworkImages = {
  israel: { src: "/images/atelier/israel-gold.webp", alt: "יצירה של Atelier Judaica: מפת ישראל בגוון זהב על רקע לבן עשיר בטקסטורה ובאותיות", width: 1400, height: 1867 },
  chai: { src: "/images/atelier/chai.webp", alt: "יצירת חי של אסתר: אותיות בגוונים טבעיים בתוך מסגרת, על קיר אבן", width: 1400, height: 1867 },
  ahava: { src: "/images/atelier/ahava.webp", alt: "אהבה — יצירה של אסתר עם אותיות לבנות על רקע עלי זהב וחול ישראלי", width: 1400, height: 1867 },
  star: { src: "/images/atelier/magen-david.webp", alt: "מגן דוד עשיר בטקסטורה בגוון זהב על רקע כחול, יצירה של Atelier Judaica", width: 1400, height: 1867 },
  shin: { src: "/images/atelier/shin.webp", alt: "האות שין בגווני נחושת וזהב על רקע לבן, מתוך העבודות של Atelier Judaica", width: 1400, height: 1867 },
  poppies: { src: "/images/atelier/israel-poppies.webp", alt: "מפת ישראל מעוטרת בפרחים אדומים, מתוך עבודות הזיכרון של Atelier Judaica", width: 1400, height: 1867 },
  texture: { src: "/images/atelier/texture-detail.webp", alt: "תקריב של יצירה של אסתר: טקסטורה לבנה לצד טורקיז ופרטים בגוון זהב", width: 1400, height: 1867 },
  portrait: { src: "/images/atelier/esther.webp", alt: "אסתר מציגה יצירה של מפת ישראל, מתוך הפוסט שבו היא מספרת על סיפור Atelier Judaica", width: 361, height: 640 },
  process: { src: "/images/atelier/process.webp", alt: "אסתר עם אחת היצירות שלה בתהליך העבודה, מתוך פרסום של Atelier Judaica", width: 361, height: 640 },
} satisfies Record<string, ArtworkImage>;

export const site = {
  name: "Atelier Judaica",
  contactName: "אסתר",
  title: "Atelier Judaica | אמנות יודאיקה בטקסטורה — אסתר",
  description: "אמנות יודאיקה עשירה בטקסטורה בהשראת ישראל והמורשת היהודית. גלו את היצירות של אסתר, מפות ישראל, אותיות וסמלים, ופנו להזמנה אישית ב־Atelier Judaica.",
  phone: "054-700-7608",
  phoneHref: "+972547007608",
  whatsapp: "972547007608",
  email: "myatelierjudaica@gmail.com",
  service: "מכירות ושירות אונליין",
  nav: [
    { label: "הגלריה", href: "#gallery" },
    { label: "הקולקציה", href: "#shop" },
    { label: "הסיפור שלי", href: "#about" },
    { label: "שאלות נפוצות", href: "#faq" },
  ],
  hero: {
    eyebrow: "TEXTURED JUDAICA ART",
    heading: "ישראל. מורשת.",
    emphasis: "אמנות.",
    tagline: "להכניס הביתה אור ותקווה.",
    description: "יצירות יודאיקה עשירות בטקסטורה, בהשראת ישראל והמורשת היהודית. אמנות של זהות, שייכות וחיבור — מבית Atelier Judaica.",
  },
  gallery: {
    eyebrow: "THE ART OF BELONGING",
    heading: "חיבור שאפשר להרגיש.",
    description: "מפת ישראל, אותיות וסמלים יהודיים מקבלים נוכחות דרך מרקם, צבע וחומר. הצצה לעולם היצירה של אסתר.",
    note: "כל צילומי העבודות בעמוד נלקחו מהפרופילים של Atelier Judaica שצורפו לפרויקט. פרטי כל יצירה וזמינותה לבירור ישיר עם אסתר.",
  },
  about: {
    eyebrow: "THE STORY BEHIND THE ART",
    heading: "נעים להכיר, אסתר.",
    paragraphs: [
      "מאחורי Atelier Judaica עומדת אסתר, שיוצרת אמנות בטקסטורה מתוך חיבור לישראל ולמורשת היהודית. ביצירות שלה, סמלים מוכרים פוגשים עיצוב עכשווי ושפה אישית של אור ותקווה.",
      "בפוסט שבו שיתפה את סיפורה, אסתר מתארת כיצד פנתה לציור לאחר אירועי 7 באוקטובר, בתקופה שבה בן זוגה שירת במילואים. היצירה הפכה עבורה למרחב של ביטוי וחוסן — ודרך לתת לרגש צורה.",
      "החיבור הזה נוכח גם בקולקציה: מפות ישראל, אותיות ומילים שמספרות על שורשים, זיכרון ושייכות. אפשר לפנות לאסתר גם להזמנה אישית.",
    ],
  },
  faq: [
    { question: "איך אפשר ליצור קשר עם אסתר?", answer: "אפשר לשלוח הודעה ב־WhatsApp, להתקשר ל־054-700-7608 או לכתוב למייל myatelierjudaica@gmail.com. אפשר גם לפנות דרך פרופילי Instagram ו־Facebook של Atelier Judaica." },
    { question: "איך מבררים על יצירה מהקולקציה?", answer: "בחרו את העבודות שאהבתם והוסיפו אותן לסל הפנייה. משם תוכלו להכין הודעת WhatsApp עם הבחירות ולברר עם אסתר מחיר, מידות וזמינות. הוספה לסל אינה הזמנה או שמירת יצירה." },
    { question: "אפשר להזמין יצירה בהתאמה אישית?", answer: "כן. בפרופילים של Atelier Judaica מוצעת אפשרות להזמנות אישיות. אפשר לפנות לאסתר עם הרעיון, המידה והכיוון הרצוי, ולתאם איתה את האפשרויות והפרטים." },
    { question: "מה לגבי משלוחים וזמני הכנה?", answer: "תנאי משלוח וזמני הכנה לא נקבעו באתר. לפני הזמנה יש לברר עם אסתר את זמינות העבודה, אופן המשלוח וזמן ההכנה בהתאם לבקשה." },
  ],
  contact: {
    eyebrow: "LET’S CREATE SOMETHING MEANINGFUL",
    heading: "כל יצירה מתחילה בחיבור.",
    description: "אהבתם עבודה מהגלריה, או שיש לכם רעיון ליצירה אישית? אפשר לפנות לאסתר ולספר על מה שחשוב לכם להכניס הביתה.",
    formNote: "הטופס מכין הודעה בלבד. היא תישלח רק לאחר אישור שלכם ב־WhatsApp. הפרטים אינם נשמרים באתר.",
  },
} as const;

export const galleryItems: GalleryItem[] = [
  { id: "01", title: "מפת ישראל בזהב", subtitle: "ISRAEL & ROOTS", category: "מפות ישראל", image: artworkImages.israel, description: "מפת ישראל בגוון זהב על רקע לבן עם טקסטורה וטקסט עברי. העבודה הוצגה בפרופיל Atelier Judaica כחלק מהקולקציה. פרטי מחיר ומידות מול אסתר.", sourceUrl: "https://www.instagram.com/atelierjudaica/p/DfFBj41DnEm/" },
  { id: "02", title: "חי", subtitle: "CHAI · LIFE", category: "מילים וסמלים", image: artworkImages.chai, description: "יצירה עם המילה חי, בגוונים טבעיים ובטקסטורה. בפוסט המקורי היא מוצגת כעבודה בהזמנה אישית, במידה 60×60 ס״מ.", dimensions: "60×60 ס״מ — לפי הפרסום המקורי", sourceUrl: "https://www.instagram.com/atelierjudaica/p/DaxC4Yijrbv/" },
  { id: "03", title: "אהבה", subtitle: "AHAVA · LOVE", category: "מילים וסמלים", image: artworkImages.ahava, description: "אותיות אהבה על רקע זהב. לפי הפרסום של אסתר, העבודה משלבת עלי זהב וחול ישראלי על קנבס במידה 80×80 ס״מ.", dimensions: "80×80 ס״מ — לפי הפרסום המקורי", sourceUrl: "https://www.instagram.com/atelierjudaica/p/DZsMwISAnZm/" },
  { id: "04", title: "מגן דוד", subtitle: "HERITAGE & LIGHT", category: "מילים וסמלים", image: artworkImages.star, description: "מגן דוד בטקסטורה ובגוון זהב על רקע כחול עמוק. צילום מתוך העבודות שפורסמו בעמוד Atelier Judaica. מידות וזמינות לבירור אישי.", sourceUrl: "https://www.facebook.com/photo/?fbid=936371239011282" },
  { id: "05", title: "האות שין", subtitle: "LETTERS & MEANING", category: "מילים וסמלים", image: artworkImages.shin, description: "האות שין בגוונים חמים על מצע לבן. העבודה מופיעה בעמוד Atelier Judaica ומשלבת את השפה הצורנית של האות עם נוכחות של חומר וטקסטורה.", sourceUrl: "https://www.facebook.com/photo/?fbid=975345218447217" },
  { id: "06", title: "מפת ישראל ופרחים אדומים", subtitle: "MEMORY & HOPE", category: "מפות ישראל", image: artworkImages.poppies, description: "מפת ישראל מעוטרת בפרחים אדומים. בפוסט המקורי אסתר מציגה את העבודה כחלק מיצירות זיכרון לקורבנות 7 באוקטובר.", sourceUrl: "https://www.instagram.com/atelierjudaica/p/DeEmJ6-Dnaw/" },
];

export const catalogCategories = ["הכול", "מפות ישראל", "מילים וסמלים"] as const;
