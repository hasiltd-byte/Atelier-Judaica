import { mkdir, writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { chromium } from "playwright";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

await mkdir("reports", { recursive: true });
const url = process.env.PREVIEW_URL || "http://127.0.0.1:3000";
for (const mode of ["mobile", "desktop"]) {
  const port = await freePort();
  const browser = await chromium.launch({
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" }),
    headless: true, args: [`--remote-debugging-port=${port}`],
  });
  try {
    console.log(`Auditing ${mode}…`);
    const result = await lighthouse(url, {
      port, hostname: "127.0.0.1", logLevel: "error", output: ["json", "html"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    }, mode === "desktop" ? desktopConfig : undefined);
    if (!result || result.lhr.runtimeError) throw new Error(result?.lhr.runtimeError?.message || "Lighthouse returned no report");
    const report = result.lhr;
    await writeFile(`reports/lighthouse-${mode}.report.json`, JSON.stringify(report, null, 2));
    await writeFile(`reports/lighthouse-${mode}.report.html`, result.report[1]);
    console.log(mode, Object.fromEntries(Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)])));
    const failed = Object.values(report.audits).filter(a => a.score !== null && a.score < 1 && a.scoreDisplayMode !== "informative").map(a => ({ id: a.id, title: a.title, score: a.score, details: a.displayValue || a.description }));
    await writeFile(`reports/lighthouse-${mode}-findings.json`, JSON.stringify(failed, null, 2));
  } finally { await browser.close(); }
}

async function freePort() {
  const server = createServer();
  await new Promise((resolve, reject) => { server.once("error", reject); server.listen(0, "127.0.0.1", resolve); });
  const port = server.address().port;
  await new Promise(resolve => server.close(resolve));
  return port;
}
