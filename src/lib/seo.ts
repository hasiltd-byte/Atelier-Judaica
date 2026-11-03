import { site } from "@/data/site";
export function resolveSiteUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) return undefined;
    if (["localhost", "127.0.0.1", "example.com", "www.example.com"].includes(url.hostname)) return undefined;
    return url.origin;
  } catch { return undefined; }
}
export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const indexable = Boolean(siteUrl && process.env.CONTENT_APPROVED === "true");
export const socialImages = siteUrl ? [{ url: `${siteUrl}/rimon-share.jpg`, secureUrl: `${siteUrl}/rimon-share.jpg`, width: 1200, height: 630, type: "image/jpeg", alt: "רימון — יודאיקה בצבע אחר. פמוטים, כלי קידוש ואמנות לבית." }] : [];
export function structuredData(url: string | undefined) {
  return { "@context": "https://schema.org", "@graph": [
    { "@type": "Organization", name: site.name, description: site.description, ...(url ? { "@id": `${url}/#organization`, url } : {}) },
    { "@type": "WebSite", name: site.name, inLanguage: "he-IL", ...(url ? { "@id": `${url}/#website`, url, publisher: { "@id": `${url}/#organization` } } : {}) },
  ] };
}
