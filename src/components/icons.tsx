export { BrandLogo } from "./brand-logo";
export function ArrowIcon({ className = "" }: { className?: string }) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5m6-6-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function WhatsAppIcon({ size = 21 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="m8.2 7.6 1.3-.2 1.1 2.5-.9 1.1c.7 1.4 1.8 2.5 3.2 3.1l1.1-1 2.5 1.1-.2 1.4c-.2 1-1.2 1.5-2.2 1.2-3.8-1-6.6-3.9-7.4-7.1-.2-1 .4-2 1.5-2.1Z" fill="currentColor"/></svg>;
}

export function Spark({ className = "" }: { className?: string }) {
  return <svg className={className} width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M20 0c1.5 14 6 18.5 20 20-14 1.5-18.5 6-20 20C18.5 26 14 21.5 0 20 14 18.5 18.5 14 20 0Z" fill="currentColor"/></svg>;
}

export function BagIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 7h14l1 14H4L5 7Z" stroke="currentColor" strokeWidth="1.3"/><path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>;
}
export function CloseIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" stroke="currentColor" strokeWidth="1.3"/></svg>;
}
export function RotatingSeal() {
  return <span className="rotating-seal" aria-hidden="true"><svg viewBox="0 0 140 140" className="seal-type"><defs><path id="seal-circle" d="M70,70m-51,0a51,51 0 1,1 102,0a51,51 0 1,1 -102,0"/></defs><text><textPath href="#seal-circle" textLength="319">ART WITH SOUL · OBJECTS WITH MEANING · </textPath></text></svg><Spark/></span>;
}
