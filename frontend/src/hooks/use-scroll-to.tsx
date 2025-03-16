import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A custom hook that handles smooth scrolling to sections based on the current route
 */
export default function useScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    // Get section ID from the pathname
    const sectionId = location.pathname === '/' 
      ? 'home' 
      : location.pathname.slice(1); // Remove leading slash
    
    // Wait a bit for any pending DOM updates
    const timeoutId = setTimeout(() => {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          // Get navbar height for offset (assuming 96px, adjust as needed)
          const navbarHeight = 96;
          
          // Calculate the target position with offset
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
          
          // Smooth scroll to the element with offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }, 100);
    
    return () => clearTimeout(timeoutId);
  }, [location]);
}