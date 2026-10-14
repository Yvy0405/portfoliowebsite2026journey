import { motion, type MotionValue } from 'motion/react';
import { OUTLINE, palette } from './tokens';

type Props = { cx: number; cy: number; r: number; spin?: MotionValue<number> };

/** A wheel whose rim rotates with the scroll-driven `spin` value (degrees). */
export function Wheel({ cx, cy, r, spin }: Props) {
  const rim = r * 0.56;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      <circle r={r} fill={palette.ink} />
      <motion.g style={{ rotate: spin, transformBox: 'fill-box', transformOrigin: 'center' }}>
        <circle r={rim} fill={palette.gray} stroke={palette.ink} strokeWidth={OUTLINE * 0.7} />
        <g stroke={palette.ink} strokeWidth={OUTLINE * 0.6} strokeLinecap="round">
          <line x1={-rim} y1="0" x2={rim} y2="0" />
          <line x1={-rim / 2} y1={-rim * 0.866} x2={rim / 2} y2={rim * 0.866} />
          <line x1={-rim / 2} y1={rim * 0.866} x2={rim / 2} y2={-rim * 0.866} />
        </g>
        <circle r={rim * 0.28} fill={palette.white} stroke={palette.ink} strokeWidth={OUTLINE * 0.5} />
      </motion.g>
    </g>
  );
}
