import { OUTLINE, palette } from './tokens';

const common = {
  stroke: palette.ink,
  strokeWidth: OUTLINE,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
};

/** Small bold-outline trophy for the BMO Launch Me chapter. */
export function Trophy({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden="true">
      <g {...common}>
        <path d="M30 26 C10 26 8 58 34 64" fill="none" />
        <path d="M90 26 C110 26 112 58 86 64" fill="none" />
        <path d="M28 14 L92 14 L92 40 C92 64 78 80 60 80 C42 80 28 64 28 40 Z" fill={palette.yellow} />
        <path d="M52 80 L68 80 L70 100 L50 100 Z" fill={palette.yellow} />
        <path d="M34 100 L86 100 L90 126 L30 126 Z" fill={palette.ink} />
        <path d="M60 30 L65 41 L77 42 L68 50 L71 62 L60 56 L49 62 L52 50 L43 42 L55 41 Z" fill={palette.white} strokeWidth={OUTLINE * 0.6} />
      </g>
    </svg>
  );
}

export function GradCap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
      <g {...common}>
        <path d="M30 50 L30 74 C44 86 76 86 90 74 L90 50 Z" fill={palette.ink} />
        <path d="M60 14 L114 38 L60 62 L6 38 Z" fill={palette.blue} />
        <path d="M96 46 L96 76" fill="none" />
        <circle cx="96" cy="80" r="5" fill={palette.yellow} />
      </g>
    </svg>
  );
}

export function RamenBowl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
      <g {...common}>
        <path d="M44 10 L60 44" fill="none" />
        <path d="M58 6 L66 44" fill="none" />
        <path d="M10 46 L110 46 C108 72 88 90 60 90 C32 90 12 72 10 46 Z" fill={palette.coral} />
        <path d="M30 60 C40 66 50 54 60 60 C70 66 80 54 90 60" fill="none" stroke={palette.white} strokeWidth={OUTLINE * 0.8} />
      </g>
    </svg>
  );
}
