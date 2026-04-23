import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { useTheme } from "../Hooks/useTheme";
import { 
  FaLeaf, 
  FaCloudSunRain, 
  FaBug, 
  FaLandmark, 
  FaBars, 
  FaTimes,
  FaSun,
  FaMoon
} from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isDark, toggleTheme } = useTheme();
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const navItems = [
        { name: "Soil Analysis", path: "/soil", icon: <FaLeaf /> },
        { name: "Irrigation", path: "/weather", icon: <FaCloudSunRain /> },
        { name: "Pest Detection", path: "/pest", icon: <FaBug /> },
        { name: "Govt. Schemes", path: "/govt-schemes", icon: <FaLandmark /> },
    ];

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`w-full z-50 fixed top-0 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-background/90 backdrop-blur-xl shadow-lg shadow-primary/5 border-b border-border' 
                    : 'bg-transparent border-b border-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                {/* Logo */}
                <motion.div 
                    onClick={() => navigate('/')} 
                    className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <motion.div 
                        className="relative overflow-hidden rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-primary/10 group-hover:bg-primary/20 transition-colors"
                        whileHover={{ rotate: 10 }}
                    >
                        <img className="w-6 h-6 sm:w-8 sm:h-8 object-contain" src="https://i.ibb.co/V0zgCvRg/Krishi-Mitra.png" alt="Logo" />
                    </motion.div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary tracking-tight transition-colors drop-shadow-md">
                        KrishiMitra
                    </h1>
                </motion.div>

                {/* Desktop Nav + Theme Toggle */}
                <div className="hidden lg:flex items-center gap-3">
                    <div className="flex items-center relative bg-background/80 backdrop-blur-md border border-border/50 shadow-sm rounded-full p-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <motion.button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/30"
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        {item.icon}
                                        <span className="hidden xl:inline">{item.name}</span>
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Theme Toggle */}
                    <motion.button
                        onClick={toggleTheme}
                        className="relative w-10 h-10 rounded-full bg-background/80 backdrop-blur-md border border-border/50 shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    >
                        <AnimatePresence mode="wait">
                            {isDark ? (
                                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <FaSun className="w-4 h-4 text-amber-400" />
                                </motion.div>
                            ) : (
                                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <FaMoon className="w-4 h-4 text-indigo-500" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile: Theme + Hamburger */}
                <div className="lg:hidden flex items-center gap-2">
                    <motion.button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 shadow-sm hover:bg-muted transition-colors text-foreground"
                        whileTap={{ scale: 0.85, rotate: 180 }}
                    >
                        {isDark ? <FaSun size={18} className="text-amber-400" /> : <FaMoon size={18} className="text-indigo-500" />}
                    </motion.button>
                    <motion.button
                        className="p-2 rounded-xl bg-background/80 backdrop-blur-md border border-border/50 shadow-sm hover:bg-muted transition-colors text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.85, rotate: 90 }}
                    >
                        {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
                    >
                        <div className="px-4 py-3 flex flex-col space-y-1">
                            {navItems.map((item, i) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <motion.button
                                        key={item.path}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08, type: "spring", stiffness: 300 }}
                                        className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                                            isActive 
                                                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                        }`}
                                        onClick={() => {
                                            navigate(item.path);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        {item.icon}
                                        {item.name}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;