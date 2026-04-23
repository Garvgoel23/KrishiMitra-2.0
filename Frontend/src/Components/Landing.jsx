import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Chat from "../ChatBot/Chat.jsx";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import TiltCard from "../components/ui/TiltCard";
import PageTransition from "../components/ui/PageTransition";
import { FaLeaf, FaCloudSunRain, FaBug, FaRobot, FaArrowRight, FaChevronDown, FaStar, FaLandmark } from "react-icons/fa";

const features = [
    {
        title: "Soil Analysis",
        description: "Deep-dive into your soil's nutrient profile. Our ML model predicts fertility levels so you can choose the ideal crop.",
        icon: <FaLeaf className="w-8 h-8" />,
        path: "/soil",
        color: "from-emerald-500 to-green-700",
        image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "Irrigation Advice",
        description: "Intelligent water management. Get localized crop recommendations based on weather data and soil characteristics.",
        icon: <FaCloudSunRain className="w-8 h-8" />,
        path: "/weather",
        color: "from-blue-500 to-cyan-600",
        image: "https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&q=80&w=600"
    },
    {
        title: "Pest Detection",
        description: "Snap a photo, get instant diagnosis. Our computer vision model identifies crop diseases and pests in seconds.",
        icon: <FaBug className="w-8 h-8" />,
        path: "/pest",
        color: "from-red-500 to-orange-600",
        image: "/pest_feature.webp"
    },
    {
        title: "Govt. Schemes",
        description: "Stay updated with the latest agricultural subsidies, grants and government programs designed for farmers.",
        icon: <FaLandmark className="w-8 h-8" />,
        path: "/govt-schemes",
        color: "from-violet-500 to-purple-700",
        image: "/schemes_feature.png"
    }
];

const stats = [
    { label: "Soil Parameters", value: "12+", icon: <FaLeaf /> },
    { label: "Pest Classes", value: "38", icon: <FaBug /> },
    { label: "Weather Metrics", value: "5+", icon: <FaCloudSunRain /> },
    { label: "Govt Schemes", value: "10+", icon: <FaStar /> },
];

const Landing = () => {
    const navigate = useNavigate();
    const [botDisplay, setBotDisplay] = useState(false);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background font-sans overflow-x-hidden relative z-10">
                <Navbar />
                
                {/* Chatbot FAB */}
                <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50">
                    <AnimatePresence>
                        {botDisplay && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                className="absolute bottom-16 right-0 mb-4 shadow-2xl rounded-2xl overflow-hidden"
                            >
                                <Chat handleChatDisplay={setBotDisplay} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    
                    <motion.button
                        className="w-14 h-14 rounded-full shadow-xl bg-primary text-primary-foreground flex items-center justify-center glow-btn"
                        onClick={() => setBotDisplay(prev => !prev)}
                        whileHover={{ scale: 1.15, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        animate={{ boxShadow: botDisplay ? "0 0 30px hsl(154 45% 25% / 0.5)" : "0 4px 20px rgba(0,0,0,0.2)" }}
                    >
                        <FaRobot className="w-6 h-6" />
                    </motion.button>
                </div>

                {/* ===== HERO SECTION ===== */}
                <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
                    {/* Video BG */}
                    <motion.div className="absolute inset-0 z-0" style={{ y: heroY }}>
                        <iframe 
                            className="w-[200vw] h-[200vh] sm:w-[160vw] sm:h-[160vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                            src="https://www.youtube.com/embed/kQWAXuP0pik?autoplay=1&mute=1&loop=1&controls=0&playlist=kQWAXuP0pik&showinfo=0&rel=0&modestbranding=1"
                            title="video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                            referrerPolicy="strict-origin-when-cross-origin" 
                        ></iframe>
                        <div className="absolute inset-0 bg-black/55"></div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
                    </motion.div>

                    <motion.div 
                        style={{ opacity: heroOpacity }}
                        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20 pb-10"
                    >
                        {/* Badge */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium mb-6"
                        >
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                                <FaLeaf />
                            </motion.div>
                            <span>AI-Powered Precision Farming</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
                        >
                            Cultivate Success with{" "}
                            <span className="text-shimmer">KrishiMitra</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto leading-relaxed mt-4 sm:mt-6"
                        >
                            Boost your harvest with cutting-edge soil analysis, smart irrigation, and advanced pest detection. The future of farming starts here.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                    size="lg" 
                                    className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full shadow-lg shadow-primary/30 glow-btn w-full sm:w-auto" 
                                    onClick={() => navigate('/soil')}
                                >
                                    Start Analyzing <FaArrowRight className="ml-2" />
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button 
                                    size="lg" 
                                    variant="outline" 
                                    className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full bg-white/10 hover:bg-white/25 text-white border-white/30 backdrop-blur-md w-full sm:w-auto" 
                                    onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Explore Features
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Scroll indicator */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="mt-10 sm:mt-16 scroll-indicator"
                        >
                            <FaChevronDown className="mx-auto text-white/50 text-xl" />
                        </motion.div>
                    </motion.div>
                </section>

                {/* ===== STATS BAR ===== */}
                <section className="relative z-10 -mt-12 sm:-mt-16 px-4 sm:px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto bg-card/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-border shadow-2xl shadow-primary/5 p-4 sm:p-6"
                    >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                            {stats.map((stat, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    className="text-center p-3 sm:p-4 rounded-xl hover:bg-primary/5 transition-colors cursor-default"
                                >
                                    <div className="text-primary text-lg sm:text-xl mb-1 flex justify-center">{stat.icon}</div>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">{stat.value}</h3>
                                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* ===== FEATURES SECTION ===== */}
                <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7 }}
                            className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4"
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                                Smart Tools for{" "}
                                <span className="text-shimmer">Smart Farmers</span>
                            </h2>
                            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                                End-to-end solutions combining weather insights, computer vision, and expert agronomic guidance.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                            {features.map((feature, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: idx * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="h-full"
                                >
                                    <TiltCard className="h-full">
                                        <Card className="overflow-hidden h-full flex flex-col border-border/50 bg-card cursor-pointer group" onClick={() => navigate(feature.path)}>
                                            {/* Image */}
                                            <div className="relative h-40 sm:h-48 overflow-hidden">
                                                <img 
                                                    src={feature.image} 
                                                    alt={feature.title} 
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                                
                                                {/* Floating icon badge */}
                                                <motion.div 
                                                    className={`absolute bottom-3 left-3 bg-gradient-to-br ${feature.color} p-3 rounded-2xl shadow-lg text-white`}
                                                    whileHover={{ rotate: 12, scale: 1.1 }}
                                                >
                                                    {feature.icon}
                                                </motion.div>
                                            </div>

                                            {/* Content */}
                                            <CardHeader className="pt-4 sm:pt-5 pb-1">
                                                <CardTitle className="text-lg sm:text-xl text-foreground font-bold group-hover:text-primary transition-colors">
                                                    {feature.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-1 flex flex-col justify-between pb-5">
                                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                                    {feature.description}
                                                </p>
                                                <motion.div 
                                                    className="flex items-center gap-2 text-primary font-semibold text-sm"
                                                    whileHover={{ x: 5 }}
                                                >
                                                    Explore <FaArrowRight className="text-xs" />
                                                </motion.div>
                                            </CardContent>
                                        </Card>
                                    </TiltCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </PageTransition>
    );
};

export default Landing;