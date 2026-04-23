import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import { useState } from "react";
import useGetSoilAnalysis from "../Hooks/useGetSoilAnalysis.js";
import toast, { Toaster } from "react-hot-toast";
import AiSuggestions from "./AiSuggestions.jsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import TextField from '@mui/material/TextField';
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";
import { FaLeaf, FaChartBar, FaSeedling, FaExclamationTriangle, FaFlask, FaArrowRight } from "react-icons/fa";

const SoilAnalysis = () => {
    const [isAnswered, setIsAnswered] = useState(false);
    const [result, setResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getSoilAnalysis = useGetSoilAnalysis();
    const soilMinerals = [
        ["Nitrogen (N)", "N"], ["Phosphorus (P)", "P"], ["Potassium (K)", "K"],
        ["Soil pH", "pH"], ["Electrical Conductivity", "EC"], ["Organic Carbon", "OC"],
        ["Sulfur (S)", "S"], ["Zinc (Zn)", "Zn"], ["Iron (Fe)", "Fe"],
        ["Copper (Cu)", "Cu"], ["Manganese (Mn)", "Mn"], ["Boron (B)", "B"]
    ];

    const [mineralValue, setMineralValue] = useState(
        soilMinerals.reduce((acc, mineral) => { acc[mineral[1]] = ""; return acc; }, {})
    );

    const handleChange = (value, mineral) => {
        setMineralValue((prev) => ({ ...prev, [mineral]: value }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const response = await getSoilAnalysis(mineralValue);
        setIsLoading(false);
        if (response) {
            setIsAnswered(true);
            setResult(response);
            toast.success("Analysis complete!");
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background font-sans overflow-x-hidden relative z-10">
                <Navbar />
                <Toaster position="top-right" />
                
                <div className="flex-1 mt-20 sm:mt-24 mb-12 sm:mb-16 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
                    {/* Page Header */}
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
                            className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <FaLeaf className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                        </motion.div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                            Soil Health <span className="text-shimmer">Analysis</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 sm:mt-3 max-w-xl mx-auto text-sm sm:text-base">
                            Enter your soil test parameters. Our ML model determines nutrient fertility for maximum crop yield.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8">
                        {/* Input Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }} 
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Card className="h-full border-border shadow-xl hover:shadow-2xl transition-shadow duration-500">
                                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent rounded-t-xl border-b border-border/50">
                                    <CardTitle className="text-xl sm:text-2xl text-primary font-semibold flex items-center gap-2">
                                        <FaFlask /> Parameter Input
                                    </CardTitle>
                                    <CardDescription className="text-xs sm:text-sm">Provide values in mg/kg or appropriate units.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6">
                                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                                        {soilMinerals.map((m, i) => (
                                            <motion.div
                                                key={m[1]}
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + i * 0.04 }}
                                            >
                                                <TextField
                                                    label={m[0]}
                                                    variant="outlined"
                                                    size="small"
                                                    type="number"
                                                    fullWidth
                                                    value={mineralValue[m[1]]}
                                                    onChange={(e) => handleChange(e.target.value, m[1])}
                                                    InputLabelProps={{ shrink: true }}
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '12px',
                                                            transition: 'all 0.3s ease',
                                                            '&:hover fieldset': { borderColor: 'hsl(154 45% 35%)' },
                                                            '&.Mui-focused fieldset': { borderColor: 'hsl(154 45% 25%)', borderWidth: '2px' },
                                                        },
                                                        '& .MuiInputLabel-root.Mui-focused': { color: 'hsl(154 45% 25%)' }
                                                    }}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button className="w-full h-11 sm:h-12 text-base sm:text-lg shadow-lg shadow-primary/20 glow-btn" onClick={handleSubmit} disabled={isLoading}>
                                            {isLoading ? (
                                                <span className="flex items-center gap-2">
                                                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                                                    Analyzing...
                                                </span>
                                            ) : (
                                                <>Analyze Fertility <FaArrowRight className="ml-2" /></>
                                            )}
                                        </Button>
                                    </motion.div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        {/* Results Card */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }} 
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <Card className="h-full border-border shadow-xl flex flex-col min-h-[300px] sm:min-h-[400px]">
                                <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent rounded-t-xl border-b border-border/50">
                                    <CardTitle className="text-xl sm:text-2xl text-primary font-semibold flex items-center gap-2">
                                        <FaChartBar /> Results
                                    </CardTitle>
                                    <CardDescription className="text-xs sm:text-sm">Automated soil report.</CardDescription>
                                </CardHeader>
                                <CardContent className="p-4 sm:p-6 flex-1 flex flex-col items-center justify-center text-center">
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div
                                                key="loader"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="flex flex-col items-center gap-4"
                                            >
                                                <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                                                    <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                                                    <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                    <FaFlask className="absolute inset-0 m-auto w-8 h-8 sm:w-10 sm:h-10 text-primary animate-pulse" />
                                                </div>
                                                <p className="text-muted-foreground animate-pulse font-medium">Analyzing soil samples...</p>
                                            </motion.div>
                                        ) : !isAnswered ? (
                                            <motion.div
                                                key="empty"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col items-center"
                                            >
                                                <motion.div
                                                    animate={{ y: [0, -8, 0] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    className="w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-full flex items-center justify-center mb-4"
                                                >
                                                    <FaChartBar className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground/40" />
                                                </motion.div>
                                                <h3 className="text-lg sm:text-xl font-medium text-muted-foreground">Awaiting Data</h3>
                                                <p className="text-xs sm:text-sm text-muted-foreground/70 max-w-xs mt-2">Fill parameters and click Analyze.</p>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="result"
                                                initial={{ opacity: 0, scale: 0.5, rotateX: -30 }}
                                                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                                className="w-full"
                                            >
                                                {result === "missing" ? (
                                                    <motion.div 
                                                        className="bg-destructive/10 p-5 sm:p-6 rounded-2xl border border-destructive/30 w-full"
                                                        animate={{ x: [0, -5, 5, -5, 5, 0] }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        <FaExclamationTriangle className="w-12 h-12 sm:w-16 sm:h-16 text-destructive mx-auto mb-3" />
                                                        <h3 className="text-lg sm:text-xl font-bold text-destructive">Incomplete Data</h3>
                                                        <p className="text-destructive/80 mt-2 text-sm">Please fill all fields.</p>
                                                    </motion.div>
                                                ) : (
                                                    <div className={`p-6 sm:p-8 rounded-2xl border w-full ${result === "High" ? "bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-green-500/30" : "bg-gradient-to-br from-orange-500/10 to-amber-500/5 border-orange-500/30"}`}>
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                                                        >
                                                            {result === "High" ? 
                                                                <FaSeedling className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 mx-auto mb-3" /> : 
                                                                <FaLeaf className="w-16 h-16 sm:w-20 sm:h-20 text-orange-600 mx-auto mb-3 opacity-70" />
                                                            }
                                                        </motion.div>
                                                        <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-semibold">Fertility Status</p>
                                                        <motion.h3 
                                                            className={`text-3xl sm:text-4xl font-extrabold mt-1 ${result === "High" ? "text-green-600" : "text-orange-600"}`}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: 0.4 }}
                                                        >
                                                            {result}
                                                        </motion.h3>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>

                    {/* AI Suggestions */}
                    <AnimatePresence>
                        {isAnswered && result && result !== "missing" && (
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }} 
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                                className="mt-6 sm:mt-8"
                            >
                                <AiSuggestions isAnswered={isAnswered} result={result} minerals={mineralValue} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                
                <Footer />
            </div>
        </PageTransition>
    );
};

export default SoilAnalysis;