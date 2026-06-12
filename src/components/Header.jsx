import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (id) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/images/newheaderlogo.webp"
            alt="OchAI — Jeremy Och"
            width={250}
            height={75}
            className="h-[75px] w-[250px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          {/* Services — client funnel */}
          <Link to="/services">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors cursor-pointer inline-block"
            >
              Services
            </motion.span>
          </Link>

          {/* Showcase */}
          <Link to="/showcase">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer inline-block"
            >
              Showcase
            </motion.span>
          </Link>

          {/* Work — Global Media Portfolio sphere */}
          <Link to="/logos">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-300 hover:text-white transition-colors cursor-pointer inline-block"
            >
              Work
            </motion.span>
          </Link>

          {/* Contact */}
          <motion.button
            onClick={() => handleNavigation("contact")}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="text-slate-300 hover:text-white transition-colors"
          >
            Contact
          </motion.button>

          {/* About dropdown — consolidates Bio, Projects, Technologies, Case Studies */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors"
              >
                More <ChevronDown className="w-4 h-4" />
              </motion.button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white min-w-[180px]">
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <button onClick={() => handleNavigation("More")} className="w-full text-left">
                  About
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <button onClick={() => { setIsMobileMenuOpen(false); navigate("/biography"); }} className="w-full text-left">Bio</button>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <button onClick={() => handleNavigation("projects")} className="w-full text-left">
                  Projects
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <button onClick={() => handleNavigation("technologies")} className="w-full text-left">
                  Technologies
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-slate-800" />
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer text-xs text-slate-500 pointer-events-none">
                Case Studies
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <button onClick={() => { setIsMobileMenuOpen(false); navigate("/case-study/reallivebonsai"); }} className="w-full text-left">reallivebonsai.us</button>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <button onClick={() => { setIsMobileMenuOpen(false); navigate("/case-study/hsvdrone"); }} className="w-full text-left">hsvdrone.com</button>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <button onClick={() => { setIsMobileMenuOpen(false); navigate("/case-study/themeaningsoflife"); }} className="w-full text-left">themeaningsoflife.com</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Resume CTA */}
          <Button
            asChild
            className="ml-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg group"
          >
            <a
              href="/images/JeremyOch_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Resume <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="absolute top-full left-0 right-0 bg-slate-950/98 backdrop-blur-md md:hidden min-h-screen shadow-2xl"
          >
            <div className="flex flex-col p-4 gap-4">
              <Link
                to="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-emerald-400 hover:text-emerald-300 font-medium transition-colors py-2 text-lg"
              >
                Services
              </Link>
              <Link
                to="/showcase"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-slate-300 hover:text-white transition-colors py-2 text-lg"
              >
                Showcase
              </Link>
              <Link
                to="/logos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-slate-300 hover:text-white transition-colors py-2 text-lg"
              >
                Work
              </Link>
              <button
                onClick={() => handleNavigation("contact")}
                className="text-left text-slate-300 hover:text-white transition-colors py-2 text-lg"
              >
                Contact
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">More</p>
              <button
                onClick={() => handleNavigation("More")}
                className="text-left text-slate-300 hover:text-white transition-colors py-2 text-lg pl-4 border-l-2 border-slate-800"
              >
                About
              </button>
              <Link
                to="/biography"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-slate-300 hover:text-white transition-colors py-2 text-lg pl-4 border-l-2 border-slate-800"
              >
                Bio
              </Link>
              <button
                onClick={() => handleNavigation("projects")}
                className="text-left text-slate-300 hover:text-white transition-colors py-2 text-lg pl-4 border-l-2 border-slate-800"
              >
                Projects
              </button>
              <button
                onClick={() => handleNavigation("technologies")}
                className="text-left text-slate-300 hover:text-white transition-colors py-2 text-lg pl-4 border-l-2 border-slate-800"
              >
                Technologies
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Case Studies</p>
              <Link
                to="/case-study/reallivebonsai"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-cyan-400 font-medium py-2 text-lg pl-4 border-l-2 border-slate-800 hover:border-cyan-500 transition-colors"
              >
                reallivebonsai.us
              </Link>
              <Link
                to="/case-study/hsvdrone"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-cyan-400 font-medium py-2 text-lg pl-4 border-l-2 border-slate-800 hover:border-cyan-500 transition-colors"
              >
                hsvdrone.com
              </Link>
              <Link
                to="/case-study/themeaningsoflife"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-cyan-400 font-medium py-2 text-lg pl-4 border-l-2 border-slate-800 hover:border-cyan-500 transition-colors"
              >
                themeaningsoflife.com
              </Link>
              <Button
                asChild
                className="mt-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg group"
              >
                <a
                  href="/images/JeremyOch_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Download Resume <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
