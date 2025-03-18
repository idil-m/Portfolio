import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
export default function ContactCTA() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const socialLinks = [
    { name: 'Email', icon: <MdEmail />, href: 'mailto:mahamed.idil@gmail.com', color: 'text-primary' },
    { name: 'GitHub', icon: <FaGithub />, href: 'https://github.com/idil-m', color: 'text-foreground' },
    { name: 'LinkedIn', icon: <FaLinkedin />, href: 'https://linkedin.com/in/idil-mahamed/', color: 'text-[#0A66C2]' },
   
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Initialize EmailJS with your User ID
      // Note: In production, set this up once in your main component or _app.js
      emailjs.init({
        publicKey: 'jycLgnNK27Z7iZgMg',
      });
      
      // Send the email using EmailJS
      const result = await emailjs.send(
        "service_ooqrphj", // EmailJS service ID
        "template_f9e7gok", // EmailJS template ID
        {
          name: formData.name,
          email: formData.email,
          message: formData.message
        }
      );
      
      console.log("Email sent successfully:", result);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative">
      {/* Add EmailJS script */}
      
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 bg-gradient-to-r from-primary/40 to-primary/20 blur-3xl"></div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Left Column - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Let's Work Together</h2>
            
            <p className="text-muted-foreground mb-8">
              I'm currently available for freelance work and open to discussing new opportunities. Whether you have a project in mind or just want to connect, I'd love to hear from you.
            </p>
            
            <div className="space-y-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-card border border-border/50 ${link.color}`}>
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-card border border-border/40 rounded-lg p-6 md:p-8 backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                {submitStatus === 'success' && (
                  <div className="bg-green-500/10 border border-green-500/30 text-green-500 rounded-md p-3 text-sm">
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-md p-3 text-sm">
                    There was an error sending your message. Please try again or email me directly.
                  </div>
                )}
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name" 
                    required
                    className="bg-card/50 border-border/60 focus-visible:ring-primary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com" 
                    required
                    className="bg-card/50 border-border/60 focus-visible:ring-primary/30"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or inquiry..." 
                    rows={4}
                    required
                    className="bg-card/50 border-border/60 focus-visible:ring-primary/30"
                  />
                </div>
                
                <Button 
                  className="w-full mt-2" 
                  size="lg" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <motion.span
                      className="inline-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Message
                    </motion.span>
                  )}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center mt-4">
                  I'll respond to your message as soon as possible.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}