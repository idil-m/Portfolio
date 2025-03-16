import React from 'react';
import { FaCode, FaServer, FaTools, FaReact, FaNodeJs, FaDocker, FaPython, FaDatabase, FaGit } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiJavascript, SiNextdotjs, SiExpress, SiPostgresql, SiMysql, SiGraphql } from "react-icons/si";
import { TbBrandCypress, TbBrandReactNative } from "react-icons/tb";
import { motion } from 'motion/react';

type SkillItem = {
  name: string;
  icon: React.ReactNode;
  color: string;
};

type SkillCategory = {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
};

export default function Skills() {
  // Skill categories with icons
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      icon: <FaCode />,
      skills: [
        { name: "React", icon: <FaReact />, color: "text-[#61DAFB]" },
        { name: "TypeScript", icon: <SiTypescript />, color: "text-[#007ACC]" },
        { name: "JavaScript", icon: <SiJavascript />, color: "text-[#F7DF1E]" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "text-foreground" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-[#38B2AC]" },
        { name: "React Native", icon: <TbBrandReactNative />, color: "text-[#61DAFB]" },
      ],
    },
    {
      title: "Backend",
      icon: <FaServer />,
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, color: "text-[#6FA660]" },
        { name: "Python", icon: <FaPython />, color: "text-[#3776AB]" },
        { name: "Express", icon: <SiExpress />, color: "text-foreground" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-[#336584]" },
        { name: "MySQL", icon: <SiMysql />, color: "text-[#4479A1]" },
        { name: "GraphQL", icon: <SiGraphql />, color: "text-[#E10098]" },
      ],
    },
    {
      title: "DevOps & Tools",
      icon: <FaTools />,
      skills: [
        { name: "Git", icon: <FaGit />, color: "text-[#F05030]" },
        { name: "Docker", icon: <FaDocker />, color: "text-[#2496ED]" },
        { name: "CI/CD", icon: <FaTools />, color: "text-foreground" },
        { name: "Databases", icon: <FaDatabase />, color: "text-foreground" },
        { name: "Cypress", icon: <TbBrandCypress />, color: "text-[#17202C]" },
        { name: "Testing", icon: <FaTools />, color: "text-foreground" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-background relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015] pointer-events-none"></div>
      
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Skills
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I'm proficient in a range of modern technologies for building robust, scalable, and user-friendly applications.
          </motion.p>
        </div>

        {/* Skills categories */}
        <div className="space-y-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 text-primary mr-3">
                  {category.icon}
                </span>
                <h3 className="text-xl font-medium text-foreground">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + (skillIndex * 0.05) }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-card/0 to-card/80 rounded-lg transform group-hover:scale-105 transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                    <div className="flex flex-col items-center justify-center rounded-lg p-6 bg-card/50 border border-border/40 backdrop-blur-sm group-hover:border-primary/20 transition-all duration-300 overflow-hidden relative">
                      <div className={`text-2xl ${skill.color} mb-3 transition-transform duration-300 group-hover:scale-110`}>
                        {skill.icon}
                      </div>
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Divider except for the last category */}
              {catIndex < skillCategories.length - 1 && (
                <div className="mt-12 border-t border-border/40"></div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
}