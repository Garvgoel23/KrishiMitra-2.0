import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import usePredictWeather from "../Hooks/usePredictWeather.js";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import TextField from '@mui/material/TextField';
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";
import { FaCloudSunRain, FaThermometerHalf, FaTint, FaSeedling, FaMapMarkerAlt, FaPalette, FaArrowRight, FaWater } from "react-icons/fa";

const WeatherPrediction = () => {
    const [isAnswered, setIsAnswered] = useState(false);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [soilColour, setSoilColour] = useState("");
    const [cityName, setCityName] = useState("");

    const getWeather = usePredictWeather();

    const handleSubmit = async () => {
        if (!soilColour || !cityName) { toast.error("Please fill in both fields"); return; }
        setIsLoading(true);
        const inputValues = { soil_color: soilColour, city: cityName };
        const res = await getWeather(inputValues);
        setIsLoading(false);
        if (res) { setIsAnswered(true); setResult(res); toast.success("Advice generated!"); }
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background font-sans overflow-x-hidden relative z-10">
                <Navbar />
                <Toaster position="top-right" />
                
                <div className="flex-1 mt-20 sm:mt-24 mb-12 sm:mb-16 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto w-full">
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="text-center mb-8 sm:mb-10"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <FaWater className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />
                        </motion.div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                            Smart Irrigation <span className="text-shimmer">Advice</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 sm:mt-3 max-w-xl mx-auto text-sm sm:text-base">
                            Personalized crop recommendations based on local weather and soil.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-start">
                        {/* Input */}
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                            <Card className="border-border shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                <CardHeader className="bg-gradient-to-r from-blue-500/5 to-transparent rounded-t-xl border-b border-border/50">
                                    <CardTitle className="text-xl sm:text-2xl text-blue-600 font-semibold flex items-center gap-2">
                                        <FaMapMarkerAlt /> Location & Soil
                                    </CardTitle>
                                    <CardDescription className="text-xs sm:text-sm">Provide your environment details.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="space-y-2">
                                        <h3 className="text-sm font-medium text-foreground flex items-center gap-2"><FaPalette className="text-primary"/> Soil Color</h3>
                                        <TextField fullWidth variant="outlined" placeholder="e.g. Red, Black, Yellow" value={soilColour}
                                            onChange={(e) => setSoilColour(e.target.value)}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&.Mui-focused fieldset': { borderColor: 'hsl(154 45% 25%)', borderWidth: '2px' } } }}
                                        />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-2">
                                        <h3 className="text-sm font-medium text-foreground flex items-center gap-2"><FaMapMarkerAlt className="text-primary"/> City Name</h3>
                                        <TextField fullWidth variant="outlined" placeholder="e.g. Pune, Delhi" value={cityName}
                                            onChange={(e) => setCityName(e.target.value)}
                                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', '&.Mui-focused fieldset': { borderColor: 'hsl(154 45% 25%)', borderWidth: '2px' } } }}
                                        />
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button className="w-full h-11 sm:h-12 text-base sm:text-lg shadow-lg shadow-primary/20 glow-btn mt-2" onClick={handleSubmit} disabled={isLoading}>
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                                                    Generating...
                                                </span>
                                            ) : (
                                                <>Get Advice <FaArrowRight className="ml-2" /></>
                                            )}
                                        </Button>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Results */}
                        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
                            <Card className="h-full border-border shadow-xl min-h-[350px] sm:min-h-[400px] flex flex-col">
                                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent rounded-t-xl border-b border-border/50">
                                    <CardTitle className="text-xl sm:text-2xl text-primary font-semibold flex items-center gap-2">
                                        <FaSeedling /> Recommendations
                                    </CardTitle>
                                    <CardDescription className="text-xs sm:text-sm">Localized crop and weather data.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-center text-center">
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                                                <div className="relative w-20 h-20">
                                                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                                                    <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                    <FaCloudSunRain className="absolute inset-0 m-auto w-8 h-8 text-blue-500 animate-pulse" />
                                                </div>
                                                <p className="text-muted-foreground animate-pulse">Fetching weather data...</p>
                                            </motion.div>
                                        ) : !isAnswered ? (
                                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                                    <FaCloudSunRain className="w-10 h-10 text-muted-foreground/40" />
                                                </motion.div>
                                                <h3 className="text-lg sm:text-xl font-medium text-muted-foreground">Waiting for Input</h3>
                                                <p className="text-xs sm:text-sm text-muted-foreground/70 max-w-xs mt-2 mx-auto">Enter city and soil color to get insights.</p>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="result" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="w-full space-y-4 sm:space-y-5">
                                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                                        whileHover={{ scale: 1.05, y: -4 }}
                                                        className="bg-gradient-to-br from-orange-500/10 to-amber-400/5 border border-orange-500/20 p-3 sm:p-4 rounded-xl flex flex-col items-center cursor-default">
                                                        <FaThermometerHalf className="text-2xl sm:text-3xl text-orange-500 mb-2" />
                                                        <p className="text-xs sm:text-sm text-muted-foreground">Temperature</p>
                                                        <p className="text-lg sm:text-xl font-bold text-foreground">{result?.temperature} °C</p>
                                                    </motion.div>
                                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                                        whileHover={{ scale: 1.05, y: -4 }}
                                                        className="bg-gradient-to-br from-blue-500/10 to-cyan-400/5 border border-blue-500/20 p-3 sm:p-4 rounded-xl flex flex-col items-center cursor-default">
                                                        <FaTint className="text-2xl sm:text-3xl text-blue-500 mb-2" />
                                                        <p className="text-xs sm:text-sm text-muted-foreground">Humidity</p>
                                                        <p className="text-lg sm:text-xl font-bold text-foreground">{result?.humidity} %</p>
                                                    </motion.div>
                                                </div>
                                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="bg-gradient-to-br from-primary/10 to-emerald-500/5 border border-primary/20 p-4 sm:p-6 rounded-xl text-center">
                                                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Recommended Crop</p>
                                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-primary capitalize">{result?.recommended_crop}</h2>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </PageTransition>
    );
};

export default WeatherPrediction;
