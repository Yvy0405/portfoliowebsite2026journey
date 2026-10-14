import { awards, awardsSection, contact, education, educationSection, footer, projects, workSection } from '../content/portfolio';
import { asset } from '../lib/assets';
import { useDialog } from '../lib/dialog';
import { Img } from './Img';

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>;

/** “Work” – direct access to every project without going through the journey. */
export function WorkIndex() {
  const { open } = useDialog();
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <header className="section-header">
          <h2 id="work-title">{workSection.heading}</h2>
          <p>{workSection.subheading}</p>
        </header>
        <ul className="work-grid">
          {projects.map((p) => (
            <li key={p.id} className="card work-card">
              <button type="button" className="card-media" onClick={() => open('project', p.id)} aria-label={`Open ${p.title} case study`}>
                <Img image={p.image} sizes="(min-width: 1100px) 340px, (min-width: 640px) 45vw, 92vw" />
              </button>
              <div className="card-body">
                <p className="card-eyebrow">{p.timeline}</p>
                <h3 className="card-title">{p.title}</h3>
                <p className="card-meta">{p.role}</p>
                <p className="card-excerpt">{p.description}</p>
                <div className="card-actions">
                  <button type="button" className="btn btn-primary btn-small" onClick={() => open('project', p.id)}>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AwardsSection() {
  const { open } = useDialog();
  return (
    <section id="awards" className="section section-alt" aria-labelledby="awards-title">
      <div className="container">
        <header className="section-header">
          <h2 id="awards-title">{awardsSection.heading}</h2>
        </header>
        <div className="awards-list">
          {awards.map((a) => (
            <article key={a.id} className="card award-row" aria-labelledby={`aw-${a.id}`}>
              <div className="award-row-gallery">
                {a.images.map((img, i) => (
                  <button key={img.slug} type="button" className="card-media" onClick={() => open('award', a.id)} aria-label={`Open photo ${i + 1} of ${a.title}`}>
                    <Img image={img} sizes="(min-width: 1024px) 200px, 30vw" />
                  </button>
                ))}
              </div>
              <div className="card-body">
                <h3 id={`aw-${a.id}`} className="card-title">{a.title}</h3>
                <p className="card-meta">{a.issued}</p>
                <p className="card-text">{a.description}</p>
                <a className="text-link" href={a.link.href} target="_blank" rel="noopener noreferrer">
                  {awardsSection.readMore} <span aria-hidden="true">↗</span>
                  {NEW_TAB}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationSection() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <header className="section-header">
          <h2 id="education-title">{educationSection.heading}</h2>
        </header>
        <ul className="edu-list">
          {education.map((e) => (
            <li key={e.id} className="edu-row">
              <div>
                <h3 className="card-title">{e.school}</h3>
                <p className="card-text">{e.degree}</p>
              </div>
              <div className="edu-row-meta">
                <span className="edu-year">{e.year}</span>
                <span className="card-meta">{e.location}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="resume-cta">
          <a href={asset(educationSection.resumeHref)} className="btn btn-primary" target="_blank" rel="noopener">
            {educationSection.resumeLabel}
            {NEW_TAB}
          </a>
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section section-alt" aria-labelledby="contact-title">
      <div className="container">
        <header className="section-header">
          <h2 id="contact-title">{contact.heading}</h2>
        </header>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Email</h3>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className="contact-card">
            <h3>LinkedIn</h3>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              {contact.linkedin}
              {NEW_TAB}
            </a>
          </div>
          <div className="contact-card">
            <h3>Location</h3>
            <p>{contact.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {footer.owner}. {footer.rights}
        </p>
        <a className="text-link" href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
