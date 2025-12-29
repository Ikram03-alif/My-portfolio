"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InfiniteMenuItem {
    image: string;
    link?: string;
    title: string;
    description: string;
}

interface InfiniteMenuProps {
    items: InfiniteMenuItem[];
}

export function InfiniteMenu({ items }: InfiniteMenuProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const itemCount = items.length;

    const navigate = useCallback((direction: number) => {
        setActiveIndex((prev) => (prev + direction + itemCount) % itemCount);
    }, [itemCount]);

    // Auto-rotate when not hovering
    useEffect(() => {
        if (isHovering) return;
        const interval = setInterval(() => navigate(1), 3000);
        return () => clearInterval(interval);
    }, [isHovering, navigate]);

    // Get visible items (prev, current, next)
    const getVisibleItems = () => {
        const prev = (activeIndex - 1 + itemCount) % itemCount;
        const next = (activeIndex + 1) % itemCount;
        return [
            { item: items[prev], position: -1, index: prev },
            { item: items[activeIndex], position: 0, index: activeIndex },
            { item: items[next], position: 1, index: next },
        ];
    };

    const visibleItems = getVisibleItems();

    return (
        <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Cards Container */}
            <div className="relative w-full h-[400px] flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                    {visibleItems.map(({ item, position, index }) => {
                        const isActive = position === 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{
                                    x: position > 0 ? 300 : position < 0 ? -300 : 0,
                                    scale: 0.8,
                                    opacity: 0
                                }}
                                animate={{
                                    x: position * 220,
                                    scale: isActive ? 1 : 0.75,
                                    opacity: isActive ? 1 : 0.5,
                                    zIndex: isActive ? 10 : 1,
                                }}
                                exit={{
                                    x: position > 0 ? 300 : -300,
                                    scale: 0.8,
                                    opacity: 0
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="absolute cursor-pointer"
                                onClick={() => !isActive && setActiveIndex(index)}
                            >
                                {/* Card */}
                                <div className={`
                  relative w-[200px] md:w-[250px] p-4 transition-all duration-300
                  ${isActive
                                        ? "border-2 border-primary bg-zinc-900/90 shadow-[0_0_40px_rgba(0,243,255,0.3)]"
                                        : "border border-zinc-800 bg-black/60"
                                    }
                `}>
                                    {/* Tech Corner Markers */}
                                    <span className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${isActive ? 'border-primary' : 'border-zinc-700'}`} />
                                    <span className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${isActive ? 'border-primary' : 'border-zinc-700'}`} />
                                    <span className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${isActive ? 'border-secondary' : 'border-zinc-700'}`} />
                                    <span className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${isActive ? 'border-secondary' : 'border-zinc-700'}`} />

                                    {/* Image */}
                                    <div className="relative w-full aspect-square mb-4 flex items-center justify-center bg-black/50 border border-zinc-800 p-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className={`w-20 h-20 object-contain transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'opacity-60'}`}
                                        />
                                        {/* Scan Line Effect */}
                                        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                                    </div>

                                    {/* Content */}
                                    <h3 className={`
                    text-xl font-bold tracking-wider mb-2 text-center
                    ${isActive ? "text-primary" : "text-zinc-500"}
                  `}>
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-zinc-500 font-mono text-center line-clamp-2">
                                        {item.description}
                                    </p>

                                    {/* Status Indicator */}
                                    <div className="flex items-center justify-center gap-2 mt-4">
                                        <span className={`w-2 h-2 ${isActive ? "bg-green-400 animate-pulse" : "bg-zinc-700"}`} />
                                        <span className={`text-[10px] uppercase tracking-widest ${isActive ? "text-green-400" : "text-zinc-600"}`}>
                                            {isActive ? "SELECTED" : "IDLE"}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={() => navigate(-1)}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 border border-zinc-700 bg-black/80 hover:border-primary hover:text-primary transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => navigate(1)}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 border border-zinc-700 bg-black/80 hover:border-primary hover:text-primary transition-all hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-1 transition-all ${index === activeIndex
                                ? "bg-primary w-8 shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                                : "bg-zinc-700 w-4 hover:bg-zinc-500"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
