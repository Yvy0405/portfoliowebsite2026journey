import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { chapters } from '../content/journey';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';
import { useDialog } from '../lib/dialog';
import {
  AboutDest,
  AwardsDest,
  ChapterDest,
  ContactDest,
  destinations,
  EducationDest,
  JourneyDest,
  WorkDest,
} from './Destinations';
import { Header } from './Header';
import { RouteBar } from './RouteBar';

/** Easing factor for wheel / programmatic movement (per animation frame). */
const EASE = 0.16;

/**
 * The whole site is one horizontal track inside a full-viewport scroller.
 * The page never scrolls vertically.
 *
 * Input handling (all moving the same native scrollLeft, so nothing is counted twice):
 * - vertical mouse-wheel / trackpad deltas are converted to horizontal movement and eased;
 * - horizontal trackpad swipes and touch swipes use native horizontal scrolling;
 * - mouse drag, keyboard (← → PageUp/PageDown Home End) and the prev/next buttons
 *   all set the same eased target.
 * scrollLeft is the single source of truth for the active destination and the vehicle.
 */
export function Site() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const destRefs = useRef<(HTMLElement | null)[]>([]);
  const target = useRef(0);
  const raf = useRef(0);
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  reducedRef.current = reduced;
  const { target: dialogTarget } = useDialog();

  const [offsets, setOffsets] = useState<number[]>([]);
  const offsetsRef = useRef<number[]>([]);
  const [active, setActive] = useState(0);
  const [viewW, setViewW] = useState(1);

  const { scrollX } = useScroll({ container: scrollerRef });

  /* ---------- measuring ---------- */
  const measure = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const o = destRefs.current.map((d) => d?.offsetLeft ?? 0);
    offsetsRef.current = o;
    setOffsets(o);
    setViewW(el.clientWidth);
  }, []);

  useLayoutEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (scrollerRef.current) ro.observe(scrollerRef.current);
    destRefs.current.forEach((d) => d && ro.observe(d));
    return () => ro.disconnect();
  }, [measure]);

  /* ---------- active destination ---------- */
  const indexAt = (x: number) => {
    const el = scrollerRef.current;
    const probe = x + (el ? el.clientWidth * 0.35 : 0);
    let i = 0;
    offsetsRef.current.forEach((o, k) => {
      if (probe >= o) i = k;
    });
    return i;
  };

  useMotionValueEvent(scrollX, 'change', (x) => {
    const i = indexAt(x);
    setActive((prev) => (prev === i ? prev : i));
    if (!raf.current) target.current = x; // native scroll (swipe, drag, focus) – keep target in sync
  });

  /* ---------- eased movement ---------- */
  const maxScroll = () => {
    const el = scrollerRef.current!;
    return el.scrollWidth - el.clientWidth;
  };

  const step = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cur = el.scrollLeft;
    const d = target.current - cur;
    if (Math.abs(d) < 0.6) {
      el.scrollLeft = target.current;
      raf.current = 0;
      return;
    }
    el.scrollLeft = cur + d * EASE;
    raf.current = requestAnimationFrame(step);
  }, []);

  const moveTo = useCallback(
    (x: number) => {
      const el = scrollerRef.current;
      if (!el) return;
      target.current = Math.max(0, Math.min(x, maxScroll()));
      if (reducedRef.current) {
        el.scrollLeft = target.current;
        return;
      }
      if (!raf.current) raf.current = requestAnimationFrame(step);
    },
    [step],
  );

  const goTo = useCallback(
    (idOrIndex: string | number, focus = true) => {
      const i = typeof idOrIndex === 'number' ? idOrIndex : destinations.findIndex((d) => d.id === idOrIndex);
      if (i < 0) return;
      const idx = Math.max(0, Math.min(destinations.length - 1, i));
      moveTo(offsetsRef.current[idx] ?? 0);
      const id = destinations[idx].id;
      history.replaceState(null, '', `#${id}`);
      if (focus) {
        const heading = destRefs.current[idx]?.querySelector<HTMLElement>('h1, h2');
        heading?.focus({ preventScroll: true });
      }
    },
    [moveTo],
  );

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  /* ---------- wheel / trackpad ---------- */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // pinch-zoom
      // Let a vertically scrollable card (e.g. long content on small screens) scroll first.
      let node = e.target as HTMLElement | null;
      while (node && node !== el) {
        if (node.scrollHeight > node.clientHeight + 1) {
          const oy = getComputedStyle(node).overflowY;
          if ((oy === 'auto' || oy === 'scroll') && ((e.deltaY > 0 && node.scrollTop + node.clientHeight < node.scrollHeight - 1) || (e.deltaY < 0 && node.scrollTop > 0))) {
            return;
          }
        }
        node = node.parentElement;
      }
      // Horizontal-dominant gestures (trackpad side swipes) scroll natively.
      if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? el.clientWidth : 1;
      moveTo(target.current + e.deltaY * unit);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [moveTo]);

  /* ---------- mouse drag ---------- */
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let startX = 0;
    let startScroll = 0;
    let down = false;
    let dragged = false;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      if ((e.target as HTMLElement).closest('a, button, input, textarea, select, [data-no-drag]')) return;
      down = true;
      dragged = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!dragged && Math.abs(dx) > 6) {
        dragged = true;
        el.classList.add('is-dragging');
        cancelAnimationFrame(raf.current);
        raf.current = 0;
      }
      if (dragged) {
        el.scrollLeft = startScroll - dx;
        target.current = el.scrollLeft;
      }
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.classList.remove('is-dragging');
      if (dragged) {
        // swallow the click that follows a drag
        const swallow = (ev: MouseEvent) => {
          ev.stopPropagation();
          ev.preventDefault();
        };
        window.addEventListener('click', swallow, { capture: true, once: true });
        setTimeout(() => window.removeEventListener('click', swallow, { capture: true }), 0);
      }
    };
    el.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  /* ---------- keyboard ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (dialogTarget || e.altKey || e.ctrlKey || e.metaKey) return;
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return;
      const el = scrollerRef.current;
      if (!el) return;
      const onControl = t.closest('button, a');
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          moveTo(target.current + el.clientWidth * 0.3);
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          moveTo(target.current - el.clientWidth * 0.3);
          break;
        case 'PageDown':
          e.preventDefault();
          goTo(indexAt(target.current) + 1, false);
          break;
        case 'PageUp':
          e.preventDefault();
          goTo(indexAt(target.current) - 1, false);
          break;
        case ' ':
          if (onControl) return;
          e.preventDefault();
          goTo(indexAt(target.current) + (e.shiftKey ? -1 : 1), false);
          break;
        case 'Home':
          e.preventDefault();
          goTo(0, false);
          break;
        case 'End':
          e.preventDefault();
          goTo(destinations.length - 1, false);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [dialogTarget, goTo, moveTo]);

  /* ---------- in-page links (#work, #contact …) and initial hash ---------- */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href')!.slice(1);
      if (destinations.some((d) => d.id === id)) {
        e.preventDefault();
        goTo(id);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [goTo]);

  useEffect(() => {
    const id = location.hash.slice(1);
    const i = destinations.findIndex((d) => d.id === id);
    if (i > 0 && scrollerRef.current) {
      requestAnimationFrame(() => {
        scrollerRef.current!.scrollLeft = offsetsRef.current[i] ?? 0;
        target.current = scrollerRef.current!.scrollLeft;
      });
    }
  }, []);

  const setRef = (i: number) => (el: HTMLElement | null) => {
    destRefs.current[i] = el;
  };
  let n = 0;

  return (
    <div className="site">
      <Header active={destinations[active].id} onNavigate={goTo} />
      <main id="content" className="scroller" ref={scrollerRef} tabIndex={-1} aria-label="Portfolio — scrolls horizontally">
        <AboutDest ref={setRef(n++)} onNavigate={goTo} />
        <JourneyDest ref={setRef(n++)} onNavigate={goTo} />
        {chapters.map((c, i) => (
          <ChapterDest key={c.id} ref={setRef(n++)} chapter={c} index={i} />
        ))}
        <WorkDest ref={setRef(n++)} />
        <AwardsDest ref={setRef(n++)} />
        <EducationDest ref={setRef(n++)} />
        <ContactDest ref={setRef(n++)} onNavigate={goTo} />
      </main>
      <RouteBar active={active} offsets={offsets} viewW={viewW} scrollX={scrollX} onNavigate={goTo} />
    </div>
  );
}
