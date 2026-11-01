import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

const photos = [
  { name: "hero-still-life", id: "1677761821976-4a2b4ed29437", author: "Tamara Harhai", page: "https://unsplash.com/photos/-cfd9px-GV8", width: 1500 },
  { name: "ceramic-pair", id: "1677761640321-b80251be00ca", author: "Tamara Harhai", page: "https://unsplash.com/photos/tSkPbVkiCqY", width: 1000 },
  { name: "white-vases", id: "1638303322325-ff70d6224a22", author: "Mary Skrynnikova", page: "https://unsplash.com/photos/7T12an8w_hQ", width: 1000 },
  { name: "studio-hands", id: "1609881582441-7c9385db15c3", author: "Earl Wilcox", page: "https://unsplash.com/photos/88DYIsFhuSs", width: 1200 },
  { name: "ceramic-collection", id: "1597696929736-6d13bed8e6a8", author: "Chloe Bolton", page: "https://unsplash.com/photos/R0qthXq3jec", width: 1100 },
];

await mkdir("public/images", { recursive: true });
for (const photo of photos) {
  const response = await fetch(`https://images.unsplash.com/photo-${photo.id}?auto=format&fit=max&w=${photo.width}&q=85`);
  if (!response.ok) throw new Error(`${photo.name}: HTTP ${response.status}`);
  const input = Buffer.from(await response.arrayBuffer());
  const output = await sharp(input).rotate().resize({ width: photo.width, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toBuffer();
  await writeFile(`public/images/${photo.name}.webp`, output);
  const meta = await sharp(output).metadata();
  photo.height = meta.height;
  photo.width = meta.width;
  photo.bytes = output.length;
  console.log(`${photo.name}: ${meta.width}×${meta.height}, ${Math.round(output.length / 1024)} KB`);
  if (photo.name === "hero-still-life") {
    await sharp(input).rotate().resize({ width: 760 }).webp({ quality: 78 }).toFile("public/images/hero-still-life-mobile.webp");
  }
}
await writeFile("public/images/credits.json", JSON.stringify({ license: "https://unsplash.com/license", purpose: "Atmospheric photography only. These are not Esther's works or products.", photos }, null, 2));
