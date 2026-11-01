import type { Metadata, Viewport } from "next";
import "@fontsource/assistant/hebrew-400.css";
import "@fontsource/assistant/hebrew-500.css";
import "@fontsource/assistant/hebrew-600.css";
import "@fontsource/assistant/latin-400.css";
import "@fontsource/frank-ruhl-libre/hebrew-400.css";
import "@fontsource/frank-ruhl-libre/hebrew-500.css";
import { site } from "@/data/site";
import { indexable, siteUrl } from "@/lib/seo";
import "./globals.css";
import "./performance.css";
import "./artist-theme.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  applicationName: site.name,
  metadataBase: new URL(siteUrl || "http://127.0.0.1:3000"),
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  robots: { index: indexable, follow: indexable },
  openGraph: {
    title: site.title, description: site.description, siteName: site.name,
    locale: "he_IL", type: "website", ...(siteUrl ? { url: siteUrl } : {}),
    images: [{ url: siteUrl ? `${siteUrl}/social-card.png` : "/social-card.png", width: 1200, height: 630, alt: "Atelier Judaica — אמנות לבית" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: [siteUrl ? `${siteUrl}/social-card.png` : "/social-card.png"] },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = { themeColor: "#fffdf9", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="he" dir="rtl"><body><a className="skip-link" href="#main">דילוג לתוכן הראשי</a>{children}</body></html>;
}
