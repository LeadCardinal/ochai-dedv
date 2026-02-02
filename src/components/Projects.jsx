import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Layers, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      title: "themeaningsoflife.com",
      category: "Philosophy & AI",
      description:
        'A masterpiece of optimization. Achieving perfect 100/100 scores in Accessibility and SEO with 95 Performance, this site defines the modern "Top 1%" standard.',
      // Replaced with Supabase URL
      image:
        "https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/ProjectMeanings.avif",
      tags: ["React", "Top 1% Global", "Perfect SEO"],
      link: "/case-study/themeaningsoflife",
      liveUrl: "https://themeaningsoflife.com",
      highlight: true,
    },
    {
      title: "Real Live Bonsai",
      category: "E-Commerce",
      description:
        "A high-performance e-commerce experience showcasing delicate bonsai trees with rich media without sacrificing load speeds.",
      // Replaced with Supabase URL
      image:
        "https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/ProjectBonsai.avif",
      tags: ["E-Commerce", "Performance", "UX Design"],
      link: "/case-study/reallivebonsai",
      liveUrl: "https://reallivebonsai.us",
      highlight: false,
    },
    {
      title: "HSV Drone",
      category: "Service Portfolio",
      description:
        "Professional drone photography portfolio featuring high-resolution galleries optimized for instant viewing on mobile networks.",
      // Replaced with Supabase URL
      image:
        "https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/ProjectDrone.avif",
      tags: ["Media Heavy", "Optimization", "Gallery"],
      link: "/case-study/hsvdrone",
      liveUrl: "https://hsvdrone.com",
      highlight: false,
    },
  ];

  return (
    <section className="py-24 bg-slate-950 text-white" id="projects">
      <div className="container mx-auto px-4">
        {/* Intro Section - Updated context */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Featured Case Studies
            </h2>

            <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 mb-6 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                  <Layers className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Integrated Operations in Action
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    These aren't just coding projects. Each case study
                    demonstrates the full "Integrated Digital Operator" chain:
                    <span className="text-blue-400 font-medium">
                      {" "}
                      Build → Optimize → Market → Automate → Measure → Deploy →
                      Iterate.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-lg inline-flex">
              <Trophy className="w-4 h-4" />
              <span className="text-sm font-bold">
                All projects engineered to Top 1% Performance Standards
              </span>
            </div>
          </div>

          <Link
            to="/#contact"
            className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors group self-end mb-2"
          >
            Start your project{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-600 transition-all duration-300 flex flex-col h-full hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div className="relative h-64 overflow-hidden">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 cursor-pointer"
                  title="Visit the site"
                >
                  <span className="sr-only">Visit {project.title}</span>
                </a>
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors z-10 pointer-events-none" />
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 pointer-events-none"
                />

                {/* Overlay Icon on Hover */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 bg-slate-900/80 backdrop-blur-sm rounded-full border border-slate-700 text-white">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wider">
                  {project.category}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline decoration-cyan-400 decoration-2 underline-offset-4"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-slate-800 text-slate-300 text-xs rounded border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to={project.link}
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors font-medium text-sm border border-slate-700"
                    >
                      View Case Study
                    </Link>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-3 bg-slate-800 hover:bg-cyan-600 hover:text-white text-cyan-400 rounded-xl transition-colors font-medium border border-slate-700 hover:border-cyan-500"
                      title="Visit the site"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            Start your project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
