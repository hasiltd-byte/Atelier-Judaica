"use client";

import type { ImageLoaderProps } from "next/image";

export default function localPhotoLoader({ src, width }: ImageLoaderProps) {
  if (!/^\/images\/atelier\/(israel-gold|chai|ahava|magen-david|shin|israel-poppies|texture-detail|esther|process)\.webp$/.test(src)) return src;
  return src.replace(/\.webp$/, `-${width}.avif`);
}
