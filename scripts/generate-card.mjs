import { chromium } from "playwright";
import { readFile } from "node:fs/promises";
import sharp from "sharp";

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const photo = (await readFile("public/images/atelier/israel-gold.webp")).toString("base64");
  const svg = (await readFile("public/social-card.svg", "utf8")).replace('href="images/atelier/israel-gold.webp"', `href="data:image/webp;base64,${photo}"`);
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  const png = await page.screenshot({ path: "public/social-card.png" });
  await sharp(png).flatten({ background: "#fffdf9" }).jpeg({ quality: 85, mozjpeg: true }).toFile("public/atelier-judaica-share.jpg");
  console.log("Created public/atelier-judaica-share.jpg and public/social-card.png (1200×630)");
} finally { await browser.close(); }
