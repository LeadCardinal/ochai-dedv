
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Phone, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate network request
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
          title: "Message sent successfully!",
          description: "Thanks for reaching out. I'll get back to you within 24 hours.",
          action: <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>,
        });
        setFormData({ name: '', email: '', message: '' });
      }, 1500);
    } else {
      toast({
        variant: "destructive",
        title: "Please check the form",
        description: "Some fields are missing or invalid.",
      });
    }
  };

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
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ready to transform your ideas into reality? Get in touch and let's discuss your next project.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Primary Contact: WhatsApp */}
            <a 
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
            </a>

            {/* Secondary Contact: Email */}
            <a 
              href="mailto:jeremy@ochai.dev"
              className="block bg-slate-900/50 hover:bg-slate-800 transition-colors backdrop-blur-sm border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-8 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">Email</h3>
                  <p className="text-slate-400 break-all text-lg font-medium group-hover:text-white transition-colors">jeremy@ochai.dev</p>
                </div>
              </div>
            </a>
            
            <div className="bg-slate-900/30 border border-slate-800/50 rounded-xl p-6">
              <p className="text-sm text-slate-400 italic">
                "Based in Huntsville, AL, I operate on Central Time but capable of supporting global infrastructures 24/7."
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 space-y-6"
            noValidate
          >
            <div>
              <label htmlFor="name" className="block text-slate-300 mb-2 font-medium">Name <span className="text-red-400">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-cyan-500'}`}
                placeholder="Your name"
                required
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-slate-300 mb-2 font-medium">Email <span className="text-red-400">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-cyan-500'}`}
                placeholder="your.email@example.com"
                required
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-slate-300 mb-2 font-medium">Message <span className="text-red-400">*</span></label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 bg-slate-800/50 border rounded-xl text-white placeholder-slate-500 focus:outline-none transition-colors resize-none ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-700 focus:border-cyan-500'}`}
                placeholder="Tell me about your project..."
                required
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white py-6 text-lg group disabled:opacity-70"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
