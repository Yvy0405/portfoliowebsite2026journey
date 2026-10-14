import { forwardRef } from 'react';
import { motion } from 'motion/react';
import { awardById, clients, contact, educationSection, footer, hero, person, projectById } from '../content/portfolio';
import type { Media, Stop } from '../content/story';
import { asset } from '../lib/assets';
import { useDialog } from '../lib/dialog';
import { Img } from './Img';
import { Trophy } from './vehicles/Icons';
import { Vehicle } from './vehicles/Vehicle';

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] as const },
};

/** Headline whose final period is drawn as a coral dot. */
function Headline({ text, id, as: Tag = 'h2', className = '' }: { text: string; id: string; as?: 'h1' | 'h2'; className?: string }) {
  const dot = text.endsWith('.');
  return (
    <Tag id={id} className={`headline ${className}`} tabIndex={-1}>
      {dot ? text.slice(0, -1) : text}
      {dot && <span className="headline-dot">.</span>}
    </Tag>
  );
}

type Props = { stop: Stop; index: number; onNavigate: (target: string | number) => void };

/** One destination of the journey: short story on the left, large work previews on the right. */
export const StopView = forwardRef<HTMLElement, Props>(function StopView({ stop, index, onNavigate }, ref) {
  const titleId = `${stop.id}-title`;
  const num = String(index).padStart(2, '0');
  return (
    <section ref={ref} id={stop.id} className={`stop stop-${stop.variant ?? 'default'}`} aria-labelledby={titleId} data-stop={stop.id}>
      <div className="stop-text">
        <p className="kicker">
          {stop.variant !== 'intro' && <span className="kicker-num">{num}</span>}
          {stop.kicker}
        </p>

        {stop.variant === 'intro' ? (
          <>
            <Headline id={titleId} as="h1" text={hero.title} className="headline-hero" />
            <p className="story">
              {hero.intro.map((part, i) => (part.strong ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>))}
            </p>
            <p className="facts">
              {hero.highlights.join(' · ')}
              <br />
              {person.focus.join(' · ')}
            </p>
            <div className="btn-row">
              <button type="button" className="btn btn-primary" onClick={() => onNavigate(1)}>
                Start the journey <span aria-hidden="true">→</span>
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => onNavigate('today')}>
                {hero.ctaSecondary}
              </button>
            </div>
          </>
        ) : (
          <>
            <Headline id={titleId} text={stop.title} />
            <p className="story">{stop.story}</p>
            {stop.facts?.map((f) => (
              <p key={f} className="facts">
                {f}
              </p>
            ))}
          </>
        )}

        {stop.variant === 'finale' && (
          <>
            <ul className="contact-list">
              <li>
                <span>Email</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <span>LinkedIn</span>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
                  {contact.linkedin.replace('https://www.', '')}
                  {NEW_TAB}
                </a>
              </li>
              <li>
                <span>Location</span>
                {contact.location}
              </li>
            </ul>
            <div className="btn-row">
              <a className="btn btn-primary" href={`mailto:${contact.email}`}>
                Get in Touch
              </a>
              <a className="btn btn-secondary" href={asset(educationSection.resumeHref)} target="_blank" rel="noopener">
                {educationSection.resumeLabel}
                {NEW_TAB}
              </a>
              <button type="button" className="btn btn-ghost" onClick={() => onNavigate(0)}>
                <span aria-hidden="true">↺</span> Start over
              </button>
            </div>
          </>
        )}
      </div>

      {stop.variant === 'intro' && (
        <motion.div className="stop-media" {...reveal}>
          <figure className="frame portrait-frame">
            <Img image={person.portrait} sizes="(min-width: 1024px) 560px, 90vw" eager />
          </figure>
        </motion.div>
      )}

      {stop.variant === 'travel' && (
        <div className="stop-media travel" aria-hidden="true">
          <svg className="travel-route" viewBox="0 0 600 240" preserveAspectRatio="none">
            <path d="M20 220 C 170 20, 430 20, 580 220" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          </svg>
          <Vehicle kind="airplane" className="travel-plane" title="" />
          <span className="travel-stop travel-from">
            <span className="travel-pin" />
            Vietnam
          </span>
          <span className="travel-stop travel-to">
            <img src={asset('assets/img/canada-480.webp')} alt="" width="40" height="40" draggable={false} />
            Canada
          </span>
        </div>
      )}

      {stop.variant === 'finale' && (
        <motion.div className="stop-media finale-media" {...reveal}>
          <div className="frame clients-frame">
            <h3 className="mini-title">{clients.heading}</h3>
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
          <Vehicle kind="car" className="parked-car" title="" />
          <p className="site-footer">
            © {new Date().getFullYear()} {footer.owner}. {footer.rights}
          </p>
        </motion.div>
      )}

      {stop.media.length > 0 && (
        <div className={`stop-media media-${stop.media.length}`}>
          {stop.media.map((m) => (
            <motion.div key={m.id} className={`media-item media-${m.kind}`} {...reveal}>
              <MediaPreview media={m} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
});

/** Large work preview: the image dominates, with a one-line caption underneath. */
function MediaPreview({ media }: { media: Media }) {
  const { open } = useDialog();

  if (media.kind === 'project') {
    const p = projectById(media.id);
    return (
      <article className="preview" aria-labelledby={`pv-${p.id}`}>
        <button type="button" className="frame preview-image" onClick={() => open('project', p.id)} aria-label={`Open ${p.title} case study`}>
          <Img image={p.image} sizes="(min-width: 1024px) 620px, 90vw" />
        </button>
        <div className="caption">
          <div>
            <h3 id={`pv-${p.id}`} className="caption-title">
              {p.title}
            </h3>
            <p className="caption-meta">
              {p.role.split(' | ')[0]} · {p.timeline}
            </p>
          </div>
          <button type="button" className="btn btn-secondary btn-small" onClick={() => open('project', p.id)}>
            Case study <span aria-hidden="true">↗</span>
          </button>
        </div>
      </article>
    );
  }

  if (media.kind === 'award') {
    const a = awardById(media.id);
    return (
      <article className="preview" aria-labelledby={`pv-${a.id}`}>
        <div className="collage">
          {a.images.map((img, i) => (
            <button key={img.slug} type="button" className="frame preview-image" onClick={() => open('award', a.id)} aria-label={`Open photo ${i + 1} of ${a.title}`}>
              <Img image={img} sizes={i === 0 ? '(min-width: 1024px) 460px, 70vw' : '(min-width: 1024px) 230px, 35vw'} />
            </button>
          ))}
          {a.id === 'bmo' && <Trophy className="collage-trophy" />}
        </div>
        <div className="caption">
          <div>
            <h3 id={`pv-${a.id}`} className="caption-title">
              {a.title}
            </h3>
            <p className="caption-meta">{a.issued}</p>
          </div>
          <button type="button" className="btn btn-secondary btn-small" onClick={() => open('award', a.id)}>
            Details <span aria-hidden="true">↗</span>
          </button>
        </div>
      </article>
    );
  }

  return (
    <article className="preview" aria-labelledby={`pv-${media.id}`}>
      <div className="frame placeholder-tiles" aria-hidden="true">
        <span>Project image 1</span>
        <span>Project image 2</span>
        <span>Project image 3</span>
      </div>
      <div className="caption">
        <div>
          <h3 id={`pv-${media.id}`} className="caption-title">
            {media.title} <span className="tag-dashed">Placeholder</span>
          </h3>
          <p className="caption-meta">{media.note}</p>
        </div>
      </div>
    </article>
  );
}
