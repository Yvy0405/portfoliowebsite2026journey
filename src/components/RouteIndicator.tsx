import { motion, useTransform, type MotionValue } from 'motion/react';
import { chapters, type VehicleKind } from '../content/journey';
import { Vehicle } from './vehicles/Vehicle';

type Props = {
  active: number;
  progress: MotionValue<number>;
  metrics: { trackW: number; viewW: number; offsets: number[] };
  onSelect: (index: number) => void;
  vehicle: VehicleKind;
};

/**
 * Compact route: prev/next buttons, evenly spaced clickable chapter markers and
 * a small vehicle token whose position is mapped piecewise from scroll progress,
 * so it sits exactly on a marker whenever that chapter starts.
 */
export function RouteIndicator({ active, progress, metrics, onSelect, vehicle }: Props) {
  const n = chapters.length;
  const maxX = Math.max(1, metrics.trackW - metrics.viewW);
  const stops = metrics.offsets.map((o) => Math.min(o, maxX) / maxX);

  const frac = useTransform(progress, (p) => {
    if (stops.length < 2) return p;
    let i = 0;
    while (i < stops.length - 2 && p >= stops[i + 1]) i++;
    const span = stops[i + 1] - stops[i] || 1;
    const local = Math.max(0, Math.min(1, (p - stops[i]) / span));
    return (i + local) / (n - 1);
  });
  const left = useTransform(frac, (f) => `${(f * 100).toFixed(3)}%`);

  return (
    <nav className="route" aria-label="Journey chapters">
      <button type="button" className="route-step" onClick={() => onSelect(active - 1)} disabled={active === 0}>
        <span aria-hidden="true">←</span>
        <span className="sr-only">Previous chapter</span>
      </button>
      <div className="route-line">
        <motion.span className="route-fill" style={{ scaleX: frac }} aria-hidden="true" />
        <ol className="route-markers">
          {chapters.map((c, i) => (
            <li key={c.id} style={{ left: `${(i / (n - 1)) * 100}%` }}>
              <button
                type="button"
                className={`route-marker${i === active ? ' is-active' : ''}${i < active ? ' is-done' : ''}`}
                onClick={() => onSelect(i)}
                aria-current={i === active ? 'step' : undefined}
              >
                <span className="route-dot" aria-hidden="true" />
                <span className="route-label">{c.navLabel}</span>
              </button>
            </li>
          ))}
        </ol>
        <motion.span className="route-token" style={{ left }} aria-hidden="true">
          <Vehicle kind={vehicle} title="" />
        </motion.span>
      </div>
      <button type="button" className="route-step" onClick={() => onSelect(active + 1)} disabled={active === n - 1}>
        <span aria-hidden="true">→</span>
        <span className="sr-only">Next chapter</span>
      </button>
      <p className="route-count" aria-hidden="true">
        <strong>{String(active + 1).padStart(2, '0')}</strong> / {String(n).padStart(2, '0')}
      </p>
    </nav>
  );
}
