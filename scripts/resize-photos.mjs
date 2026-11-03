import { readFile } from "node:fs/promises";
import sharp from "sharp";
const names = ["candlesticks", "kiddush", "mezuzah", "hamsa", "pomegranate", "jerusalem"];
const widths = [96, 160, 256, 360, 450, 640, 750, 1000];
const root = "public/images/rimon";
const webpOnly = process.argv.includes("--webp-only");
for (const name of names) {
  const input = await readFile(`${root}/${name}.webp`);
  for (const width of widths) {
    await sharp(input).resize({ width, withoutEnlargement: true }).webp({ quality: width < 640 ? 75 : 80 }).toFile(`${root}/${name}-${width}.webp`);
    if (!webpOnly) await sharp(input).resize({ width, withoutEnlargement: true }).avif({ quality: width < 640 ? 42 : 48, effort: 4 }).toFile(`${root}/${name}-${width}.avif`);
  }
}
const hero = await readFile(`${root}/hero-scene.webp`);
if (!webpOnly) {
  await sharp(hero).resize({ width: 1400 }).avif({ quality: 48, effort: 5 }).toFile(`${root}/hero.avif`);
  await sharp(hero).resize({ width: 750 }).avif({ quality: 44, effort: 5 }).toFile(`${root}/hero-mobile.avif`);
}
await sharp(hero).resize({ width: 1400 }).webp({ quality: 78 }).toFile(`${root}/hero.webp`);
await sharp(hero).resize({ width: 750 }).webp({ quality: 74 }).toFile(`${root}/hero-mobile.webp`);
console.log(`Created ${names.length * widths.length} responsive WebP files and hero variants${webpOnly ? "" : ", plus AVIF alternatives"}.`);
