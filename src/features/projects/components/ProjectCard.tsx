"use client";

import { Button } from "@/components/ui/button";
import { Project } from "../data";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current || !imageRef.current) return;

        const initAnimations = async () => {
            const gsapModule = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                // Clip-path reveal from bottom
                gsap.fromTo(
                    imageRef.current,
                    { clipPath: "inset(100% 0 0 0)" },
                    {
                        clipPath: "inset(0% 0 0 0)",
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardRef.current,
                            start: "top 85%",
                            end: "top 50%",
                            scrub: 0.5,
                        },
                    }
                );

                // Card fade in
                gsap.fromTo(
                    cardRef.current,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: cardRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }, cardRef);

            return () => ctx.revert();
        };

        initAnimations();
    }, []);

    return (
        <div ref={cardRef} className="group relative bg-black/40 text-card-foreground transition-all duration-300 hover:-translate-y-2 opacity-0">
            {/* HUD Borders */}
            <div className="absolute inset-0 border-2 border-zinc-800 clip-path-hud transition-colors group-hover:border-primary/70 z-20 pointer-events-none" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 z-0 clip-path-hud" />

            <div className="relative z-10 clip-path-hud bg-zinc-900/50 backdrop-blur-sm h-full flex flex-col">
                {/* Image with clip-path reveal */}
                <div
                    ref={imageRef}
                    className="aspect-video w-full bg-black overflow-hidden relative border-b border-zinc-800 group-hover:border-primary/50 transition-colors"
                    style={{ clipPath: "inset(100% 0 0 0)" }}
                >
                    <div className="h-full w-full bg-gradient-to-br from-zinc-900 to-black transition-transform duration-500 group-hover:scale-110 opacity-60" />
                    {/* Tech Overlay Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                    <div className="absolute bottom-4 left-4 right-4 z-20">
                        <div className="flex flex-wrap gap-2 mb-2">
                            {project.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center border border-primary/30 bg-black/80 px-2 py-1 text-[10px] font-bold tracking-widest uppercase text-primary shadow-[0_0_10px_rgba(0,243,255,0.2)]"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold leading-none tracking-tight mb-3 text-white group-hover:text-primary transition-colors flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-none animate-pulse" />
                        {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6 line-clamp-3 font-mono">
                        {project.description}
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                        <Button asChild size="sm" className="rounded-none bg-primary text-black hover:bg-white hover:text-black font-bold uppercase tracking-wider clip-path-button">
                            <Link href={project.demoUrl || "#"}>
                                <ExternalLink className="h-3 w-3 mr-2" />
                                Initialize
                            </Link>
                        </Button>
                        {project.repoUrl && (
                            <Button asChild variant="outline" size="sm" className="rounded-none border-zinc-600 hover:border-white hover:text-white hover:bg-zinc-800 uppercase tracking-wider clip-path-button">
                                <Link href={project.repoUrl || "#"}>
                                    <Github className="h-3 w-3 mr-2" />
                                    Source
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .clip-path-hud {
                    clip-path: polygon(
                        0 0, 
                        100% 0, 
                        100% 85%, 
                        95% 100%, 
                        0 100%, 
                        0 15%
                    );
                }
                .clip-path-button {
                    clip-path: polygon(
                        10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%
                    );
                }
            `}</style>
        </div>
    );
}
