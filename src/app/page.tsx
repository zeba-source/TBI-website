
"use client";

import { useState } from 'react';
import MainNavbar from '@/components/ui/main-navbar';
import Footer from '@/components/ui/footer';
import HeroSection from '@/components/sections/hero-section';
import FeaturesSection from '@/components/sections/features-section';
import RcoemAboutSection from '@/components/sections/rcoem-about-section';
import TeamSection from '@/components/sections/team-section';
import FeaturedStartupsSection from '@/components/sections/featured-startups-section';
import ModernTestimonialsSection from '@/components/sections/modern-testimonials-section';
import RcoemSplashScreen from '@/components/sections/rcoem-splash-screen';
import ApplicationFormDialog from '@/components/ui/application-form-dialog';

export default function HomePage() {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const handleOpenApplicationForm = () => {
    // Ensure off-campus users are still handled correctly if they reach here.
    const campusStatusFromStorage = typeof window !== "undefined" ? localStorage.getItem('applicantCampusStatus') as "campus" | "off-campus" | null : null;
    if (campusStatusFromStorage === "off-campus") {
      // This case should ideally be handled before calling this, 
      // e.g. in HeroSection, but as a fallback:
      window.location.href = 'https://docs.google.com/forms/d/1WNPpTVLahffQ_n3rdDbnsVFjcXrKqslVFyk4Lmib2uo/viewform?edit_requested=true';
      return;
    }
    setIsApplicationFormOpen(true);
  };

  const handleSplashComplete = () => {
    setShowMainContent(true);
  };

  // Show splash screen first, then main content
  if (!showMainContent) {
    return (
      <RcoemSplashScreen onComplete={handleSplashComplete}>
        <div className="flex flex-col min-h-screen bg-background font-poppins">
          <MainNavbar onApplyClick={handleOpenApplicationForm} />
          <main className="flex-grow">
            <HeroSection onApplyClick={handleOpenApplicationForm} />
            <FeaturesSection />
            <RcoemAboutSection />
            <TeamSection />
            <FeaturedStartupsSection />
            <ModernTestimonialsSection />
          </main>
          <Footer />
          <ApplicationFormDialog 
            open={isApplicationFormOpen} 
            onOpenChange={setIsApplicationFormOpen} 
          />
        </div>
      </RcoemSplashScreen>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background font-poppins">
      <MainNavbar onApplyClick={handleOpenApplicationForm} /> {/* Pass handler to Navbar */}
      <main className="flex-grow">
        <HeroSection onApplyClick={handleOpenApplicationForm} />
        <FeaturesSection />
        <RcoemAboutSection />
        <TeamSection />
        <FeaturedStartupsSection />
        <ModernTestimonialsSection />
      </main>
      <Footer />
      <ApplicationFormDialog 
        open={isApplicationFormOpen} 
        onOpenChange={setIsApplicationFormOpen} 
      />
    </div>
  );
}
