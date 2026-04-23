import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

const TiltCard = ({ children, className = "", intensity = 15 }) => {
    const cardRef = useRef(null);
    const [shinePos, setShinePos] = useState({ x: 50, y: 50 });

    const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
    const rotateY = useSpring(0, { stiffness: 200, damping: 20 });
    const scale = useSpring(1, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rY = (mouseX / (rect.width / 2)) * intensity;
        const rX = -(mouseY / (rect.height / 2)) * intensity;

        rotateX.set(rX);
        rotateY.set(rY);
        scale.set(1.04);

        setShinePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
        scale.set(1);
    };

    return (
        <div className="tilt-card" ref={cardRef}>
            <motion.div
                className={`tilt-card-inner relative ${className}`}
                style={{
                    rotateX,
                    rotateY,
                    scale,
                    transformPerspective: 1000,
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    className="tilt-shine"
                    style={{
                        "--shine-x": `${shinePos.x}%`,
                        "--shine-y": `${shinePos.y}%`,
                    }}
                />
                {children}
            </motion.div>
        </div>
    );
};

export default TiltCard;
