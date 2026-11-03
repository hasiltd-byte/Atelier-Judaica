import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import sharp from "sharp";
const pages = ["out/index.html", "out/accessibility/index.html", "out/photo-credits/index.html"];
const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
for (const path of pages) {
  const html = await readFile(path, "utf8");
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => match[0]);
  const meta = name => tags.find(tag => tag.includes(`property="${name}"`) || tag.includes(`name="${name}"`))?.match(/content="([^"]*)"/)?.[1];
  assert.ok(meta("og:site_name")?.includes("רימון"));
  assert.ok(!tags.some(tag => /127\.0\.0\.1|localhost/.test(tag)));
  if (origin) {
    assert.equal(meta("og:image"), `${origin}/rimon-share.jpg`);
    assert.equal(meta("og:image:secure_url"), `${origin}/rimon-share.jpg`);
    assert.equal(meta("og:image:type"), "image/jpeg");
    assert.equal(meta("og:image:width"), "1200"); assert.equal(meta("og:image:height"), "630");
    assert.equal(meta("twitter:image"), `${origin}/rimon-share.jpg`);
  } else assert.equal(meta("og:image"), undefined, "No guessed public domain before configuration");
}
const path = "out/rimon-share.jpg";
const photo = await sharp(await readFile(path)).metadata();
assert.equal(photo.format, "jpeg"); assert.equal(photo.width, 1200); assert.equal(photo.height, 630);
assert.ok((await stat(path)).size < 500_000);
console.log(`Sharing checks passed for ${pages.length} pages; public domain ${origin ? "configured" : "pending"}.`);
