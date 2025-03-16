// src/components/Section.tsx
import React, { useRef, useEffect } from 'react';
import { SectionId, useNavigation } from '@/contexts/NavigationContext';

interface SectionProps {
  id: SectionId;
  className?: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, className = '', children }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { registerSection } = useNavigation();

  useEffect(() => {
    if (sectionRef.current) {
      registerSection(id, sectionRef.current);
    }
  }, [id, registerSection]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`min-h-screen py-16 ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;