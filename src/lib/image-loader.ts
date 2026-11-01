"use client";

import type { ImageLoaderProps } from "next/image";

export default function localPhotoLoader({ src, width }: ImageLoaderProps) {
  if (!/^\/images\/(ceramic-pair|white-vases|studio-hands|ceramic-collection)\.webp$/.test(src)) return src;
  return src.replace(/\.webp$/, `-${width}.webp`);
}
