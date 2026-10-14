import { clients, hero, person } from '../content/portfolio';
import { asset } from '../lib/assets';
import { Img } from './Img';
import { Vehicle } from './vehicles/Vehicle';

export function Hero() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="hero-name">
              {person.fullName} <span aria-hidden="true">·</span> <span className="hero-short">{person.shortName}</span>
            </p>
            <h1 id="hero-title" className="hero-title">
              {hero.title}
            </h1>
            <p className="hero-intro">
              {hero.intro.map((part, i) => (part.strong ? <strong key={i}>{part.text}</strong> : <span key={i}>{part.text}</span>))}
            </p>
            <div className="hero-ctas">
              <a href="#work" className="btn btn-primary">
                {hero.ctaPrimary}
              </a>
              <a href="#contact" className="btn btn-secondary">
                {hero.ctaSecondary}
              </a>
            </div>
            <ul className="hero-highlights">
              {hero.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <ul className="focus-tags" aria-label="Professional focus">
              {person.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className="hero-media">
            <Img image={person.portrait} sizes="(min-width: 1024px) 440px, 80vw" eager className="hero-photo" />
          </div>
        </div>
        <div className="container hero-entry">
          <a href="#journey" className="scroll-cue">
            <Vehicle kind="motorcycle" className="scroll-cue-vehicle" title="" />
            <span>
              <strong>Scroll to explore</strong> <span aria-hidden="true">→</span>
              <span className="scroll-cue-sub">From Vietnam to Toronto — the journey so far</span>
            </span>
          </a>
        </div>
      </section>

      <section className="clients" aria-labelledby="clients-title">
        <div className="container">
          <h2 id="clients-title" className="clients-title">
            {clients.heading}
          </h2>
          <ul className="clients-logos">
            {clients.logos.map((l) => (
              <li key={l.name}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  <img src={asset(l.src)} alt={`${l.name} (opens in a new tab)`} loading="lazy" decoding="async" height="110" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
