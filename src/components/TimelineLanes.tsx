import { activities, activityById, currentYM, laneLabels, spanOf, toMonths } from '../content/timeline';

type Props = {
  from: string;
  to: string | 'present';
  /** Activity ids to show. Defaults to every activity overlapping the window. */
  ids?: string[];
  caption?: string;
  className?: string;
  /** Explain the bar styles (year-only dates, unspecified dates, ongoing). */
  legend?: boolean;
};

/**
 * Compact parallel-lane timeline. Each activity gets its own row so concurrent
 * work, study and venture read as overlapping bars rather than a sequence.
 */
export function TimelineLanes({ from, to, ids, caption, className, legend }: Props) {
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
      {caption && <figcaption className="lanes-caption">{caption}</figcaption>}
      <ul className="lanes-rows">
        {list.map((a) => {
          const s = spanOf(a)!;
          const left = pct(s.start);
          const ongoing = a.end === 'present';
          return (
            <li key={a.id} className={`lanes-row lane-${a.lane}`}>
              <span className="lanes-label">
                {a.label}
                <span className="sr-only">
                  {' '}({laneLabels[a.lane]}): {a.dateLabel}
                </span>
              </span>
              <span className="lanes-track" aria-hidden="true">
                {a.point ? (
                  <span className="lanes-point" style={{ left }} title={`${a.label} · ${a.dateLabel}`} />
                ) : (
                  <span
                    className={`lanes-bar${a.precision === 'unspecified' ? ' is-unspecified' : ''}${a.precision === 'year' ? ' is-year' : ''}${ongoing ? ' is-ongoing' : ''}`}
                    style={{ left, width: `calc(${pct(s.end)} - ${left})` }}
                    title={`${a.label} · ${a.dateLabel}`}
                  />
                )}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="lanes-axis" aria-hidden="true">
        <span className="lanes-label" />
        <span className="lanes-track">
          {years.map((y) => (
            <span key={y} className="lanes-tick" style={{ left: pct(y * 12) }}>
              {y}
            </span>
          ))}
        </span>
      </div>
      {legend && (
        <ul className="lanes-legend">
          <li><span className="lanes-swatch lane-study" /> Study</li>
          <li><span className="lanes-swatch lane-work" /> Work</li>
          <li><span className="lanes-swatch lane-venture" /> Venture</li>
          <li><span className="lanes-swatch lane-life is-unspecified" /> Part-time, dates not specified</li>
          <li><span className="lanes-swatch is-diamond" /> Award / milestone</li>
          <li><span className="lanes-swatch is-year" /> Dashed ends: only the year is given</li>
          <li><span className="lanes-swatch is-ongoing" /> Fading end: ongoing</li>
        </ul>
      )}
    </figure>
  );
}
