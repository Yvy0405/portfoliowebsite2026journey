import { activities, activityById, currentYM, laneLabels, spanOf, toMonths } from '../content/timeline';

type Props = {
  from: string;
  to: string | 'present';
  /** Activity ids to show. Defaults to every activity overlapping the window. */
  ids?: string[];
  title?: string;
  className?: string;
  /** Explain the bar styles (year-only dates, unspecified dates, ongoing). */
  legend?: boolean;
};

/**
 * Parallel-lane timeline. Each activity gets its own row (name + exact source
 * date on the left, bar on the right) so concurrent work, study and venture
 * read as overlapping bars rather than a forced sequence.
 */
export function TimelineLanes({ from, to, ids, title, className, legend }: Props) {
  const start = toMonths(from);
  const end = toMonths(to === 'present' ? currentYM() : to) + 1;
  const range = end - start;
  const pct = (m: number) => `${(((Math.min(Math.max(m, start), end) - start) / range) * 100).toFixed(2)}%`;

  const list = (ids ? ids.map(activityById) : activities).filter((a) => {
    const s = spanOf(a);
    return s && s.end >= start && s.start <= end;
  });

  const years: number[] = [];
  for (let y = Math.ceil(start / 12); y * 12 <= end; y++) years.push(y);

  return (
    <figure className={`lanes ${className ?? ''}`}>
      {title && <figcaption className="lanes-title">{title}</figcaption>}
      <div className="lanes-body">
        <div className="lanes-grid" aria-hidden="true">
          {years.map((y) => (
            <span key={y} style={{ left: pct(y * 12) }} />
          ))}
        </div>
        <ul className="lanes-rows">
          {list.map((a) => {
            const s = spanOf(a)!;
            const left = pct(s.start);
            const ongoing = a.end === 'present';
            const cls = [
              'lanes-bar',
              a.precision === 'unspecified' && 'is-unspecified',
              a.precision === 'year' && 'is-year',
              ongoing && 'is-ongoing',
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <li key={a.id} className={`lanes-row lane-${a.lane}`}>
                <span className="lanes-label">
                  <span className="lanes-name">{a.label}</span>
                  <span className="lanes-date">{a.dateLabel}</span>
                  <span className="sr-only"> ({laneLabels[a.lane]})</span>
                </span>
                <span className="lanes-track" aria-hidden="true">
                  {a.point ? (
                    <span className="lanes-point" style={{ left }} />
                  ) : (
                    <span className={cls} style={{ left, width: `calc(${pct(s.end)} - ${left})` }} />
                  )}
                </span>
              </li>
            );
          })}
        </ul>
        <div className="lanes-axis" aria-hidden="true">
          <span />
          <span className="lanes-track">
            {years.map((y) => (
              <span key={y} className="lanes-tick" style={{ left: pct(y * 12) }}>
                {y}
              </span>
            ))}
          </span>
        </div>
      </div>
      {legend && (
        <ul className="lanes-legend">
          <li><span className="lanes-swatch lane-study" /> Study</li>
          <li><span className="lanes-swatch lane-work" /> Work</li>
          <li><span className="lanes-swatch lane-venture" /> Venture</li>
          <li><span className="lanes-swatch lane-life is-unspecified" /> Part-time, dates not specified</li>
          <li><span className="lanes-swatch is-diamond" /> Award / milestone</li>
          <li><span className="lanes-swatch lane-study is-year" /> Lighter: only the year is given</li>
          <li><span className="lanes-swatch lane-work is-ongoing" /> Fading end: ongoing</li>
        </ul>
      )}
    </figure>
  );
}
