import { forwardRef } from 'react';
import { motion } from 'motion/react';
import type { Chapter } from '../content/journey';
import { contact, educationSection } from '../content/portfolio';
import { asset } from '../lib/assets';
import { ChapterItemView } from './Cards';
import { TimelineLanes } from './TimelineLanes';
import { Vehicle } from './vehicles/Vehicle';

type Props = {
  chapter: Chapter;
  index: number;
  total: number;
  mode: 'horizontal' | 'stacked';
  onReplay: () => void;
};

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
};

/** One journey chapter. The same markup serves the horizontal and stacked layouts. */
export const ChapterView = forwardRef<HTMLElement, Props>(function ChapterView({ chapter, index, total, mode, onReplay }, ref) {
  const headingId = `chapter-${chapter.id}-title`;
  return (
    <section
      ref={ref}
      id={`chapter-${chapter.id}`}
      className={`chapter chapter-${chapter.id}${chapter.variant ? ` chapter-${chapter.variant}` : ''}`}
      aria-labelledby={headingId}
      data-index={index}
    >
      <div className="chapter-intro">
        <p className="chapter-eyebrow">
          <span className="chapter-num">
            {String(index + 1).padStart(2, '0')}
            <span className="sr-only"> of {total}</span>
          </span>
          {chapter.eyebrow.replace(/^Chapter \d+\s*·?\s*/, '')}
        </p>
        {mode === 'stacked' && <Vehicle kind={chapter.vehicle} className="chapter-vehicle-static" />}
        <h2 id={headingId} className="chapter-title" tabIndex={-1}>
          {chapter.title}
        </h2>
        {chapter.place && <p className="chapter-place">{chapter.place}</p>}
        {chapter.lead && <p className="chapter-lead">{chapter.lead}</p>}
        {chapter.ongoing && (
          <p className="chapter-ongoing">
            <span className="ongoing-dot" aria-hidden="true" /> Ongoing: {chapter.ongoing.join(' · ')}
          </p>
        )}
        {chapter.lanes && chapter.variant !== 'finale' && (
          <TimelineLanes from={chapter.lanes.from} to={chapter.lanes.to} ids={chapter.lanes.highlight} className="lanes-compact" />
        )}
      </div>

      {chapter.variant === 'travel' && <TravelScene />}

      {chapter.variant === 'finale' && (
        <div className="finale">
          <motion.div className="finale-timeline" {...reveal}>
            <TimelineLanes from="2020-01" to="present" caption="The whole journey, with overlapping activities in parallel" legend />
          </motion.div>
          <motion.div className="finale-actions" {...reveal}>
            <a className="btn btn-primary" href={`mailto:${contact.email}`}>
              Email {contact.email}
            </a>
            <a className="btn btn-secondary" href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a className="btn btn-secondary" href={asset(educationSection.resumeHref)} target="_blank" rel="noopener">
              {educationSection.resumeLabel}
            </a>
            <div className="finale-links">
              <a className="text-link" href="#work">
                See all work <span aria-hidden="true">↓</span>
              </a>
              <button type="button" className="text-link replay" onClick={onReplay}>
                <span aria-hidden="true">↺</span> Start the journey over
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {chapter.items.length > 0 && (
        <div className="chapter-items">
          {chapter.items.map((item) => (
            <motion.div key={item.id} className={`chapter-item item-${item.kind}${'feature' in item && item.feature ? ' item-feature' : ''}`} {...reveal}>
              <ChapterItemView item={item} />
            </motion.div>
          ))}
        </div>
      )}
      {chapter.variant !== 'travel' && <div className="chapter-road" aria-hidden="true" />}
    </section>
  );
});

/** Restrained flight scene: dotted route between two labelled points. */
function TravelScene() {
  return (
    <div className="travel" aria-hidden="true">
      <svg className="travel-route" viewBox="0 0 600 200" preserveAspectRatio="none">
        <path d="M10 190 C 160 20, 440 20, 590 190" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className="travel-stop travel-from">
        <span className="travel-pin" />
        Vietnam
      </div>
      <div className="travel-stop travel-to">
        <img src={asset('assets/img/canada-480.webp')} alt="" width="40" height="40" />
        Canada
      </div>
    </div>
  );
}
