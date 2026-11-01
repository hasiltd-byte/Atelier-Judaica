import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { gzipSync } from "node:zlib";

const root = resolve("out");
const port = Number(process.env.PORT || 3000);
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };

const server = createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) { res.writeHead(405, { Allow: "GET, HEAD" }); res.end(); return; }
    const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let path = resolve(root, `.${pathname}`);
    if (path !== root && !path.startsWith(`${root}${sep}`)) { res.writeHead(403); res.end(); return; }
    let code = 200;
    try { if ((await stat(path)).isDirectory()) path = resolve(path, "index.html"); await stat(path); }
    catch { path = resolve(root, "404.html"); code = 404; }
    let body = await readFile(path);
    const compress = body.length > 1024 && /\bgzip\b/.test(req.headers["accept-encoding"] || "") && [".html", ".css", ".js", ".json", ".svg", ".xml", ".txt"].includes(extname(path));
    if (compress) body = gzipSync(body);
    res.writeHead(code, {
      "Content-Type": mime[extname(path)] || "application/octet-stream",
      "Cache-Control": pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-Frame-Options": "DENY",
      "Vary": "Accept-Encoding",
      ...(compress ? { "Content-Encoding": "gzip" } : {}),
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch { res.writeHead(500); res.end("Preview server error. Run npm run build first."); }
});
server.listen(port, "127.0.0.1", () => console.log(`Atelier Judaica production preview: http://127.0.0.1:${port}`));
process.on("SIGINT", () => server.close(() => process.exit(0)));
process.on("SIGTERM", () => server.close(() => process.exit(0)));
