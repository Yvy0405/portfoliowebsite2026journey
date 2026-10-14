import { forwardRef, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { chapters, type Chapter, type VehicleKind } from '../content/journey';
import {
  awards,
  awardsSection,
  clients,
  contact,
  education,
  educationSection,
  footer,
  hero,
  person,
  projects,
  workSection,
} from '../content/portfolio';
import { asset } from '../lib/assets';
import { AwardCard, ChapterItemView, ProjectTile } from './Cards';
import { Img } from './Img';
import { TimelineLanes } from './TimelineLanes';
import { Vehicle } from './vehicles/Vehicle';

/* --------------------------------------------------------------------------
   Destination registry – the horizontal order of the whole site.
   -------------------------------------------------------------------------- */
export type Destination = {
  id: string;
  label: string;
  vehicle: VehicleKind;
  /** Breadcrumb position: -1 none, 0 Vietnam, 1 Canada, 2 Toronto. */
  place: -1 | 0 | 1 | 2;
  chapter?: Chapter;
};

export const destinations: Destination[] = [
  { id: 'about', label: 'About', vehicle: 'motorcycle', place: -1 },
  { id: 'journey', label: 'My Journey', vehicle: 'motorcycle', place: 0 },
  ...chapters.map((c) => ({ id: `chapter-${c.id}`, label: c.navLabel, vehicle: c.vehicle, place: c.place, chapter: c })),
  { id: 'work', label: 'Work', vehicle: 'car', place: 2 },
  { id: 'awards', label: 'Awards', vehicle: 'car', place: 2 },
  { id: 'education', label: 'Education', vehicle: 'car', place: 2 },
  { id: 'contact', label: 'Contact', vehicle: 'car', place: 2 },
];

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] as const },
};

/** Headline whose final period is drawn as a coral dot (as in the mockup). */
function Headline({ text, id, as: Tag = 'h2' }: { text: string; id: string; as?: 'h1' | 'h2' }) {
  const dot = text.endsWith('.');
  return (
    <Tag id={id} className="headline" tabIndex={-1}>
      {dot ? text.slice(0, -1) : text}
      {dot && <span className="headline-dot">.</span>}
    </Tag>
  );
}

type DestProps = { id: string; labelledBy: string; className?: string; children: ReactNode };

const Dest = forwardRef<HTMLElement, DestProps>(function Dest({ id, labelledBy, className, children }, ref) {
  return (
    <section ref={ref} id={id} className={`dest ${className ?? ''}`} aria-labelledby={labelledBy} data-dest={id}>
      {children}
    </section>
  );
});

type NavProps = { onNavigate: (id: string) => void };

/* --------------------------------------------------------------------------
   01 · About / hero
   -------------------------------------------------------------------------- */
export const AboutDest = forwardRef<HTMLElement, NavProps>(function AboutDest({ onNavigate }, ref) {
  return (
    <Dest ref={ref} id="about" labelledBy="about-title" className="dest-about">
      <div className="col col-about">
        <p className="kicker">
          <span className="kicker-num">About me</span> / {person.fullName} · {person.shortName}
        </p>
        <h1 id="about-title" className="headline headline-hero" tabIndex={-1}>
          {hero.title.slice(0, -1)}
          <span className="headline-dot">.</span>
        </h1>
        <p className="lead">
          {hero.intro.map((part, i) => (part.strong ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>))}
        </p>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={() => onNavigate('journey')}>
            Explore My Journey <span aria-hidden="true">→</span>
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => onNavigate('work')}>
            {hero.ctaPrimary}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => onNavigate('contact')}>
            {hero.ctaSecondary}
          </button>
        </div>
        <ul className="highlights">
          {hero.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <div className="specialties">
          <p className="mini-title">Professional focus</p>
          <ul className="tags">
            {person.focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col col-portrait">
        <div className="card portrait-card">
          <Img image={person.portrait} sizes="(min-width: 1024px) 420px, 80vw" eager className="portrait" />
        </div>
        <div className="card clients-card">
          <h2 className="mini-title">{clients.heading}</h2>
          <ul className="clients-logos">
            {clients.logos.map((l) => (
              <li key={l.name}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  <img src={asset(l.src)} alt={`${l.name} (opens in a new tab)`} decoding="async" height="80" draggable={false} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dest>
  );
});

/* --------------------------------------------------------------------------
   02 · My Journey (start of the timeline)
   -------------------------------------------------------------------------- */
export const JourneyDest = forwardRef<HTMLElement, NavProps>(function JourneyDest({ onNavigate }, ref) {
  return (
    <Dest ref={ref} id="journey" labelledBy="journey-title" className="dest-journey">
      <div className="col col-intro">
        <p className="kicker">
          <span className="kicker-num">My journey</span> / Vietnam → Canada → Toronto
        </p>
        <Headline id="journey-title" text="From Vietnam to Toronto." />
        <p className="lead">
          Follow the route chapter by chapter. A small vehicle guides the way, and activities that happened at the same time run in parallel.
        </p>
        <ol className="vehicle-steps" aria-label="Vehicles along the journey">
          {(
            [
              ['motorcycle', 'Vietnam'],
              ['airplane', 'To Canada'],
              ['bus', 'Humber'],
              ['car', 'Career'],
            ] as const
          ).map(([v, label]) => (
            <li key={v}>
              <Vehicle kind={v} />
              <span>{label}</span>
            </li>
          ))}
        </ol>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={() => onNavigate(`chapter-${chapters[0].id}`)}>
            Start the journey <span aria-hidden="true">→</span>
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => onNavigate('work')}>
            Skip to work
          </button>
        </div>
      </div>
      <motion.div className="col col-wide" {...reveal}>
        <div className="card lanes-card">
          <TimelineLanes from="2020-01" to="present" title="Parallel timeline" legend />
        </div>
      </motion.div>
    </Dest>
  );
});

/* --------------------------------------------------------------------------
   03+ · Journey chapters
   -------------------------------------------------------------------------- */
export const ChapterDest = forwardRef<HTMLElement, { chapter: Chapter; index: number }>(function ChapterDest({ chapter, index }, ref) {
  const titleId = `chapter-${chapter.id}-title`;
  return (
    <Dest ref={ref} id={`chapter-${chapter.id}`} labelledBy={titleId} className={`dest-chapter chapter-${chapter.id}`}>
      <div className="col col-intro">
        <p className="kicker">
          <span className="kicker-num">{String(index + 1).padStart(2, '0')}</span> / {chapter.kicker}
        </p>
        <Headline id={titleId} text={chapter.title} />
        {chapter.subtitle && <p className="subtitle">{chapter.subtitle}</p>}
        {chapter.lead && <p className="lead">{chapter.lead}</p>}
        {chapter.ongoing && (
          <p className="ongoing">
            <span className="ongoing-dot" aria-hidden="true" /> Ongoing: {chapter.ongoing.join(' · ')}
          </p>
        )}
        {chapter.lanes && (
          <>
            <hr className="rule" />
            <TimelineLanes from={chapter.lanes.from} to={chapter.lanes.to} ids={chapter.lanes.ids} title="Parallel timeline" />
          </>
        )}
      </div>

      {chapter.variant === 'travel' && (
        <div className="col col-wide">
          <div className="travel" aria-hidden="true">
            <svg className="travel-route" viewBox="0 0 600 240" preserveAspectRatio="none">
              <path
                d="M20 220 C 170 20, 430 20, 580 220"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray="2 12"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <Vehicle kind="airplane" className="travel-plane" title="" />
            <div className="travel-stop travel-from">
              <span className="travel-pin" />
              Vietnam
            </div>
            <div className="travel-stop travel-to">
              <img src={asset('assets/img/canada-480.webp')} alt="" width="40" height="40" draggable={false} />
              Canada
            </div>
          </div>
        </div>
      )}

      {chapter.items.map((col, i) => (
        <motion.div
          key={i}
          className={`col ${Array.isArray(col) ? 'col-stack' : `col-card col-${col.kind}${'feature' in col && col.feature ? ' col-feature' : ''}`}`}
          {...reveal}
        >
          {Array.isArray(col) ? col.map((item) => <ChapterItemView key={item.id} item={item} />) : <ChapterItemView item={col} />}
        </motion.div>
      ))}
    </Dest>
  );
});

/* --------------------------------------------------------------------------
   Work · Awards · Education · Contact
   -------------------------------------------------------------------------- */
function SectionIntro({ kicker, title, id, children }: { kicker: string; title: string; id: string; children?: ReactNode }) {
  return (
    <div className="col col-section-intro">
      <p className="kicker">
        <span className="kicker-num">{kicker}</span>
      </p>
      <h2 id={id} className="headline headline-section" tabIndex={-1}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export const WorkDest = forwardRef<HTMLElement>(function WorkDest(_, ref) {
  return (
    <Dest ref={ref} id="work" labelledBy="work-title" className="dest-work">
      <SectionIntro kicker="Work" title={workSection.heading} id="work-title">
        <p className="lead">{workSection.subheading}</p>
      </SectionIntro>
      {projects.map((p) => (
        <motion.div key={p.id} className="col col-tile" {...reveal}>
          <ProjectTile id={p.id} />
        </motion.div>
      ))}
    </Dest>
  );
});

export const AwardsDest = forwardRef<HTMLElement>(function AwardsDest(_, ref) {
  return (
    <Dest ref={ref} id="awards" labelledBy="awards-title" className="dest-awards">
      <SectionIntro kicker="Awards" title={awardsSection.heading} id="awards-title" />
      {awards.map((a) => (
        <motion.div key={a.id} className="col col-card col-award" {...reveal}>
          <AwardCard id={a.id} full />
        </motion.div>
      ))}
    </Dest>
  );
});

export const EducationDest = forwardRef<HTMLElement>(function EducationDest(_, ref) {
  return (
    <Dest ref={ref} id="education" labelledBy="education-title" className="dest-education">
      <SectionIntro kicker="Education" title={educationSection.heading} id="education-title">
        <a href={asset(educationSection.resumeHref)} className="btn btn-primary" target="_blank" rel="noopener">
          {educationSection.resumeLabel}
          {NEW_TAB}
        </a>
      </SectionIntro>
      <div className="col col-edu">
        {education.map((e) => (
          <motion.article key={e.id} className="card edu-card" aria-labelledby={`edu-${e.id}`} {...reveal}>
            <p className="edu-year">{e.year}</p>
            <h3 id={`edu-${e.id}`} className="card-title-lg">{e.school}</h3>
            <p className="card-text">{e.degree}</p>
            <p className="card-meta">{e.location}</p>
          </motion.article>
        ))}
      </div>
    </Dest>
  );
});

export const ContactDest = forwardRef<HTMLElement, NavProps>(function ContactDest({ onNavigate }, ref) {
  return (
    <Dest ref={ref} id="contact" labelledBy="contact-title" className="dest-contact">
      <div className="col col-contact">
        <p className="kicker">
          <span className="kicker-num">{contact.heading}</span> / {contact.location}
        </p>
        <Headline id="contact-title" text="Let’s connect." />
        <div className="contact-grid">
          <div className="card contact-card">
            <h3>Email</h3>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className="card contact-card">
            <h3>LinkedIn</h3>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              {contact.linkedin}
              {NEW_TAB}
            </a>
          </div>
          <div className="card contact-card">
            <h3>Location</h3>
            <p>{contact.location}</p>
          </div>
        </div>
        <div className="btn-row">
          <a className="btn btn-primary" href={`mailto:${contact.email}`}>
            Email me
          </a>
          <a className="btn btn-secondary" href={asset(educationSection.resumeHref)} target="_blank" rel="noopener">
            {educationSection.resumeLabel}
            {NEW_TAB}
          </a>
          <button type="button" className="btn btn-ghost" onClick={() => onNavigate('about')}>
            <span aria-hidden="true">↺</span> Start the journey over
          </button>
        </div>
        <p className="site-footer">
          © {new Date().getFullYear()} {footer.owner}. {footer.rights}
        </p>
      </div>
      <div className="col col-parked" aria-hidden="true">
        <Vehicle kind="car" className="parked-car" title="" />
      </div>
    </Dest>
  );
});
