"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
    children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Dynamic import GSAP to avoid SSR issues
        const initScroll = async () => {
            const gsapModule = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            gsap.registerPlugin(ScrollTrigger);

            // Initialize Lenis smooth scroll
            lenisRef.current = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                smoothWheel: true,
            });

            // Sync Lenis with GSAP's ticker
            const update = (time: number) => {
                lenisRef.current?.raf(time * 1000);
            };
            gsap.ticker.add(update);

            // Update ScrollTrigger on Lenis scroll
            lenisRef.current.on("scroll", ScrollTrigger.update);
        };

        initScroll();

        // Cleanup
        return () => {
            lenisRef.current?.destroy();
        };
    }, []);

    return <>{children}</>;
}
