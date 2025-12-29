"use client";

import { useEffect, useRef } from "react";

export function GameParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const initParallax = async () => {
            const gsapModule = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                // Layer 1: Grid Pattern - 10% scroll speed
                if (gridRef.current) {
                    gsap.to(gridRef.current, {
                        yPercent: 10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: document.body,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: true,
                        },
                    });
                }

                // Layer 2: Particles - 30% scroll speed
                if (particlesRef.current) {
                    gsap.to(particlesRef.current, {
                        yPercent: 30,
                        ease: "none",
                        scrollTrigger: {
                            trigger: document.body,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: true,
                        },
                    });
                }
            }, containerRef);

            return () => ctx.revert();
        };

        initParallax();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">

            {/* Layer 1: Grid Pattern (10% speed) */}
            <div
                ref={gridRef}
                className="absolute inset-0 w-full h-[200%]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(0, 243, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(0, 243, 255, 0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* Layer 2: Floating Particles (30% speed) */}
            <div ref={particlesRef} className="absolute inset-0 w-full h-[200%]">
                {/* Hexagon 1 */}
                <div className="absolute top-[10%] left-[5%] opacity-20">
                    <svg width="200" height="200" viewBox="0 0 100 100" className="stroke-primary/30 stroke-[0.5] fill-transparent animate-[spin_60s_linear_infinite]">
                        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
                    </svg>
                </div>

                {/* Hexagon 2 */}
                <div className="absolute top-[40%] right-[10%] opacity-15">
                    <svg width="300" height="300" viewBox="0 0 100 100" className="stroke-secondary/25 stroke-[0.5] fill-transparent animate-[spin_90s_linear_infinite_reverse]">
                        <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
                    </svg>
                </div>

                {/* Floating Dots */}
                <div className="absolute top-[25%] right-[25%] w-3 h-3 bg-primary/40 rounded-full blur-[1px] animate-pulse" />
                <div className="absolute top-[55%] left-[20%] w-4 h-4 bg-secondary/30 rounded-full blur-[2px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[75%] right-[35%] w-2 h-2 bg-primary/50 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '0.5s' }} />

                {/* Tech Lines */}
                <div className="absolute top-[60%] left-[10%] w-32 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent rotate-45" />
                <div className="absolute top-[30%] right-[15%] w-24 h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent -rotate-12" />

                {/* Corner Accent */}
                <div className="absolute top-[15%] right-[8%] opacity-50">
                    <svg width="120" height="120" viewBox="0 0 100 100" className="drop-shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" className="fill-transparent stroke-primary/50 stroke-1" />
                        <circle cx="50" cy="50" r="8" className="fill-primary/60" />
                    </svg>
                </div>
            </div>

            {/* Scanline Overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-50"
                style={{
                    background: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)',
                    backgroundSize: '100% 4px',
                    opacity: 0.1,
                }}
            />

            {/* Vignette Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>
    );
}
