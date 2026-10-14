import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { chapters } from '../content/journey';
import { useJourneyMode } from '../hooks/useMediaQuery';
import { ChapterView } from './Chapter';
import { RouteIndicator } from './RouteIndicator';
import { Vehicle, vehicleNames } from './vehicles/Vehicle';

/** Distance a wheel rim travels per full turn, in px (vehicle is ~210px wide). */
const WHEEL_CIRCUMFERENCE = 122;
/** Rendered vehicle width in px – keep in sync with .journey-vehicle in app.css. */
const VEHICLE_W = 210;

export function Journey() {
  const mode = useJourneyMode();
  return mode === 'horizontal' ? <HorizontalJourney /> : <StackedJourney />;
}

type Metrics = { trackW: number; viewW: number; viewH: number; offsets: number[]; widths: number[]; vehicleX: number };

/**
 * Desktop: a pinned viewport whose vertical scroll distance equals the track's
 * horizontal overflow, so 1px of native scroll = 1px of horizontal travel.
 * Native scrolling means wheels, trackpads, keyboards and scrollbars all work
 * without custom wheel maths (no double-counting). Scroll progress is the single
 * source of truth for position, active chapter and vehicle state.
 */
function HorizontalJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [m, setM] = useState<Metrics>({ trackW: 0, viewW: 1, viewH: 0, offsets: [], widths: [], vehicleX: 0 });
  const metrics = useRef(m);
  metrics.current = m;
  const [active, setActive] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;
    const viewW = sticky.clientWidth;
    setM({
      trackW: track.scrollWidth,
      viewW,
      viewH: sticky.clientHeight,
      offsets: chapterRefs.current.map((el) => el?.offsetLeft ?? 0),
      widths: chapterRefs.current.map((el) => el?.offsetWidth ?? 0),
      vehicleX: Math.max(32, Math.min(viewW * 0.07, 120)),
    });
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (stickyRef.current) ro.observe(stickyRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const maxX = Math.max(0, m.trackW - m.viewW);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });

  const x = useTransform(scrollYProgress, (p) => -p * Math.max(0, metrics.current.trackW - metrics.current.viewW));
  const spin = useTransform(x, (v) => (-v / WHEEL_CIRCUMFERENCE) * 360);
  // Tiny road bounce, derived from position – it stops the moment scrolling stops.
  const bounce = useTransform(x, (v) => Math.sin(-v / 28) * 1.2);
  // Vehicle drifts subtly to the right over the whole journey.
  const drift = useTransform(scrollYProgress, (p) => p * Math.min(80, metrics.current.viewW * 0.05));

  const chapterAt = (pos: number) => {
    const { offsets } = metrics.current;
    let i = 0;
    for (let k = 0; k < offsets.length; k++) if (pos >= offsets[k]) i = k;
    return i;
  };

  // Airplane lift: an arc across the travel chapter, driven by position.
  const travelIndex = chapters.findIndex((c) => c.variant === 'travel');
  const lift = useTransform(x, (v) => {
    const { offsets, widths, vehicleX } = metrics.current;
    if (travelIndex < 0 || !widths[travelIndex]) return 0;
    const pos = -v + vehicleX + VEHICLE_W / 2;
    const t = (pos - offsets[travelIndex]) / widths[travelIndex];
    if (t <= 0 || t >= 1) return 0;
    return -Math.sin(Math.PI * t) * Math.min(220, metrics.current.viewH * 0.28);
  });
  const vehicleY = useTransform([bounce, lift], ([b, l]) => (b as number) + (l as number));

  useMotionValueEvent(x, 'change', (v) => {
    const i = chapterAt(-v + metrics.current.vehicleX + VEHICLE_W / 2);
    setActive((prev) => (prev === i ? prev : i));
  });

  const sectionTop = () => (sectionRef.current ? sectionRef.current.getBoundingClientRect().top + window.scrollY : 0);

  const programmatic = useRef(false);
  const goTo = useCallback((i: number, focusHeading = false) => {
    const { offsets, trackW, viewW } = metrics.current;
    const idx = Math.max(0, Math.min(chapters.length - 1, i));
    const target = Math.min(offsets[idx] ?? 0, Math.max(0, trackW - viewW));
    if (focusHeading) {
      programmatic.current = true;
      chapterRefs.current[idx]?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
      programmatic.current = false;
    }
    window.scrollTo({ top: sectionTop() + target + (idx > 0 ? 1 : 0), behavior: 'smooth' });
  }, []);

  // Keyboard users: when focus lands on something off-screen inside the track,
  // scroll the page so that element slides into view.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onFocus = (e: FocusEvent) => {
      if (programmatic.current) return;
      const el = e.target as HTMLElement;
      const r = el.getBoundingClientRect();
      const { viewW } = metrics.current;
      if (r.left >= 0 && r.right <= viewW) return;
      const currentX = -x.get();
      const desired = Math.max(0, Math.min(currentX + r.left - viewW * 0.3, Math.max(0, metrics.current.trackW - viewW)));
      window.scrollTo({ top: sectionTop() + desired, behavior: 'instant' });
    };
    track.addEventListener('focusin', onFocus);
    return () => track.removeEventListener('focusin', onFocus);
  }, [x]);

  // Horizontal trackpad swipes (deltaX) also move the journey. Vertical input is
  // left entirely to native scrolling, so nothing is counted twice.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && !e.ctrlKey) {
        window.scrollBy({ top: e.deltaX, behavior: 'instant' });
      }
    };
    section.addEventListener('wheel', onWheel, { passive: true });
    return () => section.removeEventListener('wheel', onWheel);
  }, []);

  const kind = chapters[active].vehicle;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="journey journey-horizontal"
      style={{ height: m.viewH ? `${maxX + m.viewH}px` : '100vh' }}
      aria-label="Journey: from Vietnam to Toronto"
    >
      <div className="journey-sticky" ref={stickyRef}>
        <motion.div className="journey-track" ref={trackRef} style={{ x }}>
          {chapters.map((c, i) => (
            <ChapterView
              key={c.id}
              ref={(el) => {
                chapterRefs.current[i] = el;
              }}
              chapter={c}
              index={i}
              total={chapters.length}
              mode="horizontal"
              onReplay={() => goTo(0, true)}
            />
          ))}
        </motion.div>

        <motion.div className="journey-vehicle" style={{ left: m.vehicleX, x: drift, y: vehicleY }} aria-hidden="true">
          <AnimatePresence initial={false}>
            <motion.div
              key={kind}
              className="vehicle-swap"
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7, y: -8 }}
              transition={{ duration: 0.28, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <Vehicle kind={kind} spin={spin} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
        <p className="sr-only" aria-live="polite">
          Chapter {active + 1} of {chapters.length}: {chapters[active].title}. Vehicle: {vehicleNames[kind]}.
        </p>

        <RouteIndicator
          active={active}
          progress={scrollYProgress}
          metrics={m}
          onSelect={goTo}
          vehicle={kind}
        />
      </div>
    </section>
  );
}

/**
 * Mobile, tablet and reduced-motion: the same chapters in natural vertical
 * order. A slim sticky bar shows the current chapter and vehicle.
 */
function StackedJourney() {
  const chapterRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', () => {
    const line = window.innerHeight * 0.4;
    let i = 0;
    chapterRefs.current.forEach((el, k) => {
      if (el && el.getBoundingClientRect().top < line) i = k;
    });
    setActive((prev) => (prev === i ? prev : i));
  });

  const replay = () => {
    const first = chapterRefs.current[0];
    first?.scrollIntoView({ block: 'start' });
    first?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true });
  };

  const c = chapters[active];
  return (
    <section id="journey" className="journey journey-stacked" aria-label="Journey: from Vietnam to Toronto">
      <div className="journey-bar" aria-hidden="true">
        <AnimatePresence initial={false} mode="wait">
          <motion.span key={c.vehicle} className="journey-bar-vehicle" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
            <Vehicle kind={c.vehicle} />
          </motion.span>
        </AnimatePresence>
        <span className="journey-bar-label">
          <strong>{String(active + 1).padStart(2, '0')}</strong>/{String(chapters.length).padStart(2, '0')} · {c.navLabel}
        </span>
        <span className="journey-bar-dots">
          {chapters.map((ch, i) => (
            <span key={ch.id} className={i <= active ? 'is-done' : ''} />
          ))}
        </span>
      </div>
      {chapters.map((ch, i) => (
        <ChapterView
          key={ch.id}
          ref={(el) => {
            chapterRefs.current[i] = el;
          }}
          chapter={ch}
          index={i}
          total={chapters.length}
          mode="stacked"
          onReplay={replay}
        />
      ))}
    </section>
  );
}
