import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Ready to transform your ideas into reality? Get in touch and let's discuss your next project.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Primary Contact: WhatsApp */}
          <motion.a 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            href="https://wa.me/12563619056"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-green-600 hover:bg-green-500 transition-colors border border-green-500 rounded-2xl p-8 shadow-lg group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">WhatsApp Me</h3>
                <p className="text-green-50 font-medium">Instant Response • Primary Contact</p>
                <p className="text-white text-lg font-bold mt-1 tracking-wide">256-361-9056</p>
              </div>
            </div>
          </motion.a>

          {/* Secondary Contact: Email */}
          <motion.a 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            href="mailto:jeremy@ochai.dev"
            className="block bg-slate-900/50 hover:bg-slate-800 transition-colors backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 group cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">Email</h3>
                <p className="text-slate-300 break-all text-lg font-medium group-hover:text-white transition-colors">jeremy@ochai.dev</p>
              </div>
            </div>
          </motion.a>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-8"
        >
          <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-6 text-center">
            <p className="text-sm text-slate-300 italic">
              "Based in Huntsville, AL, I operate on Central Time but capable of supporting global infrastructures 24/7."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
