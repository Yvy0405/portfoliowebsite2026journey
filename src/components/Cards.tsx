import { awardById, awardsSection, educationById, projectById, workSection } from '../content/portfolio';
import type { ChapterItem } from '../content/journey';
import { useDialog } from '../lib/dialog';
import { Img } from './Img';
import { GradCap, RamenBowl, Trophy } from './vehicles/Icons';

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

/** Large case-study card used inside journey chapters (mockup “TN Ebike” card). */
export function CaseStudyCard({ id }: { id: string }) {
  const p = projectById(id);
  const { open } = useDialog();
  return (
    <article className="card case-card" aria-labelledby={`cs-${id}`}>
      <header className="case-card-head">
        <p className="kicker kicker-coral">Case study · {p.timeline}</p>
        <h3 id={`cs-${id}`} className="card-title-xl">{p.title}</h3>
        <p className="role-line">{p.role}</p>
        <p className="card-excerpt">{p.description}</p>
      </header>
      <button type="button" className="card-media case-card-media" onClick={() => open('project', id)} aria-label={`Open ${p.title} case study`}>
        <Img image={p.image} sizes="(min-width: 1024px) 560px, 90vw" />
      </button>
      <footer className="card-foot">
        <span className="card-foot-meta">{p.company}</span>
        <button type="button" className="btn btn-secondary btn-small" onClick={() => open('project', id)}>
          View case study <span aria-hidden="true">↗</span>
        </button>
      </footer>
    </article>
  );
}

/** Compact project card for the Work destination. */
export function ProjectTile({ id }: { id: string }) {
  const p = projectById(id);
  const { open } = useDialog();
  return (
    <article className="card project-tile" aria-labelledby={`pt-${id}`}>
      <button type="button" className="card-media" onClick={() => open('project', id)} aria-label={`Open ${p.title} case study`}>
        <Img image={p.image} sizes="(min-width: 1024px) 320px, 90vw" />
      </button>
      <div className="card-body">
        <p className="kicker">{p.timeline}</p>
        <h3 id={`pt-${id}`} className="card-title">{p.title}</h3>
        <p className="card-meta">{p.role}</p>
        <p className="card-excerpt">{p.description}</p>
        <div className="card-actions">
          <button type="button" className="btn btn-primary btn-small" onClick={() => open('project', id)}>
            {workSection.viewMore}
            <span className="sr-only"> about {p.title}</span>
          </button>
          {p.viewMoreHref && (
            <a className="btn btn-secondary btn-small" href={p.viewMoreHref} target="_blank" rel="noopener noreferrer">
              Behance <span aria-hidden="true">↗</span>
              {NEW_TAB}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Award card with a 3-photo collage. `full` shows the whole description. */
export function AwardCard({ id, feature, full }: { id: string; feature?: boolean; full?: boolean }) {
  const a = awardById(id);
  const { open } = useDialog();
  return (
    <article className={`card award-card${feature ? ' is-feature' : ''}`} aria-labelledby={`ac-${id}-${feature ? 'f' : full ? 'x' : 'c'}`}>
      <header className="award-card-head">
        {feature && <Trophy className="award-trophy" />}
        <p className="kicker kicker-blue">Award · {a.issued.split(' · ').pop()}</p>
        <h3 id={`ac-${id}-${feature ? 'f' : full ? 'x' : 'c'}`} className={feature ? 'card-title-xl' : 'card-title-lg'}>
          {a.title}
        </h3>
        <p className="card-meta">{a.issued}</p>
        <p className={feature || full ? 'card-text' : 'card-excerpt'}>{a.description}</p>
      </header>
      <div className="collage">
        {a.images.map((img, i) => (
          <button key={img.slug} type="button" className="card-media" onClick={() => open('award', id)} aria-label={`Open photo ${i + 1} of ${a.title}`}>
            <Img image={img} sizes={i === 0 ? '(min-width: 1024px) 360px, 60vw' : '(min-width: 1024px) 180px, 30vw'} />
          </button>
        ))}
      </div>
      <footer className="card-foot">
        <button type="button" className="btn btn-secondary btn-small" onClick={() => open('award', id)}>
          View photos & details
        </button>
        <a className="text-link" href={a.link.href} target="_blank" rel="noopener noreferrer">
          {awardsSection.readMore} <span aria-hidden="true">↗</span>
          {NEW_TAB}
        </a>
      </footer>
    </article>
  );
}

export function EducationCard({ id }: { id: string }) {
  const e = educationById(id);
  return (
    <article className="card small-card" aria-labelledby={`ec-${id}`}>
      <GradCap className="card-icon" />
      <p className="kicker kicker-blue">Education · {e.year}</p>
      <h3 id={`ec-${id}`} className="card-title">{e.school}</h3>
      <p className="card-text">{e.degree}</p>
      <p className="card-meta">{e.location}</p>
    </article>
  );
}

export function ChapterItemView({ item }: { item: ChapterItem }) {
  switch (item.kind) {
    case 'project':
      return <CaseStudyCard id={item.id} />;
    case 'award':
      return <AwardCard id={item.id} feature={item.feature} />;
    case 'education':
      return <EducationCard id={item.id} />;
    case 'milestone':
      return (
        <article className="card small-card" aria-labelledby={`mc-${item.id}`}>
          {item.icon === 'ramen' ? <RamenBowl className="card-icon" /> : <GradCap className="card-icon" />}
          <p className="kicker kicker-mint">Milestone</p>
          <h3 id={`mc-${item.id}`} className="card-title">{item.title}</h3>
          <p className="card-meta">{item.meta}</p>
          {item.text && <p className="card-text">{item.text}</p>}
        </article>
      );
    case 'placeholder':
      return (
        <article className="card placeholder-card" aria-labelledby={`ph-${item.id}`}>
          <header className="case-card-head">
            <p className="kicker"><span className="tag-dashed">Editable placeholder</span></p>
            <h3 id={`ph-${item.id}`} className="card-title-xl">{item.title}</h3>
            <p className="card-meta">{item.note}</p>
          </header>
          <div className="placeholder-tiles" aria-hidden="true">
            {Array.from({ length: item.tiles }, (_, i) => (
              <span key={i}>Project image {i + 1}</span>
            ))}
          </div>
        </article>
      );
  }
}
