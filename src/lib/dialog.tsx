import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

export type DialogTarget = { type: 'project' | 'award'; id: string } | null;

type Ctx = {
  target: DialogTarget;
  open: (type: 'project' | 'award', id: string) => void;
  close: () => void;
};

const DialogContext = createContext<Ctx | null>(null);

/**
 * Global state for the case-study / award panels. Remembers the element that
 * opened the panel so focus returns to it on close (without scrolling, so the
 * journey keeps its position).
 */
export function DialogProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<DialogTarget>(null);
  const trigger = useRef<HTMLElement | null>(null);

  const open = useCallback((type: 'project' | 'award', id: string) => {
    trigger.current = document.activeElement as HTMLElement | null;
    setTarget({ type, id });
  }, []);

  const close = useCallback(() => {
    setTarget(null);
    const el = trigger.current;
    trigger.current = null;
    if (el && document.contains(el)) requestAnimationFrame(() => el.focus({ preventScroll: true }));
  }, []);

  const value = useMemo(() => ({ target, open, close }), [target, open, close]);
  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

export function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('useDialog must be used inside <DialogProvider>');
  return ctx;
}
