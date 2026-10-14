/**
 * ORIGINAL PORTFOLIO COPY
 * -----------------------------------------------------------------------------
 * Every string in this file is copied verbatim from the original portfolio at
 * https://yvy0405.github.io/portfolio2026/ (repo: yvy0405/portfolio2026).
 * Edit wording here and it updates everywhere it is used (journey chapters,
 * work index, case-study panels, awards, education and contact).
 *
 * Image paths are relative to /public. See src/lib/assets.ts for how
 * responsive WebP variants are resolved.
 */

export type ImageRef = {
  /** Base name of the optimized image in public/assets/img (without -<width>.webp). */
  slug: string;
  alt: string;
  /** Intrinsic aspect ratio (width / height) – used to reserve space. */
  ratio: number;
  /** Largest generated width. */
  maxWidth: number;
};

export type ExternalLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  role: string;
  company: string;
  /** Timeline exactly as written on the original site. */
  timeline: string;
  bullets: string[];
  image: ImageRef;
  /** The original “View More” target. `null` means the original pointed to “#”,
   *  so the button now opens this project's local case study instead. */
  viewMoreHref: string | null;
  /** Company website from the original “Proudly Working with…” logo strip. */
  website: ExternalLink;
  logo: { src: string; alt: string };
  /**
   * OPTIONAL extra case-study sections. Empty by default – the original site
   * has no “Challenge / Process / Results” copy, so none is invented.
   * Add entries here when you have real content, e.g.
   * { heading: 'Campaign highlights', body: '…', placeholder: false }
   */
  extraSections: { heading: string; body: string; placeholder?: boolean }[];
};

export type Award = {
  id: string;
  title: string;
  /** “Issued by … · date” line exactly as written on the original site. */
  issued: string;
  description: string;
  images: ImageRef[];
  link: ExternalLink;
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  year: string;
  location: string;
};

const sq = (slug: string, alt: string, maxWidth = 1600): ImageRef => ({ slug, alt, ratio: 1, maxWidth });

export const person = {
  fullName: 'Hoang Y Vy Nguyen',
  shortName: 'Y Vy',
  logoMark: 'YV',
  portrait: sq('avatar', 'Portrait of Hoang Y Vy Nguyen', 960),
  /** Supplied in the brief (not on the original site) – used as a small tag row. */
  focus: ['Graphic Design', 'Visual Communication', 'Marketing', 'Branding', 'Digital Content Creation', 'Social Media'],
};

export const hero = {
  title: 'Designing brands, content, and experiences that people remember.',
  /** Rendered with <strong> on the marked phrases, exactly like the original. */
  intro: [
    { text: 'Hi, I’m ' },
    { text: 'Y Vy', strong: true },
    { text: ', a ' },
    { text: 'Multimedia Designer', strong: true },
    {
      text: ' specializing in branding, creative marketing, and digital content. I create visual solutions that help organizations communicate clearly, engage audiences, and achieve business goals.',
    },
  ] as { text: string; strong?: boolean }[],
  ctaPrimary: 'View Work',
  ctaSecondary: 'Get in Touch',
  highlights: ['3+ years experience', 'Toronto, Ontario, Canada'],
};

export const clients = {
  heading: 'Proudly Working with Canadian Businesses',
  logos: [
    { name: 'Alarm Guard Security', href: 'https://alarmguardsecurity.ca/', src: 'assets/logos/alarm-guard.webp' },
    { name: 'Senior Protection', href: 'https://seniorprotection.ca/', src: 'assets/logos/senior-protection.webp' },
    { name: 'TN Ebike', href: 'https://tnebike.com/', src: 'assets/logos/tn-ebike.webp' },
    { name: 'Yon Crochet', href: 'https://yoncrochet.com/', src: 'assets/logos/yon-crochet.webp' },
    { name: 'Cherries Code', href: 'https://www.instagram.com/cherries_code/', src: 'assets/logos/cherries-code.webp' },
  ],
};

export const workSection = {
  heading: 'Work Experiences',
  subheading: 'From research and concept development to final execution and real-world impact.',
  viewMore: 'View More',
};

const agencyBullets = [
  'Create and deliver monthly high-quality visual design assets including social media content, marketing materials, and digital graphics aligned with brand guidelines.',
  'Apply strong visual design principles across multiple platforms.',
  'Design and refine marketing collateral such as posters, flyers, and digital assets with a consistent visual identity.',
  'Edit and adapt visual and video content for use across websites and social media channels.',
  'Collaborate cross-functionally with marketing teams, writers, and stakeholders to translate ideas into effective visual solutions.',
  'Support content planning and production workflows in fast-paced, collaborative environments.',
];

/** Order matches the original “Work Experiences” section. */
export const projects: Project[] = [
  {
    id: 'alarm-guard',
    title: 'Alarm Guard Security',
    description:
      'Alarm Guard Security is a security solutions company providing residential and commercial alarm systems to help protect homes and businesses.',
    role: 'Graphic Designer & Video Editor | Permanent Full-time',
    company: 'Alarm Guard Security',
    timeline: '10/2025 - Present',
    bullets: agencyBullets,
    image: sq('alarm-guard-preview', 'Alarm Guard Security preview'),
    viewMoreHref: null,
    website: { label: 'alarmguardsecurity.ca', href: 'https://alarmguardsecurity.ca/' },
    logo: { src: 'assets/logos/alarm-guard.webp', alt: 'Alarm Guard Security logo' },
    extraSections: [],
  },
  {
    id: 'senior-protection',
    title: 'Senior Protection',
    description:
      'Senior Protection provides medical alert devices and monitoring services designed to support the safety and independence of seniors.',
    role: 'Graphic Designer & Video Editor | Permanent Full-time',
    company: 'Senior Protection',
    timeline: '10/2025 - Present',
    bullets: agencyBullets,
    image: sq('senior-protection-preview', 'Senior Protection preview'),
    viewMoreHref: null,
    website: { label: 'seniorprotection.ca', href: 'https://seniorprotection.ca/' },
    logo: { src: 'assets/logos/senior-protection.webp', alt: 'Senior Protection logo' },
    extraSections: [],
  },
  {
    id: 'yon-crochet',
    title: 'Yon Crochet',
    description:
      'Yon Crochet offers crochet kits, step-by-step lessons, and a digital subscription that helps beginners learn crochet',
    role: 'Co-founder, Marketing & Design Lead | Self-employed',
    company: 'Yon Crochet',
    timeline: '4/2025 - Present',
    bullets: [
      'Revitalized Shopify storefront with UI/UX enhancements and CMS content updates.',
      'Produced 1000+ multimedia assets (packaging, tutorials, blogs, social media visuals, etc...) using Adobe Creative Suite, Figma, Canva, and Capcut, ensuring consistent brand identity across platforms.',
      'Secured $3,000 in startup grant funding by pitching to the Longo Incubator panel.',
      'Secured $15,000 in startup grant funding by pitching to the BMO (The Bank of Montreal) judges panel.',
    ],
    image: sq('yon-crochet-preview', 'Yon Crochet Preview'),
    viewMoreHref: null,
    website: { label: 'yoncrochet.com', href: 'https://yoncrochet.com/' },
    logo: { src: 'assets/logos/yon-crochet.webp', alt: 'Yon Crochet logo' },
    extraSections: [],
  },
  {
    id: 'tn-ebike',
    title: 'TN Ebike',
    description:
      'TN Ebike is an electric bike company offering eco-friendly e-bikes designed for convenient urban travel, combining modern technology, comfort, and efficiency for everyday commuting and recreation.',
    role: 'Digital Marketing & Multimedia Designer | Part-time',
    company: 'TN Ebike',
    timeline: '1/2024 - 5/2025',
    bullets: [
      'Grew Instagram from 0 to 11K+ followers in 1 year, boosting engagement and enhancing brand visibility.',
      'Created and optimized 1000+ design assets (branding, product visuals, videography, photography, motion graphics, etc...), maintaining consistent brand identity.',
      'Designed & developed a Shopify e-commerce website with optimized UX/UI and front-end website design, improving conversion rates by 15% and retention by 25%.',
      'Managed content updates, product launches, and marketing campaigns across social media, reducing time-to-market by 40%.',
    ],
    image: sq('tn-ebike-preview', 'TN Ebike preview'),
    viewMoreHref: 'https://www.behance.net/gallery/229498695/TN-Ebike-Branding',
    website: { label: 'tnebike.com', href: 'https://tnebike.com/' },
    logo: { src: 'assets/logos/tn-ebike.webp', alt: 'TN Ebike logo' },
    extraSections: [],
  },
  {
    id: 'cherries-code',
    title: 'Cherries Code',
    description:
      'Cherries Code sharing front-end web development tips, tricks, and tutorials to help developers improve their coding skills and build modern, responsive websites.',
    role: 'Social Media Content Creator & Front-End Web Developer | Part-time',
    company: 'Cherries Code',
    timeline: '1/2023 - 2/2024',
    bullets: [
      'Grew Instagram page from 0 to 1K+ followers by consistently posting engaging front-end development content and tutorials.',
      'Developed and executed content strategy focused on beginner-friendly coding tips, driving organic audience growth.',
      'Created visually appealing educational posts and short-form content to increase reach and engagement.',
    ],
    image: sq('cherries-code-preview', 'Cherries Code preview'),
    viewMoreHref: null,
    website: { label: '@cherries_code on Instagram', href: 'https://www.instagram.com/cherries_code/' },
    logo: { src: 'assets/logos/cherries-code.webp', alt: 'Cherries Code logo' },
    extraSections: [],
  },
];

export const awardsSection = { heading: 'Awards & Achievements', readMore: 'Read More' };

/** Order matches the original “Awards & Achievements” section. */
export const awards: Award[] = [
  {
    id: 'bmo',
    title: '1st Place at the BMO Launch Me Pitch Competition with $15,000 in Grant Funding',
    issued: 'Issued by BMO (Bank of Montreal) · Mar 2026',
    description:
      'Being selected as a Finalist and pitching Yon Crochet to an amazing panel of BMO judges. Competing alongside 130+ startups across different industries, and placing #1 in the Women Innovation category.',
    images: [sq('bmo1', 'BMO image 1'), sq('bmo2', 'BMO image 2'), sq('bmo3', 'BMO image 3')],
    link: {
      label: 'Read More',
      href: 'https://educationnewscanada.com/article/education/level/colleges/2/1198109/startup-dreams-take-centre-stage-at-humber-s-bmo-launch-me-competition.html',
    },
  },
  {
    id: 'longo',
    title: '$3000 in Grant Funding For Yon Crochet Startup Business',
    issued: "Issued by Humber's Longo Centre for Entrepreneurship (Longo CfE) · Aug 2025",
    description:
      'Awarded $3,000 in startup funding through Humber’s Longo Centre for Entrepreneurship (Longo CfE) as part of the Longo Incubator Program. Selected based on the strength of Yon Crochet’s business model, growth potential, and innovative approach to gamified crochet learning.',
    images: [
      sq('incubator', 'Longo Incubator image 1'),
      sq('incubator2', 'Longo Incubator image 2'),
      sq('incubator3', 'Longo Incubator image 3'),
    ],
    link: { label: 'Read More', href: 'https://humber.ca/business/articles/longo-cfe-entrepreneur-launches-yon-crochet' },
  },
  {
    id: 'aiesec',
    title: 'The Best Member & The Best Video Editor Prize',
    issued: 'Issued by AIESEC · Jul 2020',
    description:
      'Awarded The Best Member Prize, nominated by 100+ participants in the Youth For Impacts Project – AIESEC, for exceptional teamwork and contribution. Also received The Best Video Editor Prize, nominated by the Project Leader and Ambassadors, for outstanding creativity and technical skill in video production.',
    images: [
      sq('aiesec', 'AIESEC certificate 1'),
      sq('aiesec2', 'AIESEC certificate 2'),
      sq('aiesec3', 'AIESEC certificate 3'),
    ],
    link: { label: 'Read More', href: 'https://aiesec.org/' },
  },
];

export const educationSection = { heading: 'Education', resumeLabel: 'Download Resume', resumeHref: 'assets/HoangYVyNguyen_Resume.pdf' };

export const education: Education[] = [
  {
    id: 'rmit',
    school: 'Royal Melbourne Institute of Technology University',
    degree: 'Bachelor of Information Technology',
    year: '2023',
    location: 'Ho Chi Minh City, Vietnam',
  },
  {
    id: 'humber',
    school: 'Humber College',
    degree: 'Multimedia Design & Development (Diploma)',
    year: '2024–2025',
    location: 'Etobicoke, Ontario, Canada',
  },
];

export const contact = {
  heading: 'Contact',
  email: 'maryvy128@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hoang-y-vy-nguyen/',
  location: 'Toronto, Ontario, Canada',
};

/** Footer: “© <current year> Hoang Y Vy Nguyen. All rights reserved.” */
export const footer = { owner: 'Hoang Y Vy Nguyen', rights: 'All rights reserved.' };

export const projectById = (id: string) => projects.find((p) => p.id === id)!;
export const awardById = (id: string) => awards.find((a) => a.id === id)!;
export const educationById = (id: string) => education.find((e) => e.id === id)!;
