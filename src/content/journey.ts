/**
 * JOURNEY CHAPTERS
 * -----------------------------------------------------------------------------
 * Editable data for the horizontal journey (and the stacked mobile version).
 * Order here = order on screen. Each chapter picks the vehicle shown while the
 * visitor is inside it, a lane window for its mini timeline, and the items it
 * reveals. Items reference entries in portfolio.ts by id, so the original
 * wording stays in one place.
 *
 * Chapter titles / short leads are navigation copy written for this redesign.
 * They intentionally make no new professional claims.
 */

export type VehicleKind = 'motorcycle' | 'airplane' | 'bus' | 'car';

export type ChapterItem =
  | { kind: 'project'; id: string }
  | { kind: 'award'; id: string; feature?: boolean }
  | { kind: 'education'; id: string }
  | {
      kind: 'milestone';
      id: string;
      icon: 'ramen' | 'grad' | 'flag';
      title: string;
      meta: string;
      text?: string;
    }
  | {
      /** Clearly labelled editable placeholder (e.g. school projects not yet supplied). */
      kind: 'placeholder';
      id: string;
      title: string;
      note: string;
    };

export type Chapter = {
  id: string;
  /** Short label for chapter markers / progress indicator. */
  navLabel: string;
  eyebrow: string;
  title: string;
  place?: string;
  lead?: string;
  vehicle: VehicleKind;
  /** Optional mini-timeline window ('YYYY-MM' or 'present'). */
  lanes?: { from: string; to: string | 'present'; highlight?: string[] };
  /** Items that are still ongoing in this chapter (shown as small chips). */
  ongoing?: string[];
  items: ChapterItem[];
  /** Special layouts. */
  variant?: 'travel' | 'finale';
};

export const chapters: Chapter[] = [
  {
    id: 'vietnam',
    navLabel: 'Vietnam',
    eyebrow: 'Chapter 01 · 2020 – 2024',
    title: 'Vietnam & early creative work',
    lead: 'Early milestones in video, study, and social content.',
    vehicle: 'motorcycle',
    lanes: { from: '2020-01', to: '2024-06', highlight: ['aiesec', 'rmit', 'cherries-code'] },
    items: [
      { kind: 'award', id: 'aiesec' },
      { kind: 'education', id: 'rmit' },
      { kind: 'project', id: 'cherries-code' },
    ],
  },
  {
    id: 'to-canada',
    navLabel: 'To Canada',
    eyebrow: 'Chapter 02',
    title: 'Moving to Canada',
    lead: 'From Vietnam to Ontario.',
    vehicle: 'airplane',
    variant: 'travel',
    items: [],
  },
  {
    id: 'humber',
    navLabel: 'Humber',
    eyebrow: 'Chapter 03 · 2024 – 2025',
    title: 'Humber College, study & work',
    place: 'Etobicoke, Ontario, Canada',
    lead: 'Studying multimedia design while working part-time.',
    vehicle: 'bus',
    lanes: { from: '2023-09', to: '2025-12', highlight: ['humber', 'tn-ebike', 'kinton'] },
    items: [
      { kind: 'education', id: 'humber' },
      {
        kind: 'placeholder',
        id: 'school-project-1',
        title: 'School project',
        note: 'Editable placeholder — add a Humber project image, title and description in src/content/journey.ts.',
      },
      {
        kind: 'placeholder',
        id: 'school-project-2',
        title: 'School project',
        note: 'Editable placeholder — add a Humber project image, title and description in src/content/journey.ts.',
      },
      { kind: 'project', id: 'tn-ebike' },
      {
        kind: 'milestone',
        id: 'kinton',
        icon: 'ramen',
        title: 'Kinton Ramen',
        meta: 'Part-time · alongside Humber College studies',
      },
    ],
  },
  {
    id: 'yon-crochet',
    navLabel: 'Yon Crochet',
    eyebrow: 'Chapter 04 · 2025 →',
    title: 'Yon Crochet, graduation & entrepreneurship',
    lead: 'Co-founding Yon Crochet in April 2025, during the Humber years.',
    vehicle: 'bus',
    lanes: { from: '2024-09', to: '2026-01', highlight: ['yon-crochet', 'graduation', 'longo'] },
    items: [
      { kind: 'project', id: 'yon-crochet' },
      {
        kind: 'milestone',
        id: 'graduation',
        icon: 'grad',
        title: 'Graduation — Humber College',
        meta: 'Multimedia Design & Development (Diploma) · 2024–2025',
      },
      { kind: 'award', id: 'longo' },
    ],
  },
  {
    id: 'career',
    navLabel: 'Career',
    eyebrow: 'Chapter 05 · 10/2025 – Present',
    title: 'Full-time creative career',
    place: 'Toronto, Ontario, Canada',
    lead: 'Two brands, handled side by side.',
    vehicle: 'car',
    lanes: { from: '2025-03', to: 'present', highlight: ['alarm-guard', 'senior-protection', 'yon-crochet'] },
    ongoing: ['Yon Crochet'],
    items: [
      { kind: 'project', id: 'alarm-guard' },
      { kind: 'project', id: 'senior-protection' },
    ],
  },
  {
    id: 'bmo',
    navLabel: 'BMO',
    eyebrow: 'Chapter 06 · March 2026',
    title: 'BMO Launch Me',
    vehicle: 'car',
    ongoing: ['Yon Crochet', 'Alarm Guard Security', 'Senior Protection'],
    items: [{ kind: 'award', id: 'bmo', feature: true }],
  },
  {
    id: 'today',
    navLabel: 'Today',
    eyebrow: 'Chapter 07 · Now',
    title: 'Let’s connect',
    place: 'Toronto, Ontario, Canada',
    vehicle: 'car',
    variant: 'finale',
    lanes: { from: '2020-01', to: 'present' },
    items: [],
  },
];
