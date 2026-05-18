import { FaPhoneAlt, FaEnvelope, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
    return (
        <footer className="w-full bg-background text-foreground py-10 flex flex-col items-center justify-center space-y-3 mt-auto border-t border-border/20 shadow-inner">
            {/* Logo Text */}
            <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl sm:text-7xl tracking-tight text-primary font-serif italic mb-2 hover:text-emerald-400 hover:drop-shadow-[0_0_12px_rgba(52,211,153,0.7)] transition-all duration-300 cursor-default"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
                KrishiMitra
            </motion.h1>

            {/* Subtitle */}
            <p className="text-[13px] sm:text-sm text-muted-foreground/80 text-center px-4 max-w-md italic -mt-1">
                AI-powered agricultural platform built with precision
            </p>

            {/* Built by */}
            <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground mt-3">
                <span>Built by</span>
                <a href="https://github.com/Garvgoel23" target="_blank" rel="noopener noreferrer" className="flex items-center hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-pointer">
                    <img src="https://github.com/Garvgoel23.png" alt="Garv Goel" className="w-6 h-6 rounded-full border border-border shadow-sm" />
                </a>
            </div>
            
            {/* Source Button */}
            <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/Garvgoel23/KrishiMitra-2.0" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border/60 bg-transparent hover:bg-muted text-foreground px-4 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm cursor-pointer mt-1"
            >
                <FaGithub className="w-3.5 h-3.5" /> Source
            </motion.a>

            {/* Contact Info */}
            <div className="flex flex-row items-center justify-center gap-5 sm:gap-8 text-xs text-muted-foreground pt-4">
                <a href="tel:+919810085872" className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                    <FaPhoneAlt className="w-3 h-3 opacity-70" /> +91 98100 85872
                </a>
                <a href="mailto:goelgarv99@gmail.com" className="flex items-center gap-1.5 hover:text-primary transition-colors cursor-pointer">
                    <FaEnvelope className="w-3 h-3 opacity-70" /> goelgarv99@gmail.com
                </a>
            </div>

            {/* Copyright */}
            <div className="text-[11px] text-muted-foreground/40 pt-2">
                &copy; {new Date().getFullYear()} All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
