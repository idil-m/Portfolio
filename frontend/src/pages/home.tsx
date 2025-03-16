import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

import heroDark from "@/assets/hero-dark.png"
import heroColor from "@/assets/hero-color.png"

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full min-h-screen sm:px-6 lg:px-8 bg-background text-foreground overflow-hidden">
      {/* Content with consistent container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column - Text content */}
        <div className="relative">
          {/* Geometric accent - glowing gradient orb positioned behind content */}
          <motion.div 
            className="absolute top-1/2 -translate-y-1/2 left-30 w-96 h-96 rounded-full opacity-20 bg-gradient-to-r from-primary/40 to-primary/20 blur-3xl -z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.2, 0.3, 0.2], 
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut"
            }}
          ></motion.div>

          <motion.span 
            className="inline-block text-sm md:text-base text-primary font-medium mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Full-Stack Developer
          </motion.span>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hello, I'm Idil
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Specialized in Python, Django, and React. Building elegant solutions to complex problems.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button
              onClick={() => window.location.href = '#projects'}
            >
              View My Projects
            </Button>
            <Button
              variant={"outline"}
              onClick={() => window.location.href = '#contact'}
            >
              Contact Me
            </Button>
          </motion.div>
        </div>

        {/* Right column - Hero image */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-card/40 to-card/10 border border-border/50 backdrop-blur-sm overflow-hidden">
            <img 
              src={isDark ? heroDark : heroColor}
              alt="Hero illustration"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-2/3 h-24 border border-primary/20 rounded-2xl -z-10"></div>
          <div className="absolute -top-4 -left-4 w-24 h-24 border border-primary/10 rounded-2xl -z-10"></div>
        </motion.div>
      </div>
      
      {/* Bottom separator */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      ></motion.div>
    </div>
  );
}