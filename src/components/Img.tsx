import type { ImageRef } from '../content/portfolio';
import { imageSources } from '../lib/assets';

type Props = {
  image: ImageRef;
  sizes: string;
  className?: string;
  eager?: boolean;
  alt?: string;
};

/** Responsive, lazy-loaded WebP image that reserves its space to avoid layout shift. */
export function Img({ image, sizes, className, eager, alt }: Props) {
  const { src, srcSet } = imageSources(image);
  const w = 960;
  return (
    <img
      className={className}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt ?? image.alt}
      width={w}
      height={Math.round(w / image.ratio)}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
