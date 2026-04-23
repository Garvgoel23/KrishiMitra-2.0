import govtSchemes from '../Utils/GovtSchemes.json';
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";
import TiltCard from "../components/ui/TiltCard";
import { FaLandmark, FaExternalLinkAlt, FaInfoCircle } from "react-icons/fa";

const GovtSchemes = () => {
    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background font-sans overflow-x-hidden relative z-10">
                <Navbar />
                
                <div className="flex-1 mt-20 sm:mt-24 mb-12 sm:mb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-8 sm:mb-12"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="w-16 h-16 sm:w-20 sm:h-20 bg-violet-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <FaLandmark className="w-8 h-8 sm:w-10 sm:h-10 text-violet-600" />
                        </motion.div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                            Government <span className="text-shimmer">Schemes</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 sm:mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                            Latest government initiatives, subsidies, and programs for the agricultural community.
                        </p>
                    </motion.div>

                    {/* Banner */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        whileHover={{ scale: 1.01 }}
                        className="mb-8 sm:mb-12 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-border group relative"
                    >
                        <a href="https://pmaymis.gov.in/PMAYMIS2_2024/PmayDefault.aspx" target="_blank" rel="noopener noreferrer" className="block relative">
                            <img
                                src="https://pmay-urban.gov.in/uploads/sliders/web/6731a0f95941e-PMAY-U_2.0_2.jpg"
                                className="w-full object-cover h-[180px] sm:h-[280px] md:h-[350px] transition-transform duration-700 group-hover:scale-105"
                                alt="PMAY Banner"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-4 sm:pb-6">
                                <motion.span 
                                    className="text-white font-semibold flex items-center gap-2 bg-black/50 px-4 sm:px-6 py-2 rounded-full backdrop-blur-md text-sm sm:text-base"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    Visit Official Portal <FaExternalLinkAlt />
                                </motion.span>
                            </div>
                        </a>
                    </motion.div>

                    {/* Schemes Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                        {govtSchemes.map((scheme, index) => (
                            <motion.div 
                                key={index} 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full"
                            >
                                <TiltCard className="h-full" intensity={10}>
                                    <Card className="h-full overflow-hidden group border-border/50 bg-card flex flex-col cursor-pointer">
                                        <div className="relative h-44 sm:h-52 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 transition-opacity duration-300 group-hover:from-black/90"></div>
                                            <img 
                                                src={scheme?.image_link || "https://images.unsplash.com/photo-1592982537447-6f2066c8fb73?auto=format&fit=crop&q=80"} 
                                                alt={scheme.scheme_name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1592982537447-6f2066c8fb73?auto=format&fit=crop&q=80"; e.target.onerror = null; }}
                                            />
                                            
                                            {/* Default Title */}
                                            <h3 className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white text-base sm:text-lg font-bold z-20 transition-all duration-400 group-hover:-translate-y-3 group-hover:opacity-0 drop-shadow-lg">
                                                {scheme.scheme_name}
                                            </h3>

                                            {/* Hover Details */}
                                            <div className="absolute inset-0 z-30 p-4 sm:p-6 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
                                                <h3 className="text-white text-sm sm:text-base font-bold mb-2">{scheme.scheme_name}</h3>
                                                <p className="text-white/85 text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-4 drop-shadow-lg">
                                                    {scheme.description}
                                                </p>
                                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                                    <Button asChild size="sm" variant="secondary" className="bg-white/20 hover:bg-white text-white hover:text-black border-none backdrop-blur-md text-xs sm:text-sm">
                                                        <a href={scheme.official_website} target="_blank" rel="noopener noreferrer">
                                                            <FaInfoCircle className="mr-1 sm:mr-2" /> Learn More
                                                        </a>
                                                    </Button>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </Card>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                <Footer />
            </div>
        </PageTransition>
    );
};

export default GovtSchemes;
