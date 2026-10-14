import { useEffect, useState } from 'react';
import { person } from '../content/portfolio';

const NAV = [
  { id: 'about', label: 'About', match: (id: string) => id === 'about' },
  { id: 'journey', label: 'Journey', match: (id: string) => id === 'journey' || id.startsWith('chapter-') },
  { id: 'work', label: 'Work', match: (id: string) => id === 'work' },
  { id: 'awards', label: 'Awards', match: (id: string) => id === 'awards' },
  { id: 'education', label: 'Education', match: (id: string) => id === 'education' },
];

type Props = { active: string; onNavigate: (id: string) => void };

/** Fixed top navigation – jumps directly between horizontal destinations. */
export function Header({ active, onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header className="site-header">
      <a className="skip-link" href="#work">
        Skip to work
      </a>
      <button type="button" className="logo" onClick={() => go('about')} aria-label={`${person.fullName} — About`}>
        <span className="logo-mark" aria-hidden="true">
          {person.logoMark}
        </span>
        <span className="logo-text">{person.fullName}</span>
      </button>
      <nav aria-label="Primary" className="nav">
        <button type="button" className="nav-toggle" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((o) => !o)}>
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="sr-only">Menu</span>
        </button>
        <ul id="nav-menu" className={`nav-menu${open ? ' is-open' : ''}`}>
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} aria-current={n.match(active) ? 'location' : undefined} onClick={() => setOpen(false)}>
                {n.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" aria-current={active === 'contact' ? 'location' : undefined} onClick={() => setOpen(false)}>
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
