import { chromium } from "playwright";
import { readFile } from "node:fs/promises";

const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const photo = (await readFile("public/images/hero-still-life.webp")).toString("base64");
  const svg = (await readFile("public/social-card.svg", "utf8")).replace('href="images/hero-still-life.webp"', `href="data:image/webp;base64,${photo}"`);
  await page.setContent(`<html><body style="margin:0">${svg}</body></html>`);
  await page.screenshot({ path: "public/social-card.png" });
  console.log("Created public/social-card.png (1200×630)");
} finally { await browser.close(); }
