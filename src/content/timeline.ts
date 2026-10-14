/**
 * STRUCTURED TIMELINE DATA
 * -----------------------------------------------------------------------------
 * Every dated activity, with the precision the original portfolio gives.
 * Lanes let concurrent activities sit side by side instead of being forced
 * into a misleading single sequence.
 *
 * Dates use 'YYYY-MM'. `end: 'present'` is resolved to today's month at runtime.
 * `precision: 'year'` means the source only gives a year (e.g. “2023”).
 * `precision: 'unspecified'` means the source gives no date at all – the bar is
 * drawn hatched across `displaySpanOf` and labelled “dates not specified”.
 */

export type Lane = 'study' | 'work' | 'venture' | 'life' | 'award';

export const laneLabels: Record<Lane, string> = {
  study: 'Study',
  work: 'Work',
  venture: 'Venture',
  life: 'Life',
  award: 'Awards',
};

export type Activity = {
  id: string;
  label: string;
  lane: Lane;
  /** Display date exactly as the source states it. */
  dateLabel: string;
  precision: 'month' | 'year' | 'unspecified';
  start?: string;
  end?: string | 'present';
  /** Single-date milestones (awards, graduation) render as markers. */
  point?: boolean;
  /** For undated activities: borrow another activity's span purely for display. */
  displaySpanOf?: string;
  /** Which content entry this activity links to. */
  ref?: { type: 'project' | 'award' | 'education'; id: string };
};

export const activities: Activity[] = [
  { id: 'aiesec', label: 'AIESEC prizes', lane: 'award', dateLabel: 'Jul 2020', precision: 'month', start: '2020-07', point: true, ref: { type: 'award', id: 'aiesec' } },
  { id: 'rmit', label: 'RMIT University', lane: 'study', dateLabel: '2023', precision: 'year', start: '2023-01', end: '2023-12', ref: { type: 'education', id: 'rmit' } },
  { id: 'cherries-code', label: 'Cherries Code', lane: 'work', dateLabel: '1/2023 - 2/2024', precision: 'month', start: '2023-01', end: '2024-02', ref: { type: 'project', id: 'cherries-code' } },
  { id: 'humber', label: 'Humber College', lane: 'study', dateLabel: '2024–2025', precision: 'year', start: '2024-01', end: '2025-12', ref: { type: 'education', id: 'humber' } },
  { id: 'tn-ebike', label: 'TN Ebike', lane: 'work', dateLabel: '1/2024 - 5/2025', precision: 'month', start: '2024-01', end: '2025-05', ref: { type: 'project', id: 'tn-ebike' } },
  { id: 'kinton', label: 'Kinton Ramen', lane: 'life', dateLabel: 'Dates not specified', precision: 'unspecified', displaySpanOf: 'humber' },
  { id: 'yon-crochet', label: 'Yon Crochet', lane: 'venture', dateLabel: '4/2025 - Present', precision: 'month', start: '2025-04', end: 'present', ref: { type: 'project', id: 'yon-crochet' } },
  { id: 'graduation', label: 'Graduation', lane: 'study', dateLabel: '2025 · end of program', precision: 'year', start: '2025-12', point: true, ref: { type: 'education', id: 'humber' } },
  { id: 'longo', label: 'Longo grant', lane: 'award', dateLabel: 'Aug 2025', precision: 'month', start: '2025-08', point: true, ref: { type: 'award', id: 'longo' } },
  { id: 'alarm-guard', label: 'Alarm Guard Security', lane: 'work', dateLabel: '10/2025 - Present', precision: 'month', start: '2025-10', end: 'present', ref: { type: 'project', id: 'alarm-guard' } },
  { id: 'senior-protection', label: 'Senior Protection', lane: 'work', dateLabel: '10/2025 - Present', precision: 'month', start: '2025-10', end: 'present', ref: { type: 'project', id: 'senior-protection' } },
  { id: 'bmo', label: 'BMO Launch Me', lane: 'award', dateLabel: 'Mar 2026', precision: 'month', start: '2026-03', point: true, ref: { type: 'award', id: 'bmo' } },
];

export const activityById = (id: string) => activities.find((a) => a.id === id)!;

/** Months since year 0 – a simple linear scale for the lanes. */
export function toMonths(ym: string): number {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

export function currentYM(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

/** Resolve an activity to a [start, end] month span for drawing. */
export function spanOf(a: Activity): { start: number; end: number } | null {
  if (a.precision === 'unspecified') {
    const host = a.displaySpanOf ? activityById(a.displaySpanOf) : null;
    return host ? spanOf(host) : null;
  }
  if (!a.start) return null;
  const start = toMonths(a.start);
  if (a.point) return { start, end: start };
  const endYM = a.end === 'present' ? currentYM() : a.end ?? a.start;
  return { start, end: toMonths(endYM) + 1 };
}
