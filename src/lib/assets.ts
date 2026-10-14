import type { ImageRef } from '../content/portfolio';

const BASE = import.meta.env.BASE_URL;
const WIDTHS = [480, 960, 1600];

/** Resolve a public/ path against the deployed base URL. */
export const asset = (path: string) => `${BASE}${path}`;

/** Build src / srcSet for an optimized image (see scripts/optimize_images.py). */
export function imageSources(img: ImageRef) {
  const widths = WIDTHS.filter((w) => w <= img.maxWidth);
  const url = (w: number) => asset(`assets/img/${img.slug}-${w}.webp`);
  return {
    src: url(widths[Math.min(1, widths.length - 1)]),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(', '),
  };
}
