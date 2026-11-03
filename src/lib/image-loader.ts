"use client";
import type { ImageLoaderProps } from "next/image";
export default function localPhotoLoader({ src, width }: ImageLoaderProps) {
  if (!/^\/images\/rimon\/(candlesticks|kiddush|mezuzah|hamsa|pomegranate|jerusalem)\.webp$/.test(src)) return src;
  // WebP also works in embedded previews that cannot decode AVIF.
  return src.replace(/\.webp$/, `-${width}.webp`);
}
