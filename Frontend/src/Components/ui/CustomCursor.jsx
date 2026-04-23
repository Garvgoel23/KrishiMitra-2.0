import { useEffect, useRef } from "react";

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Only on non-touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        document.documentElement.classList.add("custom-cursor");

        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let rafId;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Dot follows instantly
            dot.style.left = `${mouseX}px`;
            dot.style.top = `${mouseY}px`;
        };

        // Ring follows with smooth lag
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            rafId = requestAnimationFrame(animateRing);
        };

        const onMouseEnterInteractive = () => {
            dot.classList.add("cursor-hover");
            ring.classList.add("cursor-hover");
        };

        const onMouseLeaveInteractive = () => {
            dot.classList.remove("cursor-hover");
            ring.classList.remove("cursor-hover");
        };

        window.addEventListener("mousemove", onMouseMove);
        rafId = requestAnimationFrame(animateRing);

        // Add hover effects for interactive elements
        const interactiveSelectors = "a, button, input, textarea, select, [role='button'], .cursor-hover-target";
        const addHoverListeners = () => {
            document.querySelectorAll(interactiveSelectors).forEach((el) => {
                el.addEventListener("mouseenter", onMouseEnterInteractive);
                el.addEventListener("mouseleave", onMouseLeaveInteractive);
            });
        };

        addHoverListeners();
        // Re-attach after DOM changes
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(rafId);
            observer.disconnect();
            document.documentElement.classList.remove("custom-cursor");
            document.querySelectorAll(interactiveSelectors).forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnterInteractive);
                el.removeEventListener("mouseleave", onMouseLeaveInteractive);
            });
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="custom-cursor-dot" />
            <div ref={ringRef} className="custom-cursor-ring" />
        </>
    );
};

export default CustomCursor;
