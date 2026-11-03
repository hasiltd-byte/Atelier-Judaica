import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import ts from "typescript";
async function moduleUrl(file, replacements = {}) {
  let source = await readFile(file, "utf8");
  for (const [from, to] of Object.entries(replacements)) source = source.replaceAll(from, to);
  return `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText).toString("base64")}`;
}
const dataUrl = await moduleUrl("src/data/site.ts");
const { validateContact, contactText } = await import(await moduleUrl("src/lib/contact.ts"));
const { resolveSiteUrl, structuredData } = await import(await moduleUrl("src/lib/seo.ts", { "@/data/site": dataUrl }));
test("required fields reject whitespace and oversized input", () => {
  assert.deepEqual(Object.keys(validateContact({ name: " ", phone: "", message: "\n" })), ["name", "message"]);
  assert.ok(validateContact({ name: "א".repeat(81), phone: "", message: "פרטים" }).name);
  assert.ok(validateContact({ name: "רות", phone: "", message: "ב".repeat(1501) }).message);
});
test("optional phone rejects malformed values and accepts international formatting", () => {
  const values = { name: "רות", phone: "", message: "רעיון" };
  assert.deepEqual(validateContact(values), {});
  assert.deepEqual(validateContact({ ...values, phone: "+972 (50) 123-4567" }), {});
  for (const phone of ["not a phone", "-------", "12"]) assert.ok(validateContact({ ...values, phone }).phone);
});
test("prepared text preserves Hebrew and special characters without an external destination", () => {
  const message = "שלום & רעיון\n#בית + צבע 💛";
  const text = contactText({ name: " רות & דני ", phone: "", message });
  assert.ok(text.startsWith("פנייה לרימון\nשם: רות & דני"));
  assert.ok(text.endsWith(message)); assert.ok(!text.includes("טלפון:"));
  assert.ok(contactText({ name: "רות", phone: "0501234567", message }).includes("טלפון: 0501234567"));
});
test("only a public HTTPS origin is accepted for SEO", () => {
  for (const value of [undefined, "", "invalid", "http://rimon.test", "https://example.com", "https://localhost", "https://site.test/path", "https://user:pass@site.test", "https://site.test?q=1"]) assert.equal(resolveSiteUrl(value), undefined);
  assert.equal(resolveSiteUrl("https://rimon.test/"), "https://rimon.test");
});
test("Schema contains the new brand without invented business contact or product offers", () => {
  const schema = structuredData("https://rimon.test");
  assert.deepEqual(schema["@graph"].map(item => item["@type"]), ["Organization", "WebSite"]);
  assert.equal(schema["@graph"][0].name, "רימון");
  for (const key of ["telephone", "email", "sameAs", "address", "aggregateRating", "review", "foundingDate", "offers"]) assert.equal(schema["@graph"][0][key], undefined);
  assert.equal(schema["@graph"][1].publisher["@id"], "https://rimon.test/#organization");
});
for (const scenario of [
  { url: undefined, approved: "true", expected: false },
  { url: "https://rimon.test", approved: "false", expected: false },
  { url: "https://rimon.test", approved: "true", expected: true },
]) test(`indexing and share URL configuration ${JSON.stringify(scenario)}`, async () => {
  const seoUrl = await moduleUrl("src/lib/seo.ts", { "@/data/site": dataUrl, "process.env.NEXT_PUBLIC_SITE_URL": JSON.stringify(scenario.url) || "undefined", "process.env.CONTENT_APPROVED": JSON.stringify(scenario.approved) });
  const seo = await import(seoUrl);
  const robots = await import(await moduleUrl("src/app/robots.ts", { "@/lib/seo": seoUrl }));
  const sitemap = await import(await moduleUrl("src/app/sitemap.ts", { "@/lib/seo": seoUrl }));
  assert.equal(seo.indexable, scenario.expected);
  assert.equal(seo.socialImages.length, scenario.url ? 1 : 0);
  if (scenario.url) assert.equal(seo.socialImages[0].url, `${scenario.url}/rimon-share.jpg`);
  assert.deepEqual(robots.default().rules, scenario.expected ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" });
  assert.equal(sitemap.default().length, scenario.expected ? 3 : 0);
});
