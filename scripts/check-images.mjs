import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
const browser = await chromium.launch({ channel: "chrome", headless: true });
await mkdir("reports", { recursive: true });
try {
  for (const [width, density] of [[390, 1], [780, 2], [1440, 1]]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: density, reducedMotion: "reduce" });
    const page = await context.newPage();
    const avifRequests = [];
    await page.route(/\.avif(?:\?|$)/, route => { avifRequests.push(route.request().url()); return route.abort(); });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (const image of document.images) image.loading = "eager";
      await Promise.all([...document.images].map(image => image.decode()));
    });
    const images = await page.locator("img").evaluateAll(nodes => nodes.map(image => ({ src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 })));
    assert.ok(images.length > 10);
    assert.ok(images.every(image => image.loaded), `Every image must decode at ${width}px / ${density}x`);
    assert.deepEqual(avifRequests, [], "Embedded previews must not depend on AVIF decoding");
    const floating = page.locator(".hero-floating img");
    assert.match(await floating.evaluate(image => image.currentSrc), /\/kiddush-\d+\.webp$/);
    assert.match(await page.locator(".hero-photo img").evaluate(image => image.currentSrc), width < 600 ? /hero-mobile\.webp$/ : /hero\.webp$/);
    if (width === 780) {
      await page.locator(".hero-floating").scrollIntoViewIfNeeded();
      await page.screenshot({ path: "reports/images-fixed.png", animations: "disabled" });
      await page.locator(".hero-floating").screenshot({ path: "reports/floating-image-fixed.png", animations: "disabled" });
    }
    console.log(`All ${images.length} images loaded without AVIF: ${width}px / ${density}x`);
    await context.close();
  }
} finally { await browser.close(); }
