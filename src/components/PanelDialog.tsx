import { useEffect, useRef } from 'react';
import { awardById, awardsSection, projectById, workSection } from '../content/portfolio';
import { asset } from '../lib/assets';
import { useDialog } from '../lib/dialog';
import { Img } from './Img';

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

/**
 * Accessible case-study / award panel built on the native <dialog> element:
 * showModal() makes the page behind it inert and traps focus, Escape closes
 * it, and focus returns to the element that opened it (see lib/dialog.tsx).
 * Page scroll is locked, not changed, so the journey keeps its position.
 */
export function PanelDialog() {
  const { target, close } = useDialog();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (target && !dlg.open) {
      dlg.showModal();
      dlg.scrollTop = 0;
      document.documentElement.classList.add('has-dialog');
    } else if (!target && dlg.open) {
      dlg.close();
    }
  }, [target]);

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    const onClose = () => {
      document.documentElement.classList.remove('has-dialog');
      close();
    };
    dlg.addEventListener('close', onClose);
    return () => dlg.removeEventListener('close', onClose);
  }, [close]);

  return (
    <dialog
      ref={ref}
      className="panel"
      aria-labelledby="panel-title"
      onClick={(e) => {
        // click on the backdrop (outside the panel body) closes it
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      {target && (
        <div className="panel-inner">
          <div className="panel-bar">
            <button type="button" className="btn btn-secondary btn-small panel-back" onClick={() => ref.current?.close()} autoFocus>
              <span aria-hidden="true">←</span> Back
            </button>
            <button type="button" className="panel-close" onClick={() => ref.current?.close()}>
              <span aria-hidden="true">×</span>
              <span className="sr-only">Close</span>
            </button>
          </div>
          {target.type === 'project' ? <ProjectPanel id={target.id} /> : <AwardPanel id={target.id} />}
        </div>
      )}
    </dialog>
  );
}

function ProjectPanel({ id }: { id: string }) {
  const p = projectById(id);
  return (
    <article className="panel-content">
      <header className="panel-head">
        <img className="panel-logo" src={asset(p.logo.src)} alt={p.logo.alt} height="44" />
        <p className="card-eyebrow">Case study · {p.timeline}</p>
        <h2 id="panel-title" className="panel-title">
          {p.title}
        </h2>
        <p className="panel-lead">{p.description}</p>
      </header>
      <dl className="panel-meta">
        <div>
          <dt>Role</dt>
          <dd>{p.role}</dd>
        </div>
        <div>
          <dt>Company</dt>
          <dd>{p.company}</dd>
        </div>
        <div>
          <dt>Timeline</dt>
          <dd>{p.timeline}</dd>
        </div>
      </dl>
      <figure className="panel-figure">
        <Img image={p.image} sizes="(min-width: 960px) 880px, 100vw" />
      </figure>
      <section aria-labelledby="panel-resp" className="panel-section">
        <h3 id="panel-resp">Responsibilities &amp; results</h3>
        <ul className="bullets">
          {p.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>
      {p.extraSections.map((s) => (
        <section key={s.heading} className={`panel-section${s.placeholder ? ' is-placeholder' : ''}`}>
          {s.placeholder && <span className="tag tag-outline">Editable placeholder</span>}
          <h3>{s.heading}</h3>
          <p>{s.body}</p>
        </section>
      ))}
      <div className="panel-links">
        {p.viewMoreHref && (
          <a className="btn btn-primary" href={p.viewMoreHref} target="_blank" rel="noopener noreferrer">
            {workSection.viewMore} on Behance <span aria-hidden="true">↗</span>
            {NEW_TAB}
          </a>
        )}
        <a className="btn btn-secondary" href={p.website.href} target="_blank" rel="noopener noreferrer">
          {p.website.label} <span aria-hidden="true">↗</span>
          {NEW_TAB}
        </a>
      </div>
    </article>
  );
}

function AwardPanel({ id }: { id: string }) {
  const a = awardById(id);
  return (
    <article className="panel-content">
      <header className="panel-head">
        <p className="card-eyebrow">Award &amp; achievement</p>
        <h2 id="panel-title" className="panel-title">
          {a.title}
        </h2>
        <p className="panel-issued">{a.issued}</p>
        <p className="panel-lead">{a.description}</p>
      </header>
      <div className="panel-gallery">
        {a.images.map((img) => (
          <figure key={img.slug} className="panel-figure">
            <Img image={img} sizes="(min-width: 960px) 880px, 100vw" />
          </figure>
        ))}
      </div>
      <div className="panel-links">
        <a className="btn btn-primary" href={a.link.href} target="_blank" rel="noopener noreferrer">
          {awardsSection.readMore} <span aria-hidden="true">↗</span>
          {NEW_TAB}
        </a>
      </div>
    </article>
  );
}
