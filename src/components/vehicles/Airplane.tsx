import { FaceSticker } from './FaceSticker';
import { OUTLINE, palette } from './tokens';

/** Small passenger plane (Moving to Canada). Faces right. */
export function Airplane() {
  return (
    <g stroke={palette.ink} strokeWidth={OUTLINE} strokeLinejoin="round" strokeLinecap="round">
      {/* far wing */}
      <path d="M118 66 L150 66 L132 34 L112 34 Z" fill={palette.blue} />
      {/* tail fin */}
      <path d="M26 82 L14 32 L42 32 L72 82 Z" fill={palette.coral} />
      {/* fuselage */}
      <path d="M18 94 C18 72 40 64 64 64 L198 64 C230 64 252 80 252 94 C252 110 230 124 198 124 L64 124 C40 124 18 116 18 94 Z" fill={palette.white} />
      {/* stripe */}
      <path d="M22 104 L244 104" stroke={palette.blue} strokeWidth={OUTLINE * 1.2} fill="none" />
      {/* cockpit */}
      <path d="M216 74 C230 76 240 82 244 90 L218 90 Z" fill={palette.glass} strokeWidth={OUTLINE * 0.7} />
      {/* windows */}
      <g fill={palette.glass} strokeWidth={OUTLINE * 0.6}>
        <circle cx="168" cy="84" r="5.5" />
        <circle cx="186" cy="84" r="5.5" />
        <circle cx="70" cy="84" r="5.5" />
        <circle cx="88" cy="84" r="5.5" />
      </g>
      {/* near wing */}
      <path d="M108 110 L152 110 L126 150 L98 150 Z" fill={palette.blue} />
      <FaceSticker cx={128} cy={93} r={29} />
    </g>
  );
}
