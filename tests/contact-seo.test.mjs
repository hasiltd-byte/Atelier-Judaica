import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";

async function moduleUrl(file, replacements = {}) {
  let source = await readFile(file, "utf8");
  for (const [from, to] of Object.entries(replacements)) source = source.replaceAll(from, to);
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
  return `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
}
const dataUrl = await moduleUrl("src/data/site.ts");
const { validateContact, contactWhatsAppUrl, whatsappUrl } = await import(await moduleUrl("src/lib/contact.ts", { "@/data/site": dataUrl }));
const { resolveSiteUrl, structuredData } = await import(await moduleUrl("src/lib/seo.ts", { "@/data/site": dataUrl }));

test("empty and whitespace-only required fields are rejected", () => {
  const errors = validateContact({ name: "  ", phone: "", message: "\n " });
  assert.deepEqual(Object.keys(errors), ["name", "message"]);
});
test("phone is optional, but malformed numbers are rejected", () => {
  const valid = { name: "רות", phone: "", message: "אשמח לפרטים" };
  assert.deepEqual(validateContact(valid), {});
  assert.deepEqual(validateContact({ ...valid, phone: "+972 (54) 700-7608" }), {});
  assert.ok(validateContact({ ...valid, phone: "not a phone" }).phone);
  assert.ok(validateContact({ ...valid, phone: "-------" }).phone);
});
test("oversized messages and names are rejected", () => {
  assert.ok(validateContact({ name: "א".repeat(81), phone: "", message: "ב".repeat(1501) }).name);
  assert.ok(validateContact({ name: "אסתר", phone: "", message: "ב".repeat(1501) }).message);
});
test("Hebrew, ampersands, hash signs, plus signs and line breaks survive WhatsApp encoding", () => {
  const values = { name: "  רות & דני  ", phone: "+972 54 700 7608", message: "שלום! מחיר & פרטים?\n#בית + אמנות 💛" };
  const url = new URL(contactWhatsAppUrl(values));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/972547007608");
  assert.equal([...url.searchParams].length, 1);
  assert.ok(url.searchParams.get("text").includes("שמי רות & דני."));
  assert.ok(url.searchParams.get("text").endsWith(values.message));
  assert.ok(url.searchParams.get("text").includes(values.phone));
  assert.equal(url.hash, "");
});
test("optional phone is omitted from the prepared message", () => {
  const text = new URL(contactWhatsAppUrl({ name: "רות", phone: " ", message: "פרטים" })).searchParams.get("text");
  assert.ok(!text.includes("טלפון לחזרה"));
  assert.equal(new URL(whatsappUrl()).pathname, "/972547007608");
});
test("only a real HTTPS origin is accepted for SEO", () => {
  for (const value of [undefined, "", "invalid", "http://atelier.co.il", "https://example.com", "https://localhost", "https://site.co.il/path", "https://user:pass@site.co.il", "https://site.co.il?q=1"]) assert.equal(resolveSiteUrl(value), undefined);
  assert.equal(resolveSiteUrl("https://atelier.co.il/"), "https://atelier.co.il");
});
test("Schema uses supplied business facts without invented address, products or reviews", () => {
  const schema = structuredData("https://atelier.co.il");
  assert.deepEqual(schema["@graph"].map(item => item["@type"]), ["Organization", "WebSite"]);
  assert.equal(schema["@graph"][0].telephone, "+972547007608");
  assert.equal(schema["@graph"][1].publisher["@id"], "https://atelier.co.il/#organization");
  for (const key of ["address", "aggregateRating", "review", "foundingDate", "offers"]) assert.equal(schema["@graph"][0][key], undefined);
  assert.equal(structuredData(undefined)["@graph"][0].url, undefined);
});

for (const scenario of [
  { url: undefined, approved: "true", expected: false },
  { url: "https://atelier.test", approved: "false", expected: false },
  { url: "https://atelier.test", approved: "true", expected: true },
]) {
  test(`SEO crawl rules and sitemap require both a domain and content approval: ${JSON.stringify(scenario)}`, async () => {
    const seoUrl = await moduleUrl("src/lib/seo.ts", {
      "@/data/site": dataUrl,
      "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify(scenario.url) || "undefined",
      "process.env.CONTENT_APPROVED": JSON.stringify(scenario.approved),
    });
    const seo = await import(seoUrl);
    const robots = await import(await moduleUrl("src/app/robots.ts", { "@/lib/seo": seoUrl }));
    const sitemap = await import(await moduleUrl("src/app/sitemap.ts", { "@/lib/seo": seoUrl }));
    assert.equal(seo.indexable, scenario.expected);
    assert.equal(seo.sharingOrigin, scenario.url || "https://atelierjudaica.mybizsite.co");
    assert.equal(seo.socialImage.url, `${seo.sharingOrigin}/atelier-judaica-share.jpg`);
    assert.equal(seo.socialImage.type, "image/jpeg");
    assert.deepEqual(robots.default().rules, scenario.expected ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" });
    assert.equal(sitemap.default().length, scenario.expected ? 3 : 0);
    if (scenario.expected) {
      assert.equal(robots.default().sitemap, "https://atelier.test/sitemap.xml");
      assert.equal(sitemap.default()[0].url, "https://atelier.test");
    }
  });
}
