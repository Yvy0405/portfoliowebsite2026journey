/**
 * JOURNEY CHAPTERS
 * -----------------------------------------------------------------------------
 * Editable data for the journey destinations. Order here = order on screen.
 * Each chapter picks the vehicle shown while the visitor is inside it, a lane
 * window for its parallel timeline, and the cards it shows. Cards reference
 * entries in portfolio.ts by id, so the original wording stays in one place.
 *
 * `items` is a list of columns. A column is either one card, or an array of
 * cards stacked vertically (use this for small cards such as education or
 * milestones).
 *
 * Chapter titles / leads are navigation copy written for this redesign.
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
      icon: 'ramen' | 'grad';
      title: string;
      meta: string;
      text?: string;
    }
  | {
      /** Clearly labelled editable placeholder (school projects not yet supplied). */
      kind: 'placeholder';
      id: string;
      title: string;
      note: string;
      /** Number of empty image tiles to show. */
      tiles: number;
    };

export type ChapterColumn = ChapterItem | ChapterItem[];

export type Chapter = {
  id: string;
  /** Label under the numbered marker in the bottom route bar. */
  navLabel: string;
  /** Small uppercase label after the chapter number, e.g. “Toronto”. */
  kicker: string;
  /** Big headline. A trailing “.” is drawn as a coral dot. */
  title: string;
  /** One line under the headline. */
  subtitle?: string;
  lead?: string;
  vehicle: VehicleKind;
  /** Which part of the “Vietnam → Canada → Toronto” breadcrumb is current. */
  place: 0 | 1 | 2;
  /** Parallel timeline window ('YYYY-MM' or 'present') and activity ids to show. */
  lanes?: { from: string; to: string | 'present'; ids: string[] };
  /** Activities still ongoing in this chapter (shown as a small chip). */
  ongoing?: string[];
  items: ChapterColumn[];
  variant?: 'travel';
};

export const chapters: Chapter[] = [
  {
    id: 'vietnam',
    navLabel: 'Vietnam',
    kicker: 'Vietnam',
    title: 'Where it started.',
    subtitle: '2020 – 2024',
    lead: 'Early milestones in video, study, and social content.',
    vehicle: 'motorcycle',
    place: 0,
    lanes: { from: '2020-01', to: '2024-06', ids: ['aiesec', 'rmit', 'cherries-code'] },
    items: [{ kind: 'award', id: 'aiesec' }, [{ kind: 'education', id: 'rmit' }], { kind: 'project', id: 'cherries-code' }],
  },
  {
    id: 'to-canada',
    navLabel: 'Move to Canada',
    kicker: 'Moving',
    title: 'A new chapter.',
    subtitle: 'Vietnam → Canada',
    lead: 'From Vietnam to Ontario, Canada.',
    vehicle: 'airplane',
    place: 1,
    variant: 'travel',
    items: [],
  },
  {
    id: 'humber',
    navLabel: 'Humber College',
    kicker: 'Toronto',
    title: 'Study & work.',
    subtitle: 'Humber College · Multimedia Design & Development',
    lead: 'Studying multimedia design while working part-time.',
    vehicle: 'bus',
    place: 2,
    lanes: { from: '2023-09', to: '2025-12', ids: ['humber', 'tn-ebike', 'kinton'] },
    items: [
      {
        kind: 'placeholder',
        id: 'school-projects',
        title: 'School projects',
        note: 'Editable placeholder — add Humber project images, titles and descriptions in src/content/journey.ts.',
        tiles: 3,
      },
      { kind: 'project', id: 'tn-ebike' },
      [
        { kind: 'education', id: 'humber' },
        // Kinton Ramen: dates and responsibilities are not supplied on the original site.
        { kind: 'milestone', id: 'kinton', icon: 'ramen', title: 'Kinton Ramen', meta: 'Part-time · alongside Humber College studies' },
      ],
    ],
  },
  {
    id: 'yon-crochet',
    navLabel: 'Yon Crochet',
    kicker: 'Entrepreneurship',
    title: 'Building Yon Crochet.',
    subtitle: 'Co-founder · 4/2025 – Present',
    lead: 'Co-founding Yon Crochet in April 2025, during the Humber years.',
    vehicle: 'bus',
    place: 2,
    lanes: { from: '2024-09', to: '2026-01', ids: ['yon-crochet', 'humber', 'graduation', 'longo'] },
    items: [
      { kind: 'project', id: 'yon-crochet' },
      { kind: 'award', id: 'longo' },
      [
        {
          kind: 'milestone',
          id: 'graduation',
          icon: 'grad',
          title: 'Graduation — Humber College',
          meta: 'Multimedia Design & Development (Diploma) · 2024–2025',
        },
      ],
    ],
  },
  {
    id: 'career',
    navLabel: 'Full-time designer',
    kicker: 'Toronto',
    title: 'Full-time creative.',
    subtitle: 'Alarm Guard Security · Senior Protection · 10/2025 – Present',
    lead: 'Two brands, handled side by side.',
    vehicle: 'car',
    place: 2,
    lanes: { from: '2025-03', to: 'present', ids: ['alarm-guard', 'senior-protection', 'yon-crochet'] },
    ongoing: ['Yon Crochet'],
    items: [
      { kind: 'project', id: 'alarm-guard' },
      { kind: 'project', id: 'senior-protection' },
    ],
  },
  {
    id: 'bmo',
    navLabel: 'BMO Launch Me',
    kicker: 'March 2026',
    title: 'First place.',
    subtitle: 'BMO Launch Me Pitch Competition',
    vehicle: 'car',
    place: 2,
    ongoing: ['Yon Crochet', 'Alarm Guard Security', 'Senior Protection'],
    items: [{ kind: 'award', id: 'bmo', feature: true }],
  },
];
