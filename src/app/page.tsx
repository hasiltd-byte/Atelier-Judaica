import Image from "next/image";
import { Header } from "@/components/header";
import { ContactForm } from "@/components/contact-form";
import { ArrowIcon, RotatingSeal, Spark, WhatsAppIcon } from "@/components/icons";
import { Catalog } from "@/components/catalog";
import { MotionControls } from "@/components/motion";
import { PhotoTilt } from "@/components/photo-tilt";
import { site } from "@/data/site";
import { whatsappUrl } from "@/lib/contact";
import { siteUrl, structuredData } from "@/lib/seo";

export default function Home() {
  return <div id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(siteUrl)).replace(/</g, "\\u003c") }}/>
    <Header/>
    <main id="main" tabIndex={-1}>
      <section className="hero-stage" aria-labelledby="hero-title">
        <div className="hero-photo"><picture><source media="(max-width: 600px)" srcSet="/images/hero-still-life-mobile.webp"/><img src="/images/hero-still-life.webp" width="1500" height="2249" alt="צילום אווירה: שלושה כלי קרמיקה על בד טבעי באור שמש, צילום Tamara Harhai; לא יצירות של אסתר" fetchPriority="high" decoding="async"/></picture><span className="photo-credit">צילום אווירה · Tamara Harhai / Unsplash</span><span className="hero-photo-word" dir="ltr" aria-hidden="true">Objects <br/><em>with soul.</em></span></div>
        <div className="hero-content">
          <p className="eyebrow"><span className="tiny-line"/>ATELIER JUDAICA · אמנות לבית</p>
          <h1 id="hero-title">אמנות עם <br/><em>נשמה.</em><span>לבית עם אופי.</span></h1>
          <p className="hero-description">יש דברים שלא רק מניחים בבית. <br/>נותנים להם מקום בלב.</p>
          <div className="hero-actions"><a href="#shop" className="button button-gold">לגלות את הקולקציה <ArrowIcon/></a><a href="#about" className="hero-about">הסיפור של האטלייה <span aria-hidden="true">↗</span></a></div>
          <div className="hero-bottom"><span className="hero-scroll" aria-hidden="true">↓</span><span>לגלול. להרגיש. לגלות.</span><span className="hero-index" dir="ltr">01 — 04</span></div>
        </div>
        <div className="hero-seal"><RotatingSeal/></div>
        <figure className="hero-floating" aria-hidden="true"><Image src="/images/white-vases.webp" alt="" width={1000} height={1312} sizes="150px" loading="lazy"/><figcaption>היופי נמצא בפרטים.</figcaption></figure>
      </section>

      <div className="marquee" role="img" aria-label="אמנות, בית, נשמה"><div className="marquee-track" aria-hidden="true">{[0, 1, 2, 3].map(i => <span className="marquee-group" key={i}><span>אמנות.</span><Spark/><em>Made for a meaningful home.</em><Spark/><span>בית. נשמה.</span><Spark/></span>)}</div></div>

      <section id="gallery" className="gallery-section section-pad container" aria-labelledby="gallery-title">
        <div className="editorial-intro" data-reveal><p className="eyebrow">01 / THE GALLERY</p><h2 id="gallery-title">יש פריטים שממלאים חלל. <br/>ויש כאלה <em>שנותנים לו אופי.</em></h2><p>{site.gallery.description}</p></div>
        <div className="editorial-grid">
          <a href="#shop" className="editorial-card" data-reveal><Image src="/images/ceramic-pair.webp" alt="צילום השראה של כלי קרמיקה בגוונים טבעיים" width={1000} height={1499} sizes="(max-width: 600px) 90vw, 35vw" loading="lazy"/><span className="editorial-number" dir="ltr">01 / OBJECTS</span><span className="editorial-caption"><span><small>צורה. טקסטורה. נוכחות.</small><strong>כלים ואובייקטים</strong></span><ArrowIcon/></span><span className="editorial-disclaimer">צילום השראה</span></a>
          <a href="#about" className="editorial-card editorial-card-short" data-reveal><Image src="/images/studio-hands.webp" alt="צילום אווירה של ידיים בעבודת קדרות; אינו מתעד את אסתר או את הסטודיו שלה" width={1200} height={800} sizes="(max-width: 600px) 45vw, 28vw" loading="lazy"/><span className="editorial-number" dir="ltr">02 / THE PROCESS</span><span className="editorial-caption"><span><small>בין הרעיון למגע.</small><strong>חומר ומלאכה</strong></span><ArrowIcon/></span><span className="editorial-disclaimer">צילום אווירה</span></a>
          <a href="#shop" className="editorial-card" data-reveal><Image src="/images/white-vases.webp" alt="צילום השראה של אגרטלים לבנים וענף באור טבעי" width={1000} height={1312} sizes="(max-width: 600px) 45vw, 32vw" loading="lazy"/><span className="editorial-number" dir="ltr">03 / LIVING</span><span className="editorial-caption"><span><small>הבית, בגרסה האישית שלכם.</small><strong>אמנות בחלל</strong></span><ArrowIcon/></span><span className="editorial-disclaimer">צילום השראה</span></a>
        </div>
        <p className="image-disclosure">{site.gallery.note}</p>
      </section>

      <section id="shop" className="shop-section section-pad" aria-labelledby="shop-title"><div className="container"><div className="section-heading" data-reveal><div><p className="eyebrow">02 / THE ATELIER EDIT</p><h2 id="shop-title">פריטים קטנים. <br/><em>אהבה גדולה.</em></h2></div><div className="shop-intro"><p>לבחור את מה שמרגיש לכם נכון. <br/>קטלוג השראה לאמנות ולפריטים לבית.</p><a href="#contact" className="text-link">בחירה אישית עם אסתר <ArrowIcon/></a></div></div><Catalog/></div></section>

      <section className="perspective-section" aria-labelledby="perspective-title"><div className="container perspective-grid"><div className="perspective-copy" data-reveal><p className="eyebrow">A NEW POINT OF VIEW</p><h2 id="perspective-title">אותו חלל. <br/>תחושה <em>אחרת.</em></h2><p>לפעמים, כל מה שצריך הוא פרט אחד. <br/>קימור של כלי. משחק של אור. <br/>משהו שעוצר לרגע את המבט.</p><a href="#shop" className="button button-outline">למצוא את ההשראה שלכם <ArrowIcon/></a><p className="perspective-hint"><span aria-hidden="true">↔</span> הזיזו את העכבר על התמונה ושנו את נקודת המבט.</p></div><div className="perspective-art"><div className="perspective-orbit" aria-hidden="true"/><span className="perspective-word" aria-hidden="true" dir="ltr">S O U L</span><PhotoTilt/><span className="perspective-photo-note">צילום השראה · לא מוצר למכירה</span></div></div></section>

      <section id="about" className="about-section section-pad container" aria-labelledby="about-title"><div className="about-image" data-reveal><Image src="/images/studio-hands.webp" alt="צילום אווירה: ידיים יוצרות כלי על אובניים, צילום Earl Wilcox; לא תיעוד של Atelier Judaica" width={1200} height={800} sizes="(max-width: 800px) 90vw, 48vw" loading="lazy"/><span>צילום אווירה · Earl Wilcox / Unsplash</span><div className="about-image-label" aria-hidden="true" dir="ltr">Behind <br/><em>the atelier.</em></div></div><div className="about-copy" data-reveal><p className="eyebrow">03 / THE PERSON BEHIND THE ART</p><h2 id="about-title">נעים להכיר, <br/><em>אסתר.</em></h2>{site.about.paragraphs.map(p => <p className="about-description" key={p}>{p}</p>)}<p className="content-placeholder">{site.about.placeholder}</p><a href="#contact" className="text-link">נדבר על אמנות ועל הבית שלכם <ArrowIcon/></a><div className="about-signature">אסתר<span dir="ltr">Atelier Judaica</span></div></div></section>

      <div className="quote-band"><p data-reveal>אמנות היא לא עוד דבר בבית. <br/><em>היא הדרך להרגיש בו.</em></p><span dir="ltr">ATELIER JUDAICA / ARTFUL LIVING</span></div>

      <section id="faq" className="faq-section section-pad container" aria-labelledby="faq-title"><div className="faq-intro" data-reveal><p className="eyebrow">GOOD TO KNOW</p><h2 id="faq-title">שאלות קטנות. <br/><em>לפני הבחירה.</em></h2><p>כל מה שרציתם לדעת, <br/>ואנחנו כאן גם לכל שאלה נוספת.</p><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-link">שואלים את אסתר <ArrowIcon/></a></div><div className="faq-list">{site.faq.map((item, index) => <details key={item.question}><summary><span className="faq-index" dir="ltr">0{index + 1}</span><h3>{item.question}</h3><span className="faq-plus" aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="container contact-grid"><div className="contact-copy" data-reveal><p className="eyebrow">04 / LET’S MAKE IT PERSONAL</p><h2 id="contact-title">כל דבר יפה <br/>מתחיל <em>בשיחה.</em></h2><p>{site.contact.description}</p><div className="contact-links"><a className="contact-link" href={`tel:${site.phoneHref}`}><span className="contact-link-label">לשיחה</span><span dir="ltr">{site.phone}</span><ArrowIcon/></a><a className="contact-link" href={`mailto:${site.email}`}><span className="contact-link-label">למייל</span><span dir="ltr">{site.email}</span><ArrowIcon/></a><a className="contact-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><span className="contact-link-label">להודעה</span><span>נדבר ב־WhatsApp</span><WhatsAppIcon/></a></div></div><ContactForm/></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-main"><a href="#top" className="footer-brand" lang="en" dir="ltr">atelier<span>JUDAICA</span></a><p>אמנות. בית. נשמה.</p><a href="#top" className="back-top">בחזרה למעלה <span aria-hidden="true">↑</span></a></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Atelier Judaica</p><a href="/photo-credits/">קרדיטים לצילומים</a><a href="/accessibility/">נגישות ויצירת קשר</a><MotionControls/></div></footer>
    <aside aria-label="יצירת קשר מהירה"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="floating-whatsapp" aria-label="נדבר? פתיחת שיחה עם אסתר ב־WhatsApp בחלון חדש"><WhatsAppIcon size={25}/><span>נדבר?</span></a></aside>
  </div>;
}
