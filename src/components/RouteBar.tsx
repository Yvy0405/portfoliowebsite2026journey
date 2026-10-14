import { AnimatePresence, motion, useTransform, type MotionValue } from 'motion/react';
import { chapters } from '../content/journey';
import { destinations } from './Destinations';
import { Vehicle, vehicleNames } from './vehicles/Vehicle';

type Props = {
  active: number;
  offsets: number[];
  viewW: number;
  scrollX: MotionValue<number>;
  onNavigate: (target: string | number) => void;
};

const FIRST_CHAPTER = destinations.findIndex((d) => d.chapter);
const PLACES = ['Vietnam', 'Canada', 'Toronto'];

/**
 * Fixed bottom route (mockup): ‹ numbered chapter markers › with the vehicle
 * riding along the line. Vehicle position, kind and wheel spin all derive
 * from the scroller's scrollLeft.
 */
export function RouteBar({ active, offsets, viewW, scrollX, onNavigate }: Props) {
  const n = chapters.length;
  const starts = chapters.map((_, i) => offsets[FIRST_CHAPTER + i] ?? 0);
  const probeShift = viewW * 0.35;

  const frac = useTransform(scrollX, (x) => {
    const p = x + probeShift;
    if (!starts.length || p <= starts[0]) return 0;
    for (let i = 0; i < n - 1; i++) {
      if (p < starts[i + 1]) return (i + (p - starts[i]) / Math.max(1, starts[i + 1] - starts[i])) / (n - 1);
    }
    return 1;
  });
  const left = useTransform(frac, (f) => `${(f * 100).toFixed(3)}%`);
  const spin = useTransform(scrollX, (x) => x * 0.9);

  // The plane lifts off and lands across the “Move to Canada” chapter.
  const travel = chapters.findIndex((c) => c.variant === 'travel');
  const lift = useTransform(scrollX, (x) => {
    if (travel < 0 || travel >= n - 1) return 0;
    const t = (x + probeShift - starts[travel]) / Math.max(1, starts[travel + 1] - starts[travel]);
    return t > 0 && t < 1 ? -Math.sin(Math.PI * t) * 34 : 0;
  });

  const dest = destinations[active];
  const kind = dest.vehicle;
  const chapterIdx = dest.chapter ? active - FIRST_CHAPTER : active < FIRST_CHAPTER ? -1 : n;
  const isLast = active === destinations.length - 1;

  return (
    <nav className="routebar" aria-label="Journey navigation">
      <div className="routebar-main">
        <button type="button" className="route-step" onClick={() => onNavigate(active - 1)} disabled={active === 0}>
          <span aria-hidden="true">‹</span>
          <span className="sr-only">Previous: {destinations[Math.max(0, active - 1)].label}</span>
        </button>

        <div className="route-track">
          <span className="route-line" aria-hidden="true" />
          <motion.span className="route-fill" style={{ scaleX: frac }} aria-hidden="true" />
          <ol className="route-markers">
            {chapters.map((c, i) => {
              const state = i === chapterIdx ? ' is-active' : i < chapterIdx ? ' is-done' : '';
              return (
                <li key={c.id} style={{ left: `${(i / (n - 1)) * 100}%` }}>
                  <button
                    type="button"
                    className={`route-marker${state}`}
                    onClick={() => onNavigate(`chapter-${c.id}`)}
                    aria-current={i === chapterIdx ? 'step' : undefined}
                  >
                    <span className="route-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="route-label">{c.navLabel}</span>
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
                initial={{ opacity: 0, scale: 0.6, y: 10 }}
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
          <span aria-hidden="true">›</span>
          <span className="sr-only">Next: {destinations[Math.min(destinations.length - 1, active + 1)].label}</span>
        </button>
      </div>

      <div className="routebar-foot">
        <p className="route-places" aria-hidden="true">
          {PLACES.map((p, i) => (
            <span key={p} className={i === dest.place ? 'is-current' : i < dest.place ? 'is-past' : ''}>
              {p}
              {i < PLACES.length - 1 && <span className="route-arrow">→</span>}
            </span>
          ))}
        </p>
        {isLast ? (
          <button type="button" className="route-hint route-hint-btn" onClick={() => onNavigate(0)}>
            <span aria-hidden="true">↺</span> Start the journey over
          </button>
        ) : (
          <p className="route-hint" aria-hidden="true">
            Scroll or drag to continue <span>→</span>
          </p>
        )}
      </div>
      <p className="sr-only" aria-live="polite">
        {dest.label}. Vehicle: {vehicleNames[kind]}.
      </p>
    </nav>
  );
}
