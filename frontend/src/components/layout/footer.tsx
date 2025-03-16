import React from 'react';
import { motion } from 'motion/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Navigation",
      links: [
        { name: "Home", href: "#" },
        { name: "Projects", href: "#projects" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
      ]
    },
    {
      title: "Resources", 
      links: [
        { name: "Resume", href: "#resume" },
        { name: "Blog", href: "#blog" },
        { name: "Case Studies", href: "#case-studies" },
      ]
    }
  ];
  
  const socialLinks = [
    { name: "GitHub", href: "https://github.com", icon: <FaGithub className="w-5 h-5" /> },
    { name: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedin className="w-5 h-5" /> },
    { name: "Twitter", href: "https://twitter.com", icon: <FaTwitter className="w-5 h-5" /> },
    { name: "Email", href: "mailto:contact@example.com", icon: <MdEmail className="w-5 h-5" /> }
  ];
  
  return (
    <footer className="bg-card border-t border-border w-full">
      {/* Top divider with gradient */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <a href="#" className="inline-block text-foreground font-bold text-2xl mb-4">
              Idil<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground max-w-md">
              Full-stack developer specializing in creating elegant, efficient, and user-centered digital experiences with modern technologies.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Links sections */}
          {footerLinks.map((section) => (
            <div key={section.title} className="col-span-1">
              <h3 className="font-medium text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      whileHover={{ x: 3 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom section with copyright */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Idil. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}