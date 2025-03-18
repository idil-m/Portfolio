import React from 'react';
import { motion } from 'motion/react';
//import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { FaGithub, FaExternalLinkSquareAlt } from 'react-icons/fa';
import photo1 from "@/assets/photo1.jpg"
import photo2 from "@/assets/photo2.png"
import photo3 from "@/assets/photo3.jpg"
import photo4 from "@/assets/hero-color.png"

interface Project {
  id: number;
  title: string;
  description: string; 
  image: string;
  tags: string[];
  demoUrl?: string; // Made optional
  repoUrl?: string; // Made optional
  featured: boolean;
}

// Sample project data - replace with your actual projects
const projectsData: Project[] = [
  {
    id: 1,
    title: "SprouTd",
    description: "A mobile app for plant care with Flutter,Firebase, and OpenAI. Users receive AI-powered plant care tips and auto-generated reminders for watering,fertilizing, and repotting.The intuitive UI ensures easy plant tracking,and real-time data updates keep users engaged in their plant's health.",
    image: photo1,
    tags: [ "Flutter", "Firebase", "OpenAI", "GCP" ],
    demoUrl: "https://youtube.com/shorts/LivssUl1ZcA",
    featured: true
  },
  {
    id: 2,
    title: "Smart Tech",
    description: "An e-commerce platform with React, Node.js, and SQL. Users browse products by category, use AI- powered chat assistance, and make secure transactions via Stripe.  The platform also integrates an AI-powered chat assistance feature and a custom chat box powered by OpenAI, which can help answer any questions and guide users throughout their time on the website.",
    image: photo2,
    tags: ["Javascript", "PostgreSQL", "React", "Stripe", "OpenAI", "MaterialUI"],
    repoUrl: "https://github.com/idil-m/SmartTech",

    featured: true
  },
  {
    id: 3,
    title: "Photo Labs",
    description: "A single-page application desgned to offer a dynamic platform for phto exploration, leveraging React for teh front-end to ensure a seamless user interaction with photographic cintent. ",
    image: photo3,
    tags: ["JavaScript", "API Integration", "React", ],
    repoUrl: "https://github.com/idil-m/photolabs",
    featured: false
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "A personal portfolio website (this one!) showcasing my projects and skills, built with React and Tailwind CSS. Features a responsive design, dark mode support, smooth animations with Framer Motion, and optimized performance metrics.",
    image: photo4,
    tags: ["React", "Tailwind CSS", "Django", "Typescript"],
    demoUrl: "https://www.idil.ca",
    repoUrl: "https://github.com/idil-m/Portfolio",
    featured: false
  }
];

export default function Projects(): React.ReactElement {
  return (
    <section id="projects" className="py-24 bg-background relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            A selection of my recent work that showcases my technical expertise and problem-solving abilities.
          </motion.p>
        </div>
        
        {/* Projects - 2 column layout for larger screens */}
        <div className="space-y-16">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
        
       
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  isReversed?: boolean;
}

// Project Card Component - larger, more prominent
function ProjectCard({ project, isReversed = false }: ProjectCardProps): React.ReactElement {
  return (
    <motion.div 
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Project Image */}
      <div className={`relative order-1 ${isReversed ? 'md:order-2' : 'md:order-1'}`}>
        <motion.div 
          className="relative aspect-[4/3] rounded-lg overflow-hidden group border border-border/40 shadow-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-secondary/20">
              <span className="text-muted-foreground">No image available</span>
            </div>
          )}
          
          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Featured badge */}
          {project.featured && (
            <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-3 -right-3 w-2/3 h-16 border border-primary/20 rounded-lg -z-10 hidden md:block"></div>
        <div className="absolute -top-3 -left-3 w-16 h-16 border border-primary/10 rounded-lg -z-10 hidden md:block"></div>
      </div>
      
      {/* Project Content */}
      <div className={`order-2 ${isReversed ? 'md:order-1' : 'md:order-2'}`}>
        <h3 className="text-2xl font-bold mb-3 text-foreground">{project.title}</h3>
        <p className="text-muted-foreground mb-6">{project.description}</p>
        
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag: string, index: number) => (
            <span 
              key={index} 
              className="text-xs px-3 py-1 rounded-full bg-secondary/70 text-secondary-foreground border border-border/40"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Action Links */}
        <div className="flex space-x-6">
          {project.demoUrl && (
            <motion.a 
              href={project.demoUrl}
              className="flex items-center text-sm font-medium bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-md transition-colors"
              whileHover={{ x: 3 }}
            >
              Live Demo
              <FaExternalLinkSquareAlt className="ml-2 h-4 w-4" />
            </motion.a>
          )}
          {project.repoUrl && (
            <motion.a 
              href={project.repoUrl}
              className="flex items-center text-sm font-medium bg-secondary/50 hover:bg-secondary text-secondary-foreground px-4 py-2 rounded-md transition-colors"
              whileHover={{ x: 3 }}
            >
              Source Code
              <FaGithub className="ml-2 h-4 w-4" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}