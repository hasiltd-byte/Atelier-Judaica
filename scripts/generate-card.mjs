import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";
import sharp from "sharp";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  await mkdir("reports", { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const photo = (await readFile("public/images/rimon/hero-scene.webp")).toString("base64");
  await page.setContent(`<html lang="he" dir="rtl"><body style="margin:0;background:#fff8e9"><main style="display:flex;width:1200px;height:630px;font-family:Arial;color:#172f9e"><div style="width:47%;padding:64px 40px;box-sizing:border-box"><div style="color:#ce4935;font-size:80px;font-weight:700">רימון<span style="font-size:34px">✦</span></div><p style="font-size:24px;margin:12px 0 50px">יודאיקה בצבע אחר</p><div style="font-size:52px;line-height:1.25;font-weight:700">קצת מסורת.<br><span style="color:#ce4935">הרבה צבע.</span></div><p style="font-size:23px;margin-top:32px">לשבת. לבית. לרגעים שלכם.</p></div><img src="data:image/webp;base64,${photo}" style="width:53%;height:630px;object-fit:cover;object-position:45% center"></main></body></html>`);
  await page.screenshot({ path: "reports/rimon-card.png" });
  await sharp("reports/rimon-card.png").jpeg({ quality: 85, mozjpeg: true }).toFile("public/rimon-share.jpg");
  console.log("Created public/rimon-share.jpg (1200×630).");
} finally { await browser.close(); }
