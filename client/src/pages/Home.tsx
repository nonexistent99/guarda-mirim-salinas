import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import EnrollmentStatusSection from "@/components/sections/EnrollmentStatusSection";
import AboutSection from "@/components/sections/AboutSection";
import ImportanceSection from "@/components/sections/ImportanceSection";
import TimelineSection from "@/components/sections/TimelineSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <EnrollmentStatusSection />
        <TimelineSection />
        <AboutSection />
        <ImportanceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
