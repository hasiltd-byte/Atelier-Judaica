import { readFile } from "node:fs/promises";
import sharp from "sharp";

const names = ["israel-gold", "chai", "ahava", "magen-david", "shin", "israel-poppies", "texture-detail", "esther", "process"];
const widths = [96, 160, 256, 360, 450, 640, 750, 1000];
const root = "public/images/atelier";
for (const name of names) {
  const input = await readFile(`${root}/${name}.webp`);
  for (const width of widths) {
    await sharp(input).resize({ width, withoutEnlargement: true }).avif({ quality: width < 640 ? 40 : width < 1000 ? 43 : 48, effort: 4 }).toFile(`${root}/${name}-${width}.avif`);
  }
}
const hero = await readFile(`${root}/israel-gold.webp`);
await sharp(hero).resize({ width: 1000 }).avif({ quality: 45, effort: 5 }).toFile(`${root}/hero.avif`);
await sharp(hero).resize({ width: 640 }).avif({ quality: 38, effort: 5 }).toFile(`${root}/hero-mobile.avif`);
await sharp(hero).resize({ width: 1000 }).webp({ quality: 70 }).toFile(`${root}/hero.webp`);
await sharp(hero).resize({ width: 640 }).webp({ quality: 68 }).toFile(`${root}/hero-mobile.webp`);
console.log(`Created ${names.length * widths.length} responsive AVIF files and hero fallbacks.`);
