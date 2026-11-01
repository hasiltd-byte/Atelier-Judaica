"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { galleryItems, type GalleryItem } from "@/data/site";
import { whatsappUrl } from "@/lib/contact";
import { ArrowIcon, BagIcon, CloseIcon } from "./icons";

const categories = ["הכול", "כלים ואובייקטים", "אמנות בחלל"] as const;
export function Catalog() {
  const [category, setCategory] = useState<string>("הכול");
  const [selected, setSelected] = useState<string[]>([]);
  const [active, setActive] = useState<GalleryItem | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [status, setStatus] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const priorFocus = useRef<HTMLElement | null>(null);
  const chosen = galleryItems.filter(item => selected.includes(item.id));
  const visible = galleryItems.filter(item => category === "הכול" || item.category === category);
  useEffect(() => {
    if ((active || cartOpen) && !dialog.current?.open) {
      priorFocus.current = document.activeElement as HTMLElement;
      dialog.current?.showModal();
    } else if (active || cartOpen) {
      dialog.current?.querySelector<HTMLButtonElement>(".dialog-close")?.focus();
    }
  }, [active, cartOpen]);
  function close() { dialog.current?.close(); setActive(null); setCartOpen(false); priorFocus.current?.focus(); }
  function containFocus(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const items = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), textarea:not([disabled]), [tabindex="0"]')].filter(node => node.offsetParent !== null);
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  function toggle(item: GalleryItem) {
    const removing = selected.includes(item.id);
    setSelected(previous => removing ? previous.filter(id => id !== item.id) : [...previous, item.id]);
    setStatus(removing ? `${item.title} הוסר מסל הפנייה` : `${item.title} נוסף לסל הפנייה`);
    if (removing && cartOpen) requestAnimationFrame(() => dialog.current?.querySelector<HTMLButtonElement>(".dialog-close")?.focus());
  }
  const inquiryUrl = whatsappUrl(`שלום אסתר, צפיתי בקטלוג ההשראה באתר Atelier Judaica.\nאהבתי את הכיוונים הבאים:\n${chosen.map(item => `• ${item.title} (${item.subtitle})`).join("\n")}\nאשמח לשמוע על עבודות מקוריות שלך, מחירים וזמינות. ברור לי שהתמונות באתר הן להשראה בלבד.`);
  return <>
    <div className="catalog-toolbar"><div className="catalog-filters" role="group" aria-label="סינון קטלוג ההשראה">{categories.map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}<span>{value === "הכול" ? "03" : `0${galleryItems.filter(item => item.category === value).length}`}</span></button>)}</div><button type="button" className="inquiry-toggle" onClick={() => { setActive(null); setCartOpen(true); }}><BagIcon/>סל פנייה <span className="bag-count">{selected.length}</span></button></div>
    <div className="shop-grid">{visible.map(item => <article key={item.id} className="product-card">
      <div className="product-photo"><button type="button" className="product-view" aria-label={`מבט מקרוב: ${item.title}`} onClick={() => { setCartOpen(false); setActive(item); }}><Image {...item.image} sizes="(max-width: 600px) 90vw, (max-width: 900px) 45vw, 30vw" loading="lazy"/><span className="quick-view" aria-hidden="true">מבט מקרוב <span>↗</span></span></button><span className="photo-tag">צילום השראה</span><button className="product-add" type="button" aria-label={`${selected.includes(item.id) ? "הסרה מסל הפנייה" : "הוספה לסל הפנייה"}: ${item.title}`} aria-pressed={selected.includes(item.id)} onClick={() => toggle(item)}>{selected.includes(item.id) ? "✓" : "+"}</button></div>
      <div className="product-meta"><p dir="ltr">{item.subtitle}</p><h3>{item.title}</h3><div><span>פרטים ומחיר מול אסתר</span><button type="button" className="product-details" onClick={() => { setCartOpen(false); setActive(item); }} aria-label={`פרטים על ${item.title}`}><ArrowIcon/></button></div></div>
    </article>)}</div>
    <p className="sr-only" role="status" aria-live="polite">{status}</p>
    <div className="catalog-note"><span>קטלוג השראה</span><p>הצילומים אינם מוצרים של אסתר. בחרו כיוון שאהבתם ושלחו פנייה לקבלת מידע על הקולקציה המקורית. מחירים וזמינות בבירור אישי.</p></div>
    <dialog ref={dialog} className={`shop-dialog ${cartOpen ? "is-cart" : ""}`} aria-labelledby="shop-dialog-title" onKeyDown={containFocus} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
      <button type="button" className="dialog-close" aria-label="סגירת חלון הקטלוג" onClick={close}><CloseIcon/></button>
      {active && <div className="product-dialog-grid"><Image {...active.image} sizes="(max-width: 600px) 90vw, 45vw"/><div className="product-dialog-copy"><p className="eyebrow">{active.subtitle}</p><h2 id="shop-dialog-title">{active.title}</h2><p>{active.description}</p><p className="dialog-disclaimer">צילום השראה · פרטי עבודות מקוריות, מחירים וזמינות מול אסתר.</p><button type="button" className="button button-dark" onClick={() => toggle(active)}>{selected.includes(active.id) ? "הסרה מסל הפנייה" : "הוספה לסל הפנייה"}<BagIcon/></button><button type="button" className="text-link" onClick={() => { setActive(null); setCartOpen(true); }}>לסל הפנייה ({selected.length}) <ArrowIcon/></button></div></div>}
      {cartOpen && <div className="cart-content"><p className="eyebrow">YOUR INSPIRATION</p><h2 id="shop-dialog-title">הבחירות שלכם.</h2><p>סל פנייה לאסתר — בלי תשלום באתר.</p>{chosen.length ? <><ul className="cart-list">{chosen.map(item => <li key={item.id}><Image {...item.image} sizes="80px"/><div><h3>{item.title}</h3><span>צילום השראה</span></div><button type="button" aria-label={`הסרת ${item.title} מהסל`} onClick={() => toggle(item)}><CloseIcon/></button></li>)}</ul><a className="button button-dark" href={inquiryUrl} target="_blank" rel="noopener noreferrer">בירור הבחירות ב־WhatsApp <ArrowIcon/></a><p className="form-note">ההודעה תישלח רק לאחר אישור שלכם ב־WhatsApp. הבחירה אינה הזמנה ואינה מבטיחה זמינות של הפריטים המצולמים.</p></> : <div className="empty-cart"><BagIcon/><p>עוד לא בחרתם כיוון שאהבתם.</p><button type="button" className="button button-dark" onClick={close}>בחזרה לקולקציה <ArrowIcon/></button></div>}</div>}
    </dialog>
  </>;
}
