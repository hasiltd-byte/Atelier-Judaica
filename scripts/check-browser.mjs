import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("reports", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const base = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
const results = [];
const errors = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on("pageerror", e => errors.push(e.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator("html").getAttribute("dir"), "rtl");
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator("meta[name=robots]").getAttribute("content"), "noindex, nofollow");
  assert.equal(await page.locator('a[href="tel:+972547007608"]').count(), 1);
  assert.equal(await page.locator('a[href="mailto:myatelierjudaica@gmail.com"]').count(), 1);
  for (const node of await page.locator('script[type="application/ld+json"]').all()) assert.equal(JSON.parse(await node.textContent())["@context"], "https://schema.org");
  await capturePage(page, "reports/desktop.png");
  assert.equal(await page.locator("img").evaluateAll(images => images.filter(image => !image.complete || image.naturalWidth === 0).length), 0, "All photographic assets must load successfully");
  const a11y = await new AxeBuilder({ page }).analyze();
  results.push({ scenario: "desktop accessibility", violations: a11y.violations });
  assertAccessible(a11y, "desktop");
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").textContent(), "דילוג לתוכן הראשי");
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(":focus").getAttribute("id"), "main");
  await page.getByRole("button", { name: "הכנת הודעה ב־WhatsApp" }).click();
  assert.equal(await page.locator("[aria-invalid=true]").count(), 2);
  assert.equal(await page.locator(":focus").getAttribute("id"), "contact-name");
  const invalidA11y = await new AxeBuilder({ page }).analyze();
  assertAccessible(invalidA11y, "form errors");
  await page.locator("#contact-name").fill("רות & דני");
  await page.locator("#contact-message").fill("שלום! פרטים & מחיר?\n#אמנות + בית 💛");
  await page.locator("#contact-phone").fill("wrong");
  await page.getByRole("button", { name: "הכנת הודעה ב־WhatsApp" }).click();
  assert.equal(await page.locator(":focus").getAttribute("id"), "contact-phone");
  await page.locator("#contact-phone").fill("054-700-7608");
  await page.evaluate(() => { window.__openedUrl = ""; window.open = url => { window.__openedUrl = String(url); return null; }; });
  await page.getByRole("button", { name: "הכנת הודעה ב־WhatsApp" }).click();
  const popupUrl = new URL(await page.evaluate(() => window.__openedUrl));
  assert.equal(popupUrl.pathname, "/972547007608");
  assert.ok(popupUrl.searchParams.get("text").includes("#אמנות + בית 💛"));
  assert.ok(await page.locator('.contact-form [role="status"]').textContent().then(text => text.includes("ההודעה מוכנה")));
  const fallback = page.getByRole("link", { name: "לחצו כאן לפתיחת ההודעה" });
  assert.equal(await fallback.getAttribute("href"), popupUrl.href);
  results.push({ scenario: "form validation, Hebrew encoding, fallback and keyboard", passed: true });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base, { waitUntil: "networkidle" });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    assert.equal(overflow, false, `Horizontal overflow at ${width}px`);
    if (width === 390) {
      const toggle = page.locator(".menu-toggle");
      await toggle.click();
      assert.equal(await toggle.getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Escape");
      assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      assert.equal(await page.locator(":focus").getAttribute("aria-controls"), "main-nav");
      await toggle.click();
      await page.getByRole("navigation").getByRole("link", { name: "הגלריה" }).click();
      assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
      await capturePage(page, "reports/mobile.png");
      const mobileA11y = await new AxeBuilder({ page }).analyze();
      results.push({ scenario: "mobile accessibility", violations: mobileA11y.violations });
      assertAccessible(mobileA11y, "mobile");
    }
    results.push({ scenario: `layout ${width}px`, passed: true });
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), "auto");
  await page.getByText(siteFaqQuestion()).first().click();
  assert.equal(await page.locator("details[open]").count(), 1);
  await page.goto(`${base}/accessibility/`, { waitUntil: "networkidle" });
  const documentA11y = await new AxeBuilder({ page }).analyze();
  assertAccessible(documentA11y, "accessibility page");
  const missing = await page.goto(`${base}/page-that-does-not-exist/`);
  assert.equal(missing.status(), 404);
  assert.ok(await page.getByRole("heading", { level: 1 }).textContent().then(text => text.includes("העמוד הזה")));
  assert.deepEqual(errors, [], "Browser runtime errors");
  results.push({ scenario: "FAQ, reduced motion, accessibility page, 404 and no runtime errors", passed: true });
  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(base);
  assert.equal(await noJsPage.getByRole("button", { name: "הכנת הודעה ב־WhatsApp" }).isDisabled(), true);
  assert.equal(await noJsPage.getByRole("link", { name: "לפתוח שיחה ישירה ב־WhatsApp" }).isVisible(), true);
  await noJsContext.close();
  results.push({ scenario: "JavaScript disabled: direct contact available, no accidental form submission", passed: true });
  await writeFile("reports/browser-checks.json", JSON.stringify(results, null, 2));
  console.log(`Passed ${results.length} browser scenarios. Screenshots and results: reports/`);
} finally { await browser.close(); }

function siteFaqQuestion() { return "איך אפשר ליצור קשר עם אסתר?"; }
function assertAccessible(result, label) {
  assert.equal(result.violations.length, 0, `${label}: ${JSON.stringify(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, reason: n.failureSummary })) })))}`);
}
async function capturePage(page, path) {
  await page.evaluate(async () => {
    const saved = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    for (let y = 0; y < document.documentElement.scrollHeight; y += 650) {
      window.scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 65));
    }
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = saved;
    await Promise.all([...document.images].map(image => image.decode().catch(() => {})));
  });
  await page.screenshot({ path, fullPage: true, animations: "disabled", style: "main > section, .quote-band { content-visibility: visible !important; }" });
}
