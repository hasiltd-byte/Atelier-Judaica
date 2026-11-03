"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { ArrowIcon, BrandLogo } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape" && open) { setOpen(false); toggle.current?.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return <header className="site-header">
    <div className="announcement"><span>יודאיקה בצבע אחר.</span><span className="announcement-en" dir="ltr">TRADITION · DESIGN · COLOR</span><span>{site.service}</span></div>
    <div className="container header-inner">
      <a className="wordmark" href="#top" title="חזרה לראש העמוד" onClick={() => setOpen(false)}>
        <BrandLogo/>
      </a>
      <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav" aria-label={open ? "סגירת תפריט הניווט" : "פתיחת תפריט הניווט"} onClick={() => setOpen(!open)}><span/><span/></button>
      <nav id="main-nav" className={`main-nav ${open ? "is-open" : ""}`} aria-label="ניווט ראשי">
        {site.nav.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <a className="mobile-contact" href="#contact" onClick={() => setOpen(false)}>יצירת קשר</a>
      </nav>
      <a className="header-contact" href="#shop">לקולקציה <ArrowIcon/></a>
    </div>
  </header>;
}
