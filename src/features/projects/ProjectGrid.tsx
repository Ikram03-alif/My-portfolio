"use client";

import { projects } from "./data";
import { ProjectCard } from "./components/ProjectCard";
import { useEffect, useRef } from "react";

export function ProjectGrid() {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const initAnimations = async () => {
            const gsapModule = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                // Typography glow animation on viewport entry
                if (titleRef.current) {
                    gsap.fromTo(
                        titleRef.current,
                        {
                            opacity: 0,
                            y: 30,
                            textShadow: "0 0 0px rgba(0, 243, 255, 0)"
                        },
                        {
                            opacity: 1,
                            y: 0,
                            textShadow: "0 0 30px rgba(0, 243, 255, 0.5), 0 0 60px rgba(0, 243, 255, 0.3)",
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: titleRef.current,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }

                if (subtitleRef.current) {
                    gsap.fromTo(
                        subtitleRef.current,
                        { opacity: 0, y: 20 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            delay: 0.2,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: subtitleRef.current,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }
            });

            return () => ctx.revert();
        };

        initAnimations();
    }, []);

    return (
        <section className="container mx-auto px-4 py-24">
            <div className="mb-12 text-center">
                <h2
                    ref={titleRef}
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white opacity-0"
                >
                    <span className="text-secondary">#</span> MISSION_LOG
                </h2>
                <p
                    ref={subtitleRef}
                    className="mt-4 text-muted-foreground md:text-lg opacity-0"
                >
                    Completed operations that showcase system engineering capabilities.
                </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
