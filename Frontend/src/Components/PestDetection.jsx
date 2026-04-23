import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import usePestDetection from "../Hooks/usePestDetection.js";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "../components/ui/PageTransition";
import { FaBug, FaUpload, FaSearch, FaExclamationCircle, FaImage, FaArrowRight, FaShieldAlt, FaTimes, FaRedoAlt } from "react-icons/fa";

const PestDetection = () => {
    const { selectedFile, preview, responseData, loading, handleChange, handleUpload, clearFile } = usePestDetection();

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-background font-sans overflow-x-hidden relative z-10">
                <Navbar />
                
                <div className="flex-1 mt-20 sm:mt-24 mb-12 sm:mb-16 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto w-full">
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
                            className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                            <FaShieldAlt className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                        </motion.div>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
                            AI Pest <span className="text-shimmer">Detection</span>
                        </h1>
                        <p className="text-muted-foreground mt-2 sm:mt-3 max-w-xl mx-auto text-sm sm:text-base">
                            Upload a crop leaf image. Our AI identifies diseases and pests instantly.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-0 items-stretch border border-border bg-card rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Upload Section */}
                        <motion.div className="p-5 sm:p-8 md:border-r border-border bg-gradient-to-br from-accent/30 to-transparent flex flex-col justify-center">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-foreground">
                                <FaUpload className="text-primary"/> Upload Image
                            </h2>

                            <motion.div 
                                className="border-2 border-dashed border-primary/30 rounded-2xl relative w-full aspect-square max-h-[300px] sm:max-h-none flex flex-col items-center justify-center bg-background/80 overflow-hidden cursor-pointer group" 
                                onClick={() => !selectedFile && document.getElementById('fileInput').click()}
                                whileHover={{ borderColor: "hsl(154 45% 25%)", scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <AnimatePresence mode="wait">
                                    {!selectedFile ? (
                                        <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            className="text-center p-4 sm:p-6 pointer-events-none">
                                            <motion.div
                                                animate={{ y: [0, -8, 0] }}
                                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                                className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors"
                                            >
                                                <FaImage className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                                            </motion.div>
                                            <p className="text-sm sm:text-lg font-medium text-foreground">Click to browse</p>
                                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">JPG, PNG, WebP supported</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="preview-wrap" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                            className="relative w-full h-full">
                                            <img className="w-full h-full object-cover" src={preview} alt="Preview" />
                                            {/* Remove button */}
                                            <motion.button
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 300, delay: 0.15 }}
                                                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                                                className="absolute top-2 right-2 w-9 h-9 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm transition-colors z-10"
                                                title="Remove image"
                                            >
                                                <FaTimes className="w-4 h-4" />
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                
                                <input type="file" accept="image/*" id="fileInput" onChange={handleChange} className="hidden" />
                            </motion.div>

                            <div className="flex gap-3 mt-4 sm:mt-6">
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                                    <Button
                                        onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                                        className="w-full h-11 sm:h-12 text-base sm:text-lg shadow-lg shadow-primary/20 glow-btn"
                                        disabled={loading || !selectedFile}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                                                Analyzing...
                                            </span>
                                        ) : (
                                            <span className="flex items-center gap-2"><FaBug /> Detect Pest</span>
                                        )}
                                    </Button>
                                </motion.div>
                                
                                {/* Change Image button - visible when a file is selected */}
                                {selectedFile && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }} 
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.05 }} 
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button
                                            onClick={(e) => { e.stopPropagation(); document.getElementById('fileInput').click(); }}
                                            variant="outline"
                                            className="h-11 sm:h-12 px-4 border-border text-foreground"
                                            title="Choose a different image"
                                        >
                                            <FaRedoAlt />
                                        </Button>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Results Section */}
                        <div className="p-5 sm:p-8 flex flex-col justify-center bg-card border-t md:border-t-0 border-border">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-foreground border-b border-border pb-3 sm:pb-4">
                                <FaSearch className="text-primary"/> Detection Result
                            </h2>

                            <div className="flex-1 flex flex-col items-center justify-center text-center min-h-[200px] sm:min-h-[250px]">
                                <AnimatePresence mode="wait">
                                    {loading ? (
                                        <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4">
                                            <div className="relative w-20 h-20">
                                                <div className="absolute inset-0 border-4 border-red-200 rounded-full"></div>
                                                <div className="absolute inset-0 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                                <FaBug className="absolute inset-0 m-auto w-8 h-8 text-red-500 animate-pulse" />
                                            </div>
                                            <p className="text-muted-foreground animate-pulse text-sm sm:text-base">AI is analyzing pixels...</p>
                                        </motion.div>
                                    ) : responseData ? (
                                        <motion.div key="result" initial={{ opacity: 0, scale: 0.5, rotateY: -30 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }} className="w-full">
                                            {responseData.error ? (
                                                <motion.div className="bg-destructive/10 border border-destructive/20 p-5 sm:p-6 rounded-xl flex flex-col items-center"
                                                    animate={{ x: [0, -4, 4, -4, 4, 0] }} transition={{ duration: 0.4 }}>
                                                    <FaExclamationCircle className="text-3xl sm:text-4xl text-destructive mb-3" />
                                                    <h3 className="text-base sm:text-lg font-bold text-destructive">Detection Error</h3>
                                                    <p className="text-destructive/80 mt-1 text-sm">{responseData.error}</p>
                                                </motion.div>
                                            ) : (
                                                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 p-6 sm:p-8 rounded-xl flex flex-col items-center">
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                                                        className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                                                    >
                                                        <FaBug className="w-8 h-8 sm:w-10 sm:h-10 text-red-500" />
                                                    </motion.div>
                                                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">Identified Pest</p>
                                                    <motion.h3 
                                                        className="text-2xl sm:text-3xl font-extrabold text-red-600 capitalize"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.4 }}
                                                    >
                                                        {responseData.class_name ? responseData.class_name : `Class ID: ${responseData.class_id}`}
                                                    </motion.h3>
                                                    
                                                    {/* Scan Another button */}
                                                    <motion.button
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.6 }}
                                                        onClick={clearFile}
                                                        className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm font-semibold transition-colors"
                                                    >
                                                        <FaRedoAlt className="w-3.5 h-3.5" /> Scan Another
                                                    </motion.button>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                                <FaBug className="w-10 h-10 text-muted-foreground/30" />
                                            </motion.div>
                                            <p className="text-muted-foreground text-sm sm:text-base max-w-xs mx-auto">Upload an image to see detection results.</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                <Footer />
            </div>
        </PageTransition>
    );
};

export default PestDetection;