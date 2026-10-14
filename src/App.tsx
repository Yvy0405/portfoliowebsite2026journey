import { MotionConfig } from 'motion/react';
import { PanelDialog } from './components/PanelDialog';
import { Site } from './components/Site';
import { DialogProvider } from './lib/dialog';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DialogProvider>
        <Site />
        <PanelDialog />
      </DialogProvider>
    </MotionConfig>
  );
}
