import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { PanelDialog } from './components/PanelDialog';
import { AwardsSection, ContactSection, EducationSection, Footer, WorkIndex } from './components/Sections';
import { DialogProvider } from './lib/dialog';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <DialogProvider>
        <span id="top" />
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <a className="skip-link" href="#work">
          Skip to work
        </a>
        <Header />
        <main id="content" tabIndex={-1}>
          <Hero />
          <Journey />
          <WorkIndex />
          <AwardsSection />
          <EducationSection />
          <ContactSection />
        </main>
        <Footer />
        <PanelDialog />
      </DialogProvider>
    </MotionConfig>
  );
}
