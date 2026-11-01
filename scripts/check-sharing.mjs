import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import sharp from "sharp";

const pages = ["out/index.html", "out/accessibility/index.html", "out/photo-credits/index.html"];
const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://atelierjudaica.mybizsite.co";
const expectedImage = `${origin}/atelier-judaica-share.jpg`;
for (const path of pages) {
  const html = await readFile(path, "utf8");
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]);
  function meta(name) {
    const tag = tags.find(tag => tag.includes(`property="${name}"`) || tag.includes(`name="${name}"`));
    return tag?.match(/content="([^"]*)"/)?.[1];
  }
  assert.equal(meta("og:image"), expectedImage, `${path}: image must use the public HTTPS origin`);
  assert.equal(meta("og:image:secure_url"), expectedImage);
  assert.equal(meta("og:image:type"), "image/jpeg");
  assert.equal(meta("og:image:width"), "1200");
  assert.equal(meta("og:image:height"), "630");
  assert.equal(meta("twitter:image"), expectedImage);
  assert.equal(meta("twitter:card"), "summary_large_image");
  assert.ok(meta("og:image:alt")?.includes("Atelier Judaica"));
  assert.ok(meta("og:url")?.startsWith(`${origin}`));
  assert.ok(!tags.some(tag => /127\.0\.0\.1|localhost/.test(tag)), `${path}: no local URLs in meta tags`);
}
const path = "out/atelier-judaica-share.jpg";
const image = await sharp(await readFile(path)).metadata();
assert.equal(image.format, "jpeg");
assert.equal(image.width, 1200);
assert.equal(image.height, 630);
const bytes = (await stat(path)).size;
assert.ok(bytes < 500_000, "Share image should stay below the project's 500 KB budget");
console.log(`Sharing checks passed for ${pages.length} pages. JPEG: 1200×630, ${Math.round(bytes / 1024)} KB. URL: ${expectedImage}`);
