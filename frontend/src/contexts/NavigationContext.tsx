// src/contexts/NavigationContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Generic section ID type that can be extended by the application
export type SectionId = string;

interface NavigationContextType {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
  scrollToSection: (sectionId: SectionId) => void;
  navigateToSection: (sectionId: SectionId, path: string) => void;
  inViewport: (sectionId: SectionId) => boolean;
  registerSection: (sectionId: SectionId, element: HTMLElement) => void;
  pathToSectionId: Record<string, SectionId>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
  // Pass the path mapping as a prop instead of hardcoding it
  pathMap: Record<string, SectionId>;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ 
  children, 
  pathMap
}) => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [sectionRefs, setSectionRefs] = useState<Record<SectionId, HTMLElement>>({});
  const [sectionInView, setSectionInView] = useState<Record<SectionId, boolean>>({});
  
  const location = useLocation();
  const navigate = useNavigate();

  // Register section refs
  const registerSection = useCallback((sectionId: SectionId, element: HTMLElement) => {
    setSectionRefs(prev => ({ ...prev, [sectionId]: element }));
  }, []);

  // Smooth scroll to a section
  const scrollToSection = useCallback((sectionId: SectionId) => {
    const element = sectionRefs[sectionId];
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [sectionRefs]);

  // Navigate to a section's route and scroll to it
  const navigateToSection = useCallback((sectionId: SectionId, path: string) => {
    navigate(path);
    scrollToSection(sectionId);
  }, [navigate, scrollToSection]);

  // Check if a section is in the viewport
  const inViewport = useCallback((sectionId: SectionId) => {
    return sectionInView[sectionId] || false;
  }, [sectionInView]);

  // Find the section ID from the current path
  const getSectionIdFromPath = useCallback((path: string): SectionId => {
    return pathMap[path] || Object.values(pathMap)[0]; // Default to first section
  }, [pathMap]);

  // Update active section based on URL changes
  useEffect(() => {
    const currentPath = location.pathname;
    const sectionId = getSectionIdFromPath(currentPath);
    setActiveSection(sectionId);
    
    // Only scroll on initial load or direct URL access
    if (!location.state || location.state.scrollToSection !== false) {
      scrollToSection(sectionId);
    }
  }, [location, scrollToSection, getSectionIdFromPath]);

  // Set up intersection observers to detect which sections are visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -40% 0px', // Adjusted to account for navbar
      threshold: 0.1,
    };

    // Find sectionId by path
    const getSectionPathById = (sectionId: SectionId): string | undefined => {
      
      return Object.entries(pathMap).find(([, id]) => id === sectionId)?.[0];
    };

    Object.entries(sectionRefs).forEach(([sectionId, element]) => {
      if (element) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            setSectionInView(prev => ({
              ...prev,
              [sectionId]: entry.isIntersecting,
            }));
            
            // Update the active section and URL when scrolling
            if (entry.isIntersecting) {
              const path = getSectionPathById(sectionId);
              if (path && location.pathname !== path) {
                // Update URL without scrolling
                navigate(path, { replace: true, state: { scrollToSection: false } });
                setActiveSection(sectionId);
              }
            }
          });
        }, observerOptions);
        
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sectionRefs, navigate, location.pathname, pathMap]);

  return (
    <NavigationContext.Provider
      value={{
        activeSection,
        setActiveSection,
        scrollToSection,
        navigateToSection,
        inViewport,
        registerSection,
        pathToSectionId: pathMap
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};