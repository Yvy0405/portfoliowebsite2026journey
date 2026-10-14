import type { MotionValue } from 'motion/react';
import { FaceSticker } from './FaceSticker';
import { Wheel } from './Wheel';
import { OUTLINE, palette } from './tokens';

/** Compact car (full-time career). Faces right. */
export function Car({ spin }: { spin?: MotionValue<number> }) {
  return (
    <g stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" strokeLinecap="round">
      {/* body */}
      <path
        d="M14 120 L14 96 C14 82 24 76 40 74 L76 70 L104 40 C108 36 114 34 122 34 L178 34 C188 34 194 38 200 46 L222 72 C240 76 248 84 248 98 L248 120 Z"
        fill={palette.blue}
      />
      {/* windows */}
      <g fill={palette.glass} strokeWidth={OUTLINE * 0.8}>
        <path d="M92 70 L112 46 L146 46 L146 70 Z" />
        <path d="M158 70 L158 46 L186 46 C190 46 192 48 195 52 L210 70 Z" />
      </g>
      {/* bumper + lights */}
      <path d="M232 92 L248 92" fill="none" />
      <rect x="236" y="80" width="12" height="9" rx="2" fill="#fff6c8" strokeWidth={OUTLINE * 0.6} />
      <rect x="14" y="84" width="10" height="9" rx="2" fill={palette.coral} strokeWidth={OUTLINE * 0.6} />
      {/* wheel arches */}
      <path d="M40 120 C40 94 90 94 90 120" fill={palette.ink} />
      <path d="M174 120 C174 94 224 94 224 120" fill={palette.ink} />
      <Wheel cx={65} cy={128} r={22} spin={spin} />
      <Wheel cx={199} cy={128} r={22} spin={spin} />
      <FaceSticker cx={132} cy={94} r={28} />
    </g>
  );
}
