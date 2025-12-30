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
        if (!cardRef.current) return;

        const initAnimations = async () => {
            const gsapModule = await import("gsap");
            const { ScrollTrigger } = await import("gsap/ScrollTrigger");

            const gsap = gsapModule.default;
            gsap.registerPlugin(ScrollTrigger);

            const ctx = gsap.context(() => {
                // Image reveal (if exists)
                if (imageRef.current) {
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
                }

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

    // Layout for Projects WITH Images
    if (project.imageUrl) {
        return (
            <div ref={cardRef} className="group relative w-full md:min-h-[500px] bg-black border border-zinc-800 opacity-0 overflow-hidden">

                {/* Image Layer */}
                <div ref={imageRef} className="relative w-full" style={{ clipPath: "inset(100% 0 0 0)" }}>
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 group-hover:blur-[2px] opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

                    {/* Tech Overlay Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30 z-10" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-30 p-6 md:p-12 flex flex-col justify-end">
                        {/* Tags */}
                        <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-wrap gap-1 md:gap-2 max-w-[200px] md:max-w-none justify-end">
                            {project.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="inline-flex items-center border border-primary/30 bg-black/60 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-bold tracking-widest uppercase text-primary shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Info */}
                        <div className="max-w-4xl space-y-3 md:space-y-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <h3 className="text-xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter flex items-center gap-2 md:gap-4 drop-shadow-2xl">
                                <span className="w-2 h-2 md:w-4 md:h-4 bg-primary animate-pulse shadow-[0_0_20px_#00f3ff]" />
                                {project.title}
                            </h3>

                            <p className="text-zinc-300 text-sm md:text-xl font-mono leading-relaxed md:border-l-4 md:border-primary/50 md:pl-6 md:bg-black/60 md:backdrop-blur-md md:p-6 md:rounded-r-lg max-w-3xl md:shadow-xl line-clamp-2 md:line-clamp-none">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 md:gap-6 pt-2 md:pt-6">
                                <Button asChild size="default" className="rounded-none bg-primary text-black hover:bg-white hover:text-black font-bold uppercase tracking-widest px-3 py-2 md:px-6 md:py-6 text-xs md:text-lg shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)] transition-all clip-path-button relative overflow-hidden group/btn">
                                    <Link href={project.demoUrl || "#"}>
                                        <span className="relative z-10 flex items-center gap-2 md:gap-3">
                                            <ExternalLink className="h-4 w-4 md:h-5 md:w-5" />
                                            <span className="hidden sm:inline">Initialize Broadcast</span>
                                            <span className="sm:hidden">View</span>
                                        </span>
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                                    </Link>
                                </Button>
                                {project.repoUrl && (
                                    <Button asChild variant="outline" size="lg" className="rounded-none border-2 border-zinc-500 text-zinc-100 hover:border-white hover:text-black hover:bg-white font-bold uppercase tracking-widest px-6 py-6 text-base md:text-lg backdrop-blur-md bg-black/50 transition-all clip-path-button">
                                        <Link href={project.repoUrl || "#"}>
                                            <Github className="h-5 w-5 mr-3" />
                                            Source Code
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* HUD Decorations */}
                <div className="absolute inset-0 border-2 border-zinc-800 z-20 pointer-events-none group-hover:border-primary/50 transition-colors duration-500" />
                <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-primary/30 rounded-tl-3xl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-primary/30 rounded-br-3xl z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />

                <style jsx global>{`
                    .clip-path-button { clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px); }
                `}</style>
            </div>
        );
    }

    // Layout for Projects WITHOUT Images (Text Only)
    return (
        <div ref={cardRef} className="group relative w-full bg-zinc-900 border border-zinc-800 opacity-0 overflow-hidden p-8 md:p-16 flex flex-col justify-center min-h-[400px]">
            {/* Tech Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,243,255,0.15),transparent_70%)]" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent)',
                    backgroundSize: '50px 50px'
                }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Tags Centered */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {project.tags.map((tag) => (
                        <span key={tag} className="inline-flex items-center border border-zinc-700 bg-black/40 px-3 py-1 text-xs font-bold tracking-widest uppercase text-zinc-400">
                            {tag}
                        </span>
                    ))}
                </div>

                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 group-hover:text-primary transition-colors duration-300">
                    <span className="text-primary mr-3">#</span>{project.title}
                </h3>

                <p className="text-zinc-400 text-lg md:text-xl font-mono leading-relaxed mb-8 max-w-2xl mx-auto">
                    {project.description}
                </p>

                <div className="flex justify-center gap-6">
                    {/* Simplified Buttons for Text Card */}
                    <Button asChild size="lg" className="rounded-none bg-zinc-800 text-white hover:bg-primary hover:text-black font-bold uppercase tracking-widest px-8 py-6 clip-path-button transition-all">
                        <Link href={project.demoUrl || "#"}>
                            <ExternalLink className="h-5 w-5 mr-3" />
                            Initialize
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-zinc-700 opacity-50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-zinc-700 opacity-50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-zinc-700 opacity-50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-zinc-700 opacity-50" />
        </div>
    );
}
