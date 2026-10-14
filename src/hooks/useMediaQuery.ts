import { useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)');

/**
 * The pinned horizontal journey is used only on large, tall-enough screens
 * with motion allowed. Everything else gets the natural vertical layout.
 */
export function useJourneyMode(): 'horizontal' | 'stacked' {
  const large = useMediaQuery('(min-width: 1024px) and (min-height: 620px)');
  const reduced = usePrefersReducedMotion();
  return large && !reduced ? 'horizontal' : 'stacked';
}
