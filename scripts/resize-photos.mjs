import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const names = ["ceramic-pair", "white-vases", "studio-hands", "ceramic-collection"];
const widths = [96, 160, 256, 360, 640, 750, 1000];
await sharp(await readFile("public/images/hero-still-life.webp")).resize({ width: 640 }).webp({ quality: 73, effort: 6 }).toFile("public/images/hero-still-life-mobile.webp");
for (const name of names) {
  const input = await readFile(`public/images/${name}.webp`);
  for (const width of widths) {
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: 77, effort: 5 }).toFile(`public/images/${name}-${width}.webp`);
  }
}
console.log(`Created ${names.length * widths.length} responsive WebP derivatives.`);
