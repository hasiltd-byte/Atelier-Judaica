import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
await mkdir("reports", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
const results = [];
const errors = [];
async function accessibility(page, scenario) {
  const audit = await new AxeBuilder({ page }).analyze();
  results.push({ scenario, violations: audit.violations });
  assert.equal(audit.violations.length, 0, JSON.stringify(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, reason: n.failureSummary })) }))));
}
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert.equal(await page.locator("h1").count(), 1);
  assert.ok((await page.title()).includes("רימון"));
  assert.equal(await page.locator('a[href^="tel:"],a[href^="mailto:"],a[href*="wa.me"],a[href*="instagram.com"],a[href*="facebook.com"]').count(), 0);
  assert.equal(JSON.parse(await page.locator('script[type="application/ld+json"]').textContent())["@graph"][0].name, "רימון");
  await page.keyboard.press("Tab"); assert.equal(await page.locator(":focus").textContent(), "דילוג לתוכן הראשי");
  await page.keyboard.press("Enter"); assert.equal(await page.locator(":focus").getAttribute("id"), "main");
  await accessibility(page, "desktop");
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 }); await page.goto(base, { waitUntil: "networkidle" });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}`);
    await page.evaluate(async () => { for (const image of document.images) { image.loading = "eager"; } await Promise.all([...document.images].map(image => image.decode())); });
    assert.equal(await page.locator("img").evaluateAll(images => images.filter(image => !image.complete || !image.naturalWidth).length), 0);
    if (width === 390) {
      const toggle = page.locator(".menu-toggle"); await toggle.click(); assert.equal(await toggle.getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Escape"); assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      await toggle.click(); await page.getByRole("navigation").getByRole("link", { name: "ההשראה", exact: true }).click(); assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      await accessibility(page, "mobile");
      await page.evaluate(() => { document.querySelectorAll("[data-reveal]").forEach(node => node.classList.remove("will-reveal")); document.querySelectorAll("main>section,.quote-band").forEach(node => node.style.contentVisibility="visible"); window.scrollTo(0,0); });
      await page.screenshot({ path: "reports/mobile.png", fullPage: true, animations: "disabled" });
    }
    results.push({ scenario: `layout and images ${width}`, passed: true });
  }
  await page.evaluate(() => { document.querySelectorAll("[data-reveal]").forEach(node => node.classList.remove("will-reveal")); document.querySelectorAll("main>section,.quote-band").forEach(node => node.style.contentVisibility="visible"); window.scrollTo(0,0); });
  await page.screenshot({ path: "reports/desktop.png", fullPage: true, animations: "disabled" });
  const submit = page.getByRole("button", { name: "הכנת פנייה לשמירה" }); await submit.click();
  assert.equal(await page.locator("[aria-invalid=true]").count(), 2); assert.equal(await page.locator(":focus").getAttribute("id"), "contact-name");
  await page.locator("#contact-name").fill("רות & דני"); await page.locator("#contact-message").fill("רעיון & צבע\n#בית + 💛");
  await page.locator("#contact-phone").fill("wrong"); await submit.click(); assert.equal(await page.locator(":focus").getAttribute("id"), "contact-phone");
  await page.locator("#contact-phone").fill(""); await submit.click(); assert.ok((await page.locator("#prepared-text").inputValue()).endsWith("#בית + 💛"));
  await accessibility(page, "prepared form");
  const [download] = await Promise.all([page.waitForEvent("download"), page.getByRole("button", { name: "שמירה כקובץ", exact: true }).click()]);
  assert.equal(download.suggestedFilename(), "rimon-message.txt");
  await page.locator("details summary").first().click(); assert.equal(await page.locator("details[open]").count(), 1);
  for (const path of ["accessibility", "photo-credits"]) { await page.goto(`${base}/${path}/`); await accessibility(page, path); }
  assert.equal((await page.goto(`${base}/missing-page/`)).status(), 404);
  assert.deepEqual(errors, []);
  results.push({ scenario: "keyboard, form validation, local download, FAQ, info pages, 404 and runtime", passed: true });
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await noJs.newPage(); await fallback.goto(base); assert.equal(await fallback.locator("h1").isVisible(), true); assert.equal(await fallback.locator(".product-card").count(), 6); assert.equal(await fallback.locator(".form-submit").isDisabled(), true);
  await noJs.close();
} finally { await browser.close(); await writeFile("reports/browser-results.json", JSON.stringify(results, null, 2)); }
console.log(`Browser checks passed: ${results.length} groups.`);
