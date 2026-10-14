import { useId } from 'react';
import { OUTLINE, palette } from './tokens';

type Props = {
  cx: number;
  cy: number;
  r: number;
  /** Outline width in the parent SVG's units, so stickers match vehicle outlines. */
  outline?: number;
};

/**
 * Reusable circular face sticker (white sticker border + bold outline).
 * Simplified cartoon based on the original portrait: short dark bob with a
 * side-swept fringe, black rectangular glasses, big smile, dark blazer and
 * white collar.
 *
 * TO REPLACE WITH YOUR OWN ARTWORK: swap the contents of the <g clipPath>
 * below for your illustration (drawn in a 100 × 100 box centred on 50,50),
 * or set FACE_IMAGE to an image path (e.g. 'assets/face.png') to use a
 * cropped photo/illustration instead.
 */
export const FACE_IMAGE: string | null = null;

export function FaceSticker({ cx, cy, r, outline = OUTLINE }: Props) {
  const id = useId().replace(/:/g, '');
  const s = r / 50; // drawing space is 100 × 100
  const ow = outline / s;
  return (
    <g transform={`translate(${cx - r} ${cy - r}) scale(${s})`} className="face-sticker">
      <defs>
        <clipPath id={`face-clip-${id}`}>
          <circle cx="50" cy="50" r="35" />
        </clipPath>
      </defs>
      {/* white sticker border */}
      <circle cx="50" cy="50" r={50 - ow * 0.35} fill="#fff" stroke={palette.ink} strokeWidth={ow * 0.7} />
      <g clipPath={`url(#face-clip-${id})`}>
        <rect width="100" height="100" fill={palette.skyTint} />
        {FACE_IMAGE ? (
          <image href={FACE_IMAGE} x="15" y="15" width="70" height="70" preserveAspectRatio="xMidYMid slice" />
        ) : (
          <g strokeLinejoin="round" strokeLinecap="round" transform="translate(50 52) scale(0.9) translate(-50 -50)">
            {/* blazer + collar */}
            <path d="M10 104 Q12 80 34 75 L66 75 Q88 80 90 104 Z" fill="#1c1c1e" stroke={palette.ink} strokeWidth="2.4" />
            <path d="M41 74 L50 90 L59 74 Z" fill="#fff" stroke={palette.ink} strokeWidth="2" />
            {/* neck */}
            <path d="M44 62 L44 76 Q50 80 56 76 L56 62 Z" fill={palette.skin} stroke={palette.ink} strokeWidth="2" />
            {/* hair (back) – short bob */}
            <path
              d="M27 54 Q22 22 50 18 Q79 20 74 54 Q74 64 69 66 L66 54 L34 54 L31 66 Q26 64 27 54 Z"
              fill={palette.hair}
              stroke={palette.ink}
              strokeWidth="2.4"
            />
            {/* face */}
            <ellipse cx="50" cy="49" rx="18.5" ry="21" fill={palette.skin} stroke={palette.ink} strokeWidth="2.4" />
            {/* side-swept fringe */}
            <path
              d="M30.5 47 Q29 26 50 24.5 Q70 25 70.5 44 Q66 35 56 33 Q47 38 30.5 47 Z"
              fill={palette.hair}
              stroke={palette.ink}
              strokeWidth="2.2"
            />
            {/* cheeks */}
            <ellipse cx="37" cy="58" rx="4" ry="2.4" fill={palette.coral} opacity=".45" />
            <ellipse cx="63" cy="58" rx="4" ry="2.4" fill={palette.coral} opacity=".45" />
            {/* glasses */}
            <rect x="34.5" y="44" width="13.5" height="10" rx="2.6" fill="#fff" fillOpacity=".35" stroke={palette.ink} strokeWidth="2.8" />
            <rect x="52" y="44" width="13.5" height="10" rx="2.6" fill="#fff" fillOpacity=".35" stroke={palette.ink} strokeWidth="2.8" />
            <path d="M48 48 L52 48" stroke={palette.ink} strokeWidth="2.4" />
            {/* smiling eyes */}
            <path d="M38.5 50.5 Q41.2 47.8 44 50.5" fill="none" stroke={palette.ink} strokeWidth="1.8" />
            <path d="M56 50.5 Q58.8 47.8 61.5 50.5" fill="none" stroke={palette.ink} strokeWidth="1.8" />
            {/* smile */}
            <path d="M42.5 59 Q50 68 57.5 59 Z" fill="#fff" stroke={palette.ink} strokeWidth="1.9" />
          </g>
        )}
      </g>
      <circle cx="50" cy="50" r="35" fill="none" stroke={palette.ink} strokeWidth={ow * 0.3} />
    </g>
  );
}
