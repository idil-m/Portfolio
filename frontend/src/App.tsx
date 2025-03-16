// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar, { NavigationLink } from "@/components/layout/navbar";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Skills from "@/pages/skills";
import Footer from "@/components/layout/footer";
import ContactCTA from "@/pages/contact-cta";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationProvider } from "@/contexts/NavigationContext";
import Section from "@/components/layout/section";
import { navigationLinks, pathToSectionIdMap } from "@/components/layout/navbar";

import "./index.css";

function MainLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-grow w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Section id="home">
            <Home />
          </Section>
          <Section id="projects">
            <Projects />
          </Section>
          <Section id="skills">
            <Skills />
          </Section>
          <Section id="contact">
            <ContactCTA />
          </Section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <NavigationProvider pathMap={pathToSectionIdMap}>
          <Routes>
            {/* Generate routes dynamically from navigation config */}
            {navigationLinks.map((link: NavigationLink) => (
              <Route key={link.path} path={link.path} element={<MainLayout />} />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </NavigationProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;