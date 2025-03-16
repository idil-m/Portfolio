// src/components/layout/navbar.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ModeToggle } from '@/components/mode-toggle';
import { useNavigation } from '@/contexts/NavigationContext';

// src/config/navigationConfig.ts
import { SectionId } from '@/contexts/NavigationContext';

// Define the navigation link interface
export interface NavigationLink {
  name: string;
  path: string;
  sectionId: SectionId;
}

// Define all navigation links
export const navigationLinks: NavigationLink[] = [
  { name: 'Home', path: '/', sectionId: 'home' },
  { name: 'Projects', path: '/projects', sectionId: 'projects' },
  { name: 'Skills', path: '/skills', sectionId: 'skills' },
  { name: 'Contact', path: '/contact', sectionId: 'contact' },
];



export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { activeSection, navigateToSection } = useNavigation();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle navigation click
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navigationLinks[0]) => {
    e.preventDefault();
    navigateToSection(link.sectionId, link.path);
    setIsMenuOpen(false);
  };
  
  return (
    <>
      <motion.nav 
        className={`sticky top-4 left-0 right-0 z-50 ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-lg border-border shadow-sm' 
            : 'bg-background/60'
        } transition-all duration-300 mx-auto px-4 sm:px-6 lg:px-8 rounded-xl border max-w-7xl w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)]`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="text-foreground font-medium tracking-tight text-lg"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, navigationLinks[0])}
            >
              Idil<span className="text-primary">.</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-1 py-1 text-sm transition-colors duration-150 ${
                    activeSection === link.sectionId
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Resume button */}
            <a
              href="/resume.pdf" // Adjust this to your actual resume path
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center h-8 px-4 text-sm font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors duration-150"
            >
              Resume
            </a>
            
            {/* Dark mode toggle */}
            <ModeToggle />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-150 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu, show/hide based on menu state */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border/50">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`block px-3 py-2 text-sm transition-colors duration-150 ${
                      activeSection === link.sectionId
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, link)}
                  >
                    {link.name}
                  </Link>
                ))}
                <a
                  href="/resume.pdf" // Adjust this to your actual resume path
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-colors duration-150"
                >
                  Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      
      {/* Offset for fixed navbar */}
      <div className="h-24"></div>
    </>
  );
}


// Create a path to section ID mapping for the Navigation Provider
export const pathToSectionIdMap: Record<string, SectionId> = 
  navigationLinks.reduce((acc, link) => ({
    ...acc,
    [link.path]: link.sectionId
  }), {});

// Create a section ID to path mapping for navigation
export const sectionIdToPathMap: Record<SectionId, string> = 
  navigationLinks.reduce((acc, link) => ({
    ...acc,
    [link.sectionId]: link.path
  }), {});