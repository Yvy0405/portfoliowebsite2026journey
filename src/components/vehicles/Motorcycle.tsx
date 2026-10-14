import type { MotionValue } from 'motion/react';
import { FaceSticker } from './FaceSticker';
import { Wheel } from './Wheel';
import { OUTLINE, palette } from './tokens';

/** Yellow scooter-style motorcycle (Vietnam chapter). Faces right. */
export function Motorcycle({ spin }: { spin?: MotionValue<number> }) {
  return (
    <g stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" strokeLinecap="round">
      {/* rear fender + body */}
      <path d="M30 118 C28 86 52 70 86 70 L136 70 C150 70 156 84 156 100 L156 118 Z" fill={palette.yellow} />
      {/* seat */}
      <path d="M56 70 C56 58 64 54 74 54 L128 54 C138 54 142 60 142 70 Z" fill="#2a2a2a" />
      {/* floorboard */}
      <path d="M150 118 L150 106 L184 106 L184 118 Z" fill={palette.ink} />
      {/* leg shield + steering column */}
      <path d="M170 116 L182 46 L202 48 L198 116 Z" fill={palette.yellow} />
      {/* handlebar */}
      <path d="M176 36 L212 32" fill="none" />
      <path d="M190 48 L194 34" fill="none" />
      {/* headlight */}
      <circle cx="205" cy="58" r="8" fill="#fff6c8" />
      {/* front fender */}
      <path d="M178 118 C184 96 222 96 228 118" fill={palette.yellow} />
      <Wheel cx={62} cy={126} r={24} spin={spin} />
      <Wheel cx={204} cy={126} r={24} spin={spin} />
      <FaceSticker cx={106} cy={90} r={33} />
    </g>
  );
}
