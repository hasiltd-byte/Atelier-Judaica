"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { catalogCategories, galleryItems, type GalleryItem } from "@/data/site";
import { saveText } from "@/lib/contact";
import { ArrowIcon, BagIcon, CloseIcon } from "./icons";

const categories = catalogCategories;
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
    setStatus(removing ? `${item.title} הוסר מרשימת הבחירות` : `${item.title} נוסף לרשימת הבחירות`);
    if (removing && cartOpen) requestAnimationFrame(() => dialog.current?.querySelector<HTMLButtonElement>(".dialog-close")?.focus());
  }
  const selectionText = ["הבחירות שלי — רימון", "", ...chosen.map(item => `• ${item.title} — ${item.description}`), "", "קטלוג השראה. הפריטים הם הדמיות ואינם מוצעים למכירה."].join("\n");
  return <>
    <div className="catalog-toolbar"><div className="catalog-filters" role="group" aria-label="סינון הקולקציה">{categories.map(value => <button type="button" key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}<span>{String(value === "הכול" ? galleryItems.length : galleryItems.filter(item => item.category === value).length).padStart(2, "0")}</span></button>)}</div><button type="button" className="inquiry-toggle" onClick={() => { setActive(null); setCartOpen(true); }}><BagIcon/>הבחירות שלי <span className="bag-count">{selected.length}</span></button></div>
    <div className="shop-grid">{visible.map(item => <article key={item.id} className="product-card">
      <div className="product-photo"><button type="button" className="product-view" aria-label={`מבט מקרוב: ${item.title}`} onClick={() => { setCartOpen(false); setActive(item); }}><Image {...item.image} sizes="(max-width: 600px) 45vw, (max-width: 900px) 45vw, 30vw" loading="lazy"/><span className="quick-view" aria-hidden="true">מבט מקרוב <span>↗</span></span></button><span className="photo-tag">רימון</span><button className="product-add" type="button" aria-label={`${selected.includes(item.id) ? "הסרה מרשימת הבחירות" : "הוספה לרשימת הבחירות"}: ${item.title}`} aria-pressed={selected.includes(item.id)} onClick={() => toggle(item)}>{selected.includes(item.id) ? "✓" : "+"}</button></div>
      <div className="product-meta"><p dir="ltr">{item.subtitle}</p><h3>{item.title}</h3><div><span>פריט מקולקציית ההשראה</span><button type="button" className="product-details" onClick={() => { setCartOpen(false); setActive(item); }} aria-label={`פרטים על ${item.title}`}><ArrowIcon/></button></div></div>
    </article>)}</div>
    <p className="sr-only" role="status" aria-live="polite">{status}</p>
    <div className="catalog-note"><span>צבעים שאוהבים לקחת הביתה</span><p>הדמיות מקוריות של יודאיקה בעיצוב עכשווי. שמרו פריטים שאהבתם ברשימת הבחירות. החנות ואפשרויות ההזמנה יתווספו בהמשך.</p></div>
    <dialog ref={dialog} className={`shop-dialog ${cartOpen ? "is-cart" : ""}`} aria-labelledby="shop-dialog-title" onKeyDown={containFocus} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const box = event.currentTarget.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) close(); } }}>
      <button type="button" className="dialog-close" aria-label="סגירת חלון הקטלוג" onClick={close}><CloseIcon/></button>
      {active && <div className="product-dialog-grid"><Image {...active.image} sizes="(max-width: 600px) 90vw, 45vw"/><div className="product-dialog-copy"><p className="eyebrow">{active.subtitle}</p><h2 id="shop-dialog-title">{active.title}</h2><p>{active.description}</p><p className="dialog-disclaimer">הדמיית עיצוב להשראה. הפריט אינו מוצע למכירה ואין התחייבות לחומר, מידות או זמינות.</p><button type="button" className="button button-dark" onClick={() => toggle(active)}>{selected.includes(active.id) ? "הסרה מרשימת הבחירות" : "הוספה לרשימת הבחירות"}<BagIcon/></button><button type="button" className="text-link" onClick={() => { setActive(null); setCartOpen(true); }}>לרשימת הבחירות ({selected.length}) <ArrowIcon/></button></div></div>}
      {cartOpen && <div className="cart-content"><p className="eyebrow">YOUR SELECTION</p><h2 id="shop-dialog-title">הבחירות שלכם.</h2><p>מקום אחד לכל מה שאהבתם.</p>{chosen.length ? <><ul className="cart-list">{chosen.map(item => <li key={item.id}><Image {...item.image} sizes="80px"/><div><h3>{item.title}</h3><span>מקולקציית ההשראה</span></div><button type="button" aria-label={`הסרת ${item.title} מהסל`} onClick={() => toggle(item)}><CloseIcon/></button></li>)}</ul><button type="button" className="button button-dark" onClick={() => { saveText(selectionText, "rimon-selection.txt"); setStatus("רשימת הבחירות מוכנה להורדה."); }}>שמירת רשימת הבחירות <ArrowIcon/></button><p className="form-note">הרשימה תישמר כקובץ במכשיר שלכם. לא נשלחים פרטים, לא מתבצעת הזמנה ולא נשמרים מוצרים.</p></> : <div className="empty-cart"><BagIcon/><p>עדיין לא שמרתם פריטים. מה תפס לכם את העין?</p><button type="button" className="button button-dark" onClick={close}>בחזרה לקולקציה <ArrowIcon/></button></div>}</div>}
    </dialog>
  </>;
}
