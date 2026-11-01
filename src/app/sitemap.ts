import type { MetadataRoute } from "next";
import { indexable, siteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexable || !siteUrl) return [];
  return [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }, { url: `${siteUrl}/accessibility/`, changeFrequency: "yearly", priority: 0.2 }, { url: `${siteUrl}/photo-credits/`, changeFrequency: "yearly", priority: 0.1 }];
}
