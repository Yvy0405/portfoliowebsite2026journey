import type { MotionValue } from 'motion/react';
import { FaceSticker } from './FaceSticker';
import { Wheel } from './Wheel';
import { OUTLINE, palette } from './tokens';

/** Red Toronto TTC-style city bus (not a streetcar – no pole or rails). Faces right. */
export function Bus({ spin }: { spin?: MotionValue<number> }) {
  return (
    <g stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" strokeLinecap="round">
      {/* body */}
      <path d="M12 128 L12 40 C12 30 18 24 28 24 L236 24 C246 24 250 32 250 44 L250 128 Z" fill={palette.ttcRed} />
      {/* white band */}
      <path d="M12 98 L250 98 L250 110 L12 110 Z" fill={palette.white} strokeWidth={OUTLINE * 0.7} />
      {/* windows */}
      <g fill={palette.glass} strokeWidth={OUTLINE * 0.8}>
        <rect x="24" y="40" width="40" height="38" rx="4" />
        <rect x="72" y="40" width="40" height="38" rx="4" />
        <rect x="120" y="40" width="40" height="38" rx="4" />
        {/* doors */}
        <rect x="170" y="40" width="34" height="80" rx="3" />
        {/* windshield */}
        <path d="M214 40 L240 40 C244 40 246 44 246 48 L246 84 L214 84 Z" />
      </g>
      <path d="M187 42 L187 118" strokeWidth={OUTLINE * 0.6} fill="none" />
      {/* destination sign */}
      <rect x="150" y="28" width="62" height="10" rx="2" fill={palette.ink} strokeWidth="0" />
      <text x="181" y="36.5" textAnchor="middle" fontSize="8.5" fontWeight="700" fill={palette.yellow} stroke="none" fontFamily="Inter, Arial, sans-serif" letterSpacing=".5">
        HUMBER
      </text>
      {/* headlight */}
      <rect x="236" y="104" width="10" height="10" rx="2" fill="#fff6c8" strokeWidth={OUTLINE * 0.6} />
      {/* wheel arches */}
      <path d="M38 128 C38 104 86 104 86 128" fill={palette.ink} />
      <path d="M176 128 C176 104 224 104 224 128" fill={palette.ink} />
      <Wheel cx={62} cy={130} r={21} spin={spin} />
      <Wheel cx={200} cy={130} r={21} spin={spin} />
      <FaceSticker cx={140} cy={96} r={30} />
    </g>
  );
}
