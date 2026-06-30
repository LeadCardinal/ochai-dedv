
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Mail, label: 'Email', url: 'mailto:jeremy@ochai.dev' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/jeremy-och-ai-full-stack' },
    { icon: Twitter, label: 'Twitter', url: 'https://x.com/@OchAI_fullstack' }
  ];

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-8">
          
          {/* Logo moved from header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/logo1.webp" 
              alt="Logo" 
              width={64}
              height={64}
              className="h-16 w-auto drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
            />
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex gap-6"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-800/50 hover:bg-cyan-500/20 border border-slate-700 hover:border-cyan-500/50 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-slate-300 hover:text-cyan-400 transition-colors" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Proof link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <a href="/#case-studies" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">
              The work speaks first if you need it to &rarr;
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-slate-300 text-sm"
          >
            © {currentYear} OchAI — Jeremy Och. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
