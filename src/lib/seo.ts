import { site, socialLinks } from "@/data/site";

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
// Sharing crawlers need a public absolute URL even when the hosting build
// does not provide NEXT_PUBLIC_SITE_URL. This domain was verified live.
export const sharingOrigin = siteUrl ?? site.publicUrl;
export const socialImage = {
  url: `${sharingOrigin}/atelier-judaica-share.jpg`,
  secureUrl: `${sharingOrigin}/atelier-judaica-share.jpg`,
  width: 1200,
  height: 630,
  type: "image/jpeg",
  alt: "Atelier Judaica — יודאיקה עם נשמה. יצירת מפת ישראל בזהב של אסתר.",
};

export function structuredData(url: string | undefined) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", name: site.name, description: site.description,
        telephone: site.phoneHref, email: site.email,
        sameAs: [socialLinks.instagram, socialLinks.facebook],
        ...(url ? { "@id": `${url}/#organization`, url } : {}),
        contactPoint: { "@type": "ContactPoint", telephone: site.phoneHref, email: site.email, contactType: "customer service", availableLanguage: "Hebrew" },
      },
      {
        "@type": "WebSite", name: site.name, inLanguage: "he-IL",
        ...(url ? { "@id": `${url}/#website`, url, publisher: { "@id": `${url}/#organization` } } : {}),
      },
    ],
  };
}
