import type { MotionValue } from 'motion/react';
import type { VehicleKind } from '../../content/journey';
import { Airplane } from './Airplane';
import { Bus } from './Bus';
import { Car } from './Car';
import { Motorcycle } from './Motorcycle';

export const vehicleNames: Record<VehicleKind, string> = {
  motorcycle: 'Yellow motorcycle',
  airplane: 'Airplane',
  bus: 'Red TTC bus',
  car: 'Car',
};

type Props = {
  kind: VehicleKind;
  /** Scroll-driven wheel rotation in degrees. */
  spin?: MotionValue<number>;
  className?: string;
  /** Accessible label. Pass '' for a purely decorative vehicle. */
  title?: string;
};

/** Renders one of the four journey vehicles, each carrying the same face sticker. */
export function Vehicle({ kind, spin, className, title }: Props) {
  const label = title ?? `${vehicleNames[kind]} with Y Vy’s face sticker`;
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true as const };
  return (
    <svg viewBox="0 0 260 160" className={className} {...a11y} overflow="visible">
      {kind === 'motorcycle' && <Motorcycle spin={spin} />}
      {kind === 'airplane' && <Airplane />}
      {kind === 'bus' && <Bus spin={spin} />}
      {kind === 'car' && <Car spin={spin} />}
    </svg>
  );
}
