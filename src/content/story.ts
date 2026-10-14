/**
 * THE JOURNEY STORY
 * -----------------------------------------------------------------------------
 * One continuous horizontal story, in chronological order. Each stop has a
 * short headline, a brief story, and the work it shows (by id from
 * portfolio.ts). Full original wording – responsibilities, metrics, award
 * descriptions – lives in the case-study overlays, not here.
 *
 * Dates in the story text are the exact dates from the original portfolio.
 * Undated facts (moving to Canada, Kinton Ramen, graduation month) are
 * deliberately left without dates. Ongoing roles are never described as ended.
 */

export type VehicleKind = 'motorcycle' | 'airplane' | 'bus' | 'car';

export type Media =
  | { kind: 'project'; id: string }
  | { kind: 'award'; id: string }
  | { kind: 'placeholder'; id: string; title: string; note: string };

export type Stop = {
  id: string;
  /** Short label under the dot on the bottom journey line (omit to hide the dot). */
  marker?: string;
  /** Small line above the headline, e.g. “Vietnam · 2020 – 2024”. */
  kicker: string;
  /** One short headline. A trailing “.” is drawn as a coral dot. */
  title: string;
  /** One brief, connected story. */
  story: string;
  /** Small verbatim facts from the original site (e.g. education entries). */
  facts?: string[];
  vehicle: VehicleKind;
  /** Breadcrumb under the line: 0 Vietnam, 1 Canada, 2 Toronto, -1 none. */
  place: -1 | 0 | 1 | 2;
  media: Media[];
  variant?: 'intro' | 'travel' | 'finale';
};

export const stops: Stop[] = [
  {
    id: 'hello',
    kicker: 'Hoang Y Vy Nguyen · Y Vy',
    title: 'Designing brands, content, and experiences that people remember.',
    story: '', // the original introduction is rendered from portfolio.ts (hero.intro)
    vehicle: 'motorcycle',
    place: -1,
    media: [],
    variant: 'intro',
  },
  {
    id: 'vietnam',
    marker: 'Vietnam',
    kicker: 'Vietnam · 2020 – 2024',
    title: 'It started in Vietnam.',
    story:
      'In July 2020, I received The Best Member and The Best Video Editor prizes from AIESEC. In 2023, I studied at RMIT in Ho Chi Minh City, and from January 2023 to February 2024 I created front-end tips and tutorials for Cherries Code on Instagram.',
    facts: ['Royal Melbourne Institute of Technology University · Bachelor of Information Technology · 2023 · Ho Chi Minh City, Vietnam'],
    vehicle: 'motorcycle',
    place: 0,
    media: [
      { kind: 'project', id: 'cherries-code' },
      { kind: 'award', id: 'aiesec' },
    ],
  },
  {
    id: 'canada',
    marker: 'Canada',
    kicker: 'Moving to Canada',
    title: 'Next stop, Canada.',
    story: 'Then I left Vietnam for Canada, ready to start a new chapter in Ontario.',
    vehicle: 'airplane',
    place: 1,
    media: [],
    variant: 'travel',
  },
  {
    id: 'humber',
    marker: 'Humber',
    kicker: 'Humber College · 2024 – 2025',
    title: 'Learning by doing.',
    story:
      'While studying Multimedia Design & Development at Humber College, I worked part-time as TN Ebike’s Digital Marketing & Multimedia Designer from January 2024 to May 2025, and part-time at Kinton Ramen.',
    facts: ['Humber College · Multimedia Design & Development (Diploma) · 2024–2025 · Etobicoke, Ontario, Canada'],
    vehicle: 'bus',
    place: 2,
    media: [
      { kind: 'project', id: 'tn-ebike' },
      {
        kind: 'placeholder',
        id: 'school-projects',
        title: 'School projects',
        note: 'Editable placeholder — add Humber project images in src/content/story.ts.',
      },
    ],
  },
  {
    id: 'yon-crochet',
    marker: 'Yon Crochet',
    kicker: 'Yon Crochet · April 2025 – Present',
    title: 'Starting my own brand.',
    story:
      'During this time, in April 2025, I co-founded Yon Crochet: crochet kits, step-by-step lessons, and a digital subscription for beginners. As Marketing & Design Lead, I still shape the brand today.',
    vehicle: 'bus',
    place: 2,
    media: [{ kind: 'project', id: 'yon-crochet' }],
  },
  {
    id: 'graduation',
    marker: 'Graduation',
    kicker: 'Graduation & Longo grant · 2025',
    title: 'Graduating with a grant.',
    story:
      'I completed my Multimedia Design & Development diploma at Humber. In August 2025, Yon Crochet received $3,000 in startup funding from Humber’s Longo Centre for Entrepreneurship.',
    vehicle: 'bus',
    place: 2,
    media: [{ kind: 'award', id: 'longo' }],
  },
  {
    id: 'career',
    marker: 'Full-time',
    kicker: 'Full-time · October 2025 – Present',
    title: 'Designing full\u2011time.',
    story:
      'In October 2025, I joined Alarm Guard Security and Senior Protection as a full-time Graphic Designer & Video Editor, creating visual and video content for both brands while continuing to lead Yon Crochet.',
    vehicle: 'car',
    place: 2,
    media: [
      { kind: 'project', id: 'alarm-guard' },
      { kind: 'project', id: 'senior-protection' },
    ],
  },
  {
    id: 'bmo',
    marker: 'BMO',
    kicker: 'BMO Launch Me · March 2026',
    title: 'First place.',
    story:
      'In March 2026, I pitched Yon Crochet to a panel of BMO judges alongside 130+ startups, and placed #1 in the Women Innovation category with $15,000 in grant funding.',
    vehicle: 'car',
    place: 2,
    media: [{ kind: 'award', id: 'bmo' }],
  },
  {
    id: 'today',
    marker: 'Today',
    kicker: 'Today · Toronto, Ontario, Canada',
    title: 'Let’s connect.',
    story:
      'Today I design for Alarm Guard Security, Senior Protection, and Yon Crochet in Toronto. I’d love to hear about what you’re building.',
    vehicle: 'car',
    place: 2,
    media: [],
    variant: 'finale',
  },
];
