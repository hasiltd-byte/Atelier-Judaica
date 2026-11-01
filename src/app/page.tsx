import Image from "next/image";
import { Header } from "@/components/header";
import { ContactForm } from "@/components/contact-form";
import { ArrowIcon, RotatingSeal, Spark, WhatsAppIcon } from "@/components/icons";
import { Catalog } from "@/components/catalog";
import { MotionControls } from "@/components/motion";
import { PhotoTilt } from "@/components/photo-tilt";
import { artworkImages, site, socialLinks } from "@/data/site";
import { whatsappUrl } from "@/lib/contact";
import { siteUrl, structuredData } from "@/lib/seo";

export default function Home() {
  return <div id="top">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(siteUrl)).replace(/</g, "\\u003c") }}/>
    <Header/>
    <main id="main" tabIndex={-1}>
      <section className="hero-stage" aria-labelledby="hero-title">
        <div className="hero-photo"><picture><source media="(max-width: 600px)" srcSet="/images/atelier/hero-mobile.avif" type="image/avif"/><source srcSet="/images/atelier/hero.avif" type="image/avif"/><source media="(max-width: 600px)" srcSet="/images/atelier/hero-mobile.webp" type="image/webp"/><img src="/images/atelier/hero.webp" width="1000" height="1333" alt={artworkImages.israel.alt} fetchPriority="high" decoding="async"/></picture><a href="https://www.instagram.com/atelierjudaica/p/DfFBj41DnEm/" target="_blank" rel="noopener noreferrer" className="photo-credit">מתוך העבודות של Atelier Judaica ↗</a><span className="hero-photo-word" dir="ltr" aria-hidden="true">Textured <br/><em>Judaica.</em></span></div>
        <div className="hero-content">
          <p className="eyebrow"><span className="tiny-line"/>{site.hero.eyebrow}</p>
          <h1 id="hero-title">יודאיקה. <br/><em>עם נשמה.</em><span>ישראל. מורשת. טקסטורה.</span></h1>
          <p className="hero-description">{site.hero.description}</p>
          <div className="hero-actions"><a href="#shop" className="button button-gold">לגלות את היצירות <ArrowIcon/></a><a href="#about" className="hero-about">הסיפור של אסתר <span aria-hidden="true">↗</span></a></div>
          <div className="hero-bottom"><span className="hero-scroll" aria-hidden="true">↓</span><span>אור ותקווה. חיבור ושייכות.</span><span className="hero-index" dir="ltr">ATELIER JUDAICA</span></div>
        </div>
        <div className="hero-seal"><RotatingSeal/></div>
        <figure className="hero-floating" aria-hidden="true"><Image {...artworkImages.ahava} alt="" sizes="150px" loading="lazy"/><figcaption>אהבה, בשכבות של חומר.</figcaption></figure>
      </section>

      <div className="marquee" role="img" aria-label="ישראל, מורשת, אמנות בטקסטורה"><div className="marquee-track" aria-hidden="true">{[0, 1, 2, 3].map(i => <span className="marquee-group" key={i}><span>ישראל. מורשת.</span><Spark/><em>Art that brings light & hope.</em><Spark/><span>אמנות עם שורשים.</span><Spark/></span>)}</div></div>

      <section id="gallery" className="gallery-section section-pad container" aria-labelledby="gallery-title">
        <div className="editorial-intro" data-reveal><p className="eyebrow">01 / {site.gallery.eyebrow}</p><h2 id="gallery-title">מעבר לצבע ולחומר, <br/><em>{site.gallery.heading}</em></h2><p>{site.gallery.description}</p></div>
        <div className="editorial-grid">
          <a href="#shop" className="editorial-card" data-reveal><Image {...artworkImages.israel} sizes="(max-width: 600px) 90vw, 35vw" loading="lazy"/><span className="editorial-number" dir="ltr">01 / ISRAEL</span><span className="editorial-caption"><span><small>שורשים. שייכות. תקווה.</small><strong>מפות ישראל</strong></span><ArrowIcon/></span></a>
          <a href="#shop" className="editorial-card editorial-card-short" data-reveal><Image {...artworkImages.ahava} sizes="(max-width: 600px) 45vw, 28vw" loading="lazy"/><span className="editorial-number" dir="ltr">02 / MEANING</span><span className="editorial-caption"><span><small>אותיות שנוגעות בלב.</small><strong>מילים וסמלים</strong></span><ArrowIcon/></span></a>
          <a href="#texture" className="editorial-card" data-reveal><Image {...artworkImages.texture} sizes="(max-width: 600px) 45vw, 32vw" loading="lazy"/><span className="editorial-number" dir="ltr">03 / TEXTURE</span><span className="editorial-caption"><span><small>לתת לרגש נוכחות.</small><strong>טקסטורה מקרוב</strong></span><ArrowIcon/></span></a>
        </div>
        <p className="image-disclosure">עבודות מקוריות מתוך הפרסומים של Atelier Judaica. <a href="/photo-credits/">למקורות הצילומים ↗</a></p>
      </section>

      <section id="shop" className="shop-section section-pad" aria-labelledby="shop-title"><div className="container"><div className="section-heading" data-reveal><div><p className="eyebrow">02 / THE COLLECTION</p><h2 id="shop-title">יצירות של זהות. <br/><em>בחירה של הלב.</em></h2></div><div className="shop-intro"><p>הקולקציה של אסתר. <br/>מפות ישראל, מילים וסמלים בטקסטורה.</p><a href="#contact" className="text-link">לבירור ולהזמנה אישית <ArrowIcon/></a></div></div><Catalog/></div></section>

      <section id="texture" className="perspective-section" aria-labelledby="perspective-title"><div className="container perspective-grid"><div className="perspective-copy" data-reveal><p className="eyebrow">LAYERS OF MEANING</p><h2 id="perspective-title">רואים את האור. <br/>מרגישים את <em>החומר.</em></h2><p>ביצירת ״אהבה״, עלי זהב וחול ישראלי <br/>נפגשים על קנבס בגודל 80×80 ס״מ. <br/>מילה אחת, עם נוכחות שלמה.</p><a href="#shop" className="button button-outline">לגלות את הקולקציה <ArrowIcon/></a><p className="perspective-hint"><span aria-hidden="true">↔</span> הזיזו את העכבר על צילום היצירה ושנו את נקודת המבט.</p></div><div className="perspective-art"><div className="perspective-orbit" aria-hidden="true"/><span className="perspective-word" aria-hidden="true" dir="ltr">A H A V A</span><PhotoTilt/><a className="perspective-photo-note" href="https://www.instagram.com/atelierjudaica/p/DZsMwISAnZm/" target="_blank" rel="noopener noreferrer">״אהבה״ · מתוך הקולקציה של אסתר ↗</a></div></div></section>

      <section id="about" className="about-section section-pad container" aria-labelledby="about-title"><figure className="about-image" data-reveal><Image {...artworkImages.portrait} sizes="(max-width: 800px) 80vw, 360px" loading="lazy"/><figcaption>אסתר עם אחת מיצירותיה · מתוך הפוסט על סיפור האטלייה</figcaption></figure><div className="about-copy" data-reveal><p className="eyebrow">03 / {site.about.eyebrow}</p><h2 id="about-title">נעים להכיר, <br/><em>אסתר.</em></h2>{site.about.paragraphs.map(p => <p className="about-description" key={p}>{p}</p>)}<a href={socialLinks.story} target="_blank" rel="noopener noreferrer" className="text-link">לסיפור המלא, במילים של אסתר <ArrowIcon/></a><div className="about-signature">אסתר<span dir="ltr">Atelier Judaica</span></div><div className="social-links"><a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><span aria-hidden="true">/</span><a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a></div></div></section>

      <div className="quote-band"><p data-reveal>אמנות שמחברת לשורשים. <br/><em>ומכניסה הביתה אור ותקווה.</em></p><span dir="ltr">ATELIER JUDAICA / INSPIRED BY ISRAEL</span></div>

      <section id="faq" className="faq-section section-pad container" aria-labelledby="faq-title"><div className="faq-intro" data-reveal><p className="eyebrow">GOOD TO KNOW</p><h2 id="faq-title">לפני הבחירה, <br/><em>כמה מילים.</em></h2><p>על יצירות, הזמנות אישיות <br/>והדרך להכניס אמנות הביתה.</p><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-link">שואלים את אסתר <ArrowIcon/></a></div><div className="faq-list">{site.faq.map((item, index) => <details key={item.question}><summary><span className="faq-index" dir="ltr">0{index + 1}</span><h3>{item.question}</h3><span className="faq-plus" aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></section>

      <section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="container contact-grid"><div className="contact-copy" data-reveal><p className="eyebrow">04 / {site.contact.eyebrow}</p><h2 id="contact-title">כל יצירה <br/>מתחילה <em>בחיבור.</em></h2><p>{site.contact.description}</p><div className="contact-links"><a className="contact-link" href={`tel:${site.phoneHref}`}><span className="contact-link-label">לשיחה</span><span dir="ltr">{site.phone}</span><ArrowIcon/></a><a className="contact-link" href={`mailto:${site.email}`}><span className="contact-link-label">למייל</span><span dir="ltr">{site.email}</span><ArrowIcon/></a><a className="contact-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><span className="contact-link-label">להודעה</span><span>נדבר ב־WhatsApp</span><WhatsAppIcon/></a></div></div><ContactForm/></div></section>
    </main>
    <footer className="site-footer"><div className="container footer-main"><a href="#top" className="footer-brand" lang="en" dir="ltr">atelier<span>JUDAICA</span></a><p>ישראל. מורשת. אמנות.</p><a href="#top" className="back-top">בחזרה למעלה <span aria-hidden="true">↑</span></a></div><div className="container footer-bottom"><p>© {new Date().getFullYear()} Atelier Judaica</p><a href="/photo-credits/">מקורות וצילומי העבודות</a><a href="/accessibility/">נגישות ויצירת קשר</a><a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a><MotionControls/></div></footer>
    <aside aria-label="יצירת קשר מהירה"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="floating-whatsapp" aria-label="נדבר? פתיחת שיחה עם אסתר ב־WhatsApp בחלון חדש"><WhatsAppIcon size={25}/><span>נדבר?</span></a></aside>
  </div>;
}
