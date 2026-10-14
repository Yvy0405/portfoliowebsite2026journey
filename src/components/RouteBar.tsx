import { AnimatePresence, motion, useTransform, type MotionValue } from 'motion/react';
import { stops } from '../content/story';
import { Vehicle, vehicleNames } from './vehicles/Vehicle';

type Props = {
  active: number;
  offsets: number[];
  viewW: number;
  scrollX: MotionValue<number>;
  onNavigate: (target: string | number) => void;
};

/** Stops that get a dot on the journey line (the intro has none). */
const MARKED = stops.map((s, i) => ({ s, i })).filter(({ s }) => s.marker);
const PLACES = ['Vietnam', 'Canada', 'Toronto'];

/**
 * Bottom journey line: a thin line with small dots, and the vehicle riding it.
 * Vehicle position, kind and wheel spin all derive from the scroller's scrollLeft.
 */
export function RouteBar({ active, offsets, viewW, scrollX, onNavigate }: Props) {
  const n = MARKED.length;
  const starts = MARKED.map(({ i }) => offsets[i] ?? 0);
  const probeShift = viewW * 0.35;

  const frac = useTransform(scrollX, (x) => {
    const p = x + probeShift;
    if (!starts.length || p <= starts[0]) return 0;
    for (let k = 0; k < n - 1; k++) {
      if (p < starts[k + 1]) return (k + (p - starts[k]) / Math.max(1, starts[k + 1] - starts[k])) / (n - 1);
    }
    return 1;
  });
  const left = useTransform(frac, (f) => `${(f * 100).toFixed(3)}%`);
  const spin = useTransform(scrollX, (x) => x * 0.9);

  // The plane lifts off and lands while travelling from the Canada dot to the next one.
  const travel = MARKED.findIndex(({ s }) => s.variant === 'travel');
  const lift = useTransform(scrollX, (x) => {
    if (travel < 0 || travel >= n - 1) return 0;
    const t = (x + probeShift - starts[travel]) / Math.max(1, starts[travel + 1] - starts[travel]);
    return t > 0 && t < 1 ? -Math.sin(Math.PI * t) * 26 : 0;
  });

  const stop = stops[active];
  const kind = stop.vehicle;
  const isLast = active === stops.length - 1;

  return (
    <nav className="routebar" aria-label="Journey">
      <button type="button" className="route-step" onClick={() => onNavigate(active - 1)} disabled={active === 0}>
        <span aria-hidden="true">←</span>
        <span className="sr-only">Previous stop</span>
      </button>

      <div className="route-track">
        <span className="route-line" aria-hidden="true" />
        <motion.span className="route-fill" style={{ scaleX: frac }} aria-hidden="true" />
        <ol className="route-markers">
          {MARKED.map(({ s, i }, k) => {
            const state = i === active ? ' is-active' : i < active ? ' is-done' : '';
            return (
              <li key={s.id} style={{ left: `${(k / (n - 1)) * 100}%` }}>
                <button type="button" className={`route-marker${state}`} onClick={() => onNavigate(i)} aria-current={i === active ? 'step' : undefined}>
                  <span className="route-dot" aria-hidden="true" />
                  <span className="route-label">{s.marker}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <motion.div className="route-vehicle" style={{ left, y: lift }} aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div
              key={kind}
              className="route-vehicle-swap"
              initial={{ opacity: 0, scale: 0.6, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: -6 }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <Vehicle kind={kind} spin={spin} title="" />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <button type="button" className="route-step" onClick={() => onNavigate(active + 1)} disabled={isLast}>
        <span aria-hidden="true">→</span>
        <span className="sr-only">Next stop</span>
      </button>

      <div className="routebar-foot">
        <p className="route-places" aria-hidden="true">
          {PLACES.map((p, i) => (
            <span key={p} className={i === stop.place ? 'is-current' : i < stop.place ? 'is-past' : ''}>
              {p}
              {i < PLACES.length - 1 && <span className="route-arrow">→</span>}
            </span>
          ))}
        </p>
        <p className="route-hint" aria-hidden="true">
          {isLast ? 'End of the journey' : 'Scroll or drag to continue →'}
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {stop.marker ?? 'Start'}. Vehicle: {vehicleNames[kind]}.
      </p>
    </nav>
  );
}
