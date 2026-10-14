import { awardById, educationById, projectById } from '../content/portfolio';
import type { ChapterItem } from '../content/journey';
import { useDialog } from '../lib/dialog';
import { Img } from './Img';
import { GradCap, RamenBowl, Trophy } from './vehicles/Icons';

const CARD_SIZES = '(min-width: 1024px) 320px, (min-width: 640px) 45vw, 92vw';

/** Project preview – excerpt only; the full original copy lives in the case-study panel. */
export function ProjectCard({ id }: { id: string }) {
  const p = projectById(id);
  const { open } = useDialog();
  return (
    <article className="card project-card" aria-labelledby={`pc-${id}`}>
      <button type="button" className="card-media" onClick={() => open('project', id)} aria-label={`Open ${p.title} case study`}>
        <Img image={p.image} sizes={CARD_SIZES} />
      </button>
      <div className="card-body">
        <p className="card-eyebrow">{p.timeline}</p>
        <h3 id={`pc-${id}`} className="card-title">{p.title}</h3>
        <p className="card-meta">{p.role}</p>
        <p className="card-excerpt">{p.description}</p>
        <div className="card-actions">
          <button type="button" className="btn btn-primary btn-small" onClick={() => open('project', id)}>
            View case study <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function AwardCard({ id, feature }: { id: string; feature?: boolean }) {
  const a = awardById(id);
  const { open } = useDialog();
  if (feature) {
    return (
      <article className="card award-feature" aria-labelledby={`ac-${id}`}>
        <div className="award-feature-photos">
          {a.images.map((img, i) => (
            <button key={img.slug} type="button" className="card-media" onClick={() => open('award', id)} aria-label={`Open photo ${i + 1} of ${a.title}`}>
              <Img image={img} sizes="(min-width: 1024px) 220px, 30vw" />
            </button>
          ))}
        </div>
        <div className="card-body award-feature-body">
          <Trophy className="award-trophy" />
          <p className="card-eyebrow">{a.issued}</p>
          <h3 id={`ac-${id}`} className="card-title card-title-lg">{a.title}</h3>
          <p className="card-text">{a.description}</p>
          <div className="card-actions">
            <button type="button" className="btn btn-primary btn-small" onClick={() => open('award', id)}>
              View photos & details
            </button>
            <a className="btn btn-secondary btn-small" href={a.link.href} target="_blank" rel="noopener noreferrer">
              {a.link.label} <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </article>
    );
  }
  return (
    <article className="card award-card" aria-labelledby={`ac-${id}`}>
      <button type="button" className="card-media" onClick={() => open('award', id)} aria-label={`Open ${a.title} details`}>
        <Img image={a.images[0]} sizes={CARD_SIZES} />
        <span className="media-badge">{a.images.length} photos</span>
      </button>
      <div className="card-body">
        <p className="card-eyebrow"><span className="tag tag-yellow">Award</span> {a.issued}</p>
        <h3 id={`ac-${id}`} className="card-title">{a.title}</h3>
        <p className="card-excerpt">{a.description}</p>
        <div className="card-actions">
          <button type="button" className="btn btn-secondary btn-small" onClick={() => open('award', id)}>
            View details
          </button>
        </div>
      </div>
    </article>
  );
}

export function EducationCard({ id }: { id: string }) {
  const e = educationById(id);
  return (
    <article className="card edu-card" aria-labelledby={`ec-${id}`}>
      <div className="card-body">
        <GradCap className="card-icon" />
        <p className="card-eyebrow"><span className="tag tag-blue">Education</span> {e.year}</p>
        <h3 id={`ec-${id}`} className="card-title">{e.school}</h3>
        <p className="card-text">{e.degree}</p>
        <p className="card-meta">{e.location}</p>
      </div>
    </article>
  );
}

export function ChapterItemView({ item }: { item: ChapterItem }) {
  switch (item.kind) {
    case 'project':
      return <ProjectCard id={item.id} />;
    case 'award':
      return <AwardCard id={item.id} feature={item.feature} />;
    case 'education':
      return <EducationCard id={item.id} />;
    case 'milestone':
      return (
        <article className="card milestone-card" aria-labelledby={`mc-${item.id}`}>
          <div className="card-body">
            {item.icon === 'ramen' && <RamenBowl className="card-icon" />}
            {item.icon === 'grad' && <GradCap className="card-icon" />}
            <p className="card-eyebrow"><span className="tag tag-mint">Milestone</span></p>
            <h3 id={`mc-${item.id}`} className="card-title">{item.title}</h3>
            <p className="card-meta">{item.meta}</p>
            {item.text && <p className="card-text">{item.text}</p>}
          </div>
        </article>
      );
    case 'placeholder':
      return (
        <article className="card placeholder-card" aria-labelledby={`ph-${item.id}`}>
          <div className="placeholder-media" aria-hidden="true">
            <span>Image placeholder</span>
          </div>
          <div className="card-body">
            <p className="card-eyebrow"><span className="tag tag-outline">Editable placeholder</span></p>
            <h3 id={`ph-${item.id}`} className="card-title">{item.title}</h3>
            <p className="card-meta">{item.note}</p>
          </div>
        </article>
      );
  }
}
