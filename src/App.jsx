import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import SkillsSection from "./components/sections/SkillsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import AchievementsSection from "./components/sections/AchievementsSection";
import Footer from "./components/layout/Footer";
import AumpiousCompanion from "./components/aumpious/AumpiousCompanion";
import ToastNotification, { useToast } from "./components/common/ToastNotification";
import ResumeModal from "./components/common/ResumeModal";
import ContactModal from "./components/common/ContactModal";
import CustomCursor from "./components/common/CustomCursor";
import StarfieldBackground from "./components/background/StarfieldBackground";import "./styles/index.css";

export default function App() {
  const { toastMessage, setToastMessage, copyEmail } = useToast();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="v-root">
      <CustomCursor />
      <StarfieldBackground />
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        onCopyEmail={copyEmail}
      />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
      <Navbar onGetInTouch={() => setContactOpen(true)} />
      <main>
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AchievementsSection />
      </main>
      <Footer onGetInTouch={() => setContactOpen(true)} />
      <AumpiousCompanion />
    </div>
  );
}
