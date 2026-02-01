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

    // If we are not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/");
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // If we are already on home, just scroll
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navItems = [
    { label: "About", id: "about" },
    { label: "Bio", route: "/biography" },
    { label: "Contact", id: "contact" },
    { label: "Projects", id: "projects" },
    { label: "Technologies", id: "technologies" },
  ];

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
            src="https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/HEADER_LOGO_SMALL.webp"
            alt="Jeremy Och Portfolio"
            className="h-[50px] w-[250px] object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => 
            item.route ? (
              <Link key={item.route} to={item.route}>
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-slate-300 hover:text-white transition-colors cursor-pointer inline-block"
                >
                  {item.label}
                </motion.span>
              </Link>
            ) : (
              <motion.button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </motion.button>
            )
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 gap-2"
              >
                Case Studies <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-900 border-slate-800 text-white">
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <Link to="/case-study/reallivebonsai" className="w-full">
                  reallivebonsai.us
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <Link to="/case-study/hsvdrone" className="w-full">
                  hsvdrone.com
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-slate-800 focus:text-cyan-400 cursor-pointer">
                <Link to="/case-study/themeaningsoflife" className="w-full">
                  themeaningsoflife.com
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            asChild
            className="ml-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg group"
          >
            <a
              href="https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/JeremyOch_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              Resume{" "}
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
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
              {navItems.map((item) => 
                item.route ? (
                  <Link
                    key={item.route}
                    to={item.route}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-left text-slate-300 hover:text-white transition-colors py-2 text-lg"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className="text-left text-slate-300 hover:text-white transition-colors py-2 text-lg"
                  >
                    {item.label}
                  </button>
                )
              )}
              <div className="h-px bg-slate-800 my-2"></div>
              <p className="text-sm font-semibold text-slate-400 uppercase">
                Case Studies
              </p>
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
                  href="https://inlanltghistyetrlprg.supabase.co/storage/v1/object/public/Site%20Media/JeremyOch_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2"
                >
                  Download Resume{" "}
                  <Download className="w-4 h-4 group-hover:scale-110 transition-transform" />
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
