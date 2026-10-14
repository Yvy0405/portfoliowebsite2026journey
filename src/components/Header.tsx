import { useEffect, useState } from 'react';
import { person } from '../content/portfolio';

const NAV = [
  { href: '#journey', label: 'Journey' },
  { href: '#work', label: 'Work' },
  { href: '#awards', label: 'Awards' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#top" className="logo" aria-label={`${person.fullName} — back to top`}>
          <span className="logo-mark" aria-hidden="true">{person.logoMark}</span>
          <span className="logo-text">{person.fullName}</span>
        </a>
        <nav aria-label="Primary" className="nav">
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="sr-only">Menu</span>
          </button>
          <ul id="nav-menu" className={`nav-menu${open ? ' is-open' : ''}`}>
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
