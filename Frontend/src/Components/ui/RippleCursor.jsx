import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RippleCursor = () => {
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        // Disable on touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const handleClick = (e) => {
            const newRipple = {
                id: Date.now() + Math.random(),
                x: e.clientX,
                y: e.clientY
            };
            setRipples((prev) => [...prev, newRipple]);

            // Remove the ripple from state after animation completes
            setTimeout(() => {
                setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
            }, 1000);
        };

        window.addEventListener("mousedown", handleClick);
        return () => window.removeEventListener("mousedown", handleClick);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        initial={{ scale: 0.2, opacity: 0.8, borderWidth: 3 }}
                        animate={{ scale: 6, opacity: 0, borderWidth: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        style={{
                            position: "absolute",
                            left: ripple.x - 20, // Center the 40px circle
                            top: ripple.y - 20,
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            borderColor: "hsl(var(--primary))",
                            borderStyle: "solid",
                            background: "radial-gradient(circle, hsla(var(--primary) / 0.15) 0%, transparent 60%)"
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default RippleCursor;
