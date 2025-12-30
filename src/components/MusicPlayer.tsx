"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Volume2, Maximize2, Minimize2, Music } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// Dummy data - User can replace this later
const TRACK = {
    title: "First Love (원곡 _ Hikaru Utada)",
    artist: "KIM CHAEWON",
    cover: "/song/maxresdefault.jpg",
    src: "/song/First Love.mp3" // URL-encoded path
};

export function MusicPlayer() {
    const [isMinimized, setIsMinimized] = useState(true); // Start minimized
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);

    const audioRef = useRef<HTMLAudioElement>(null);

    // Initial load volume
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (value: number[]) => {
        if (audioRef.current) {
            audioRef.current.currentTime = value[0];
            setCurrentTime(value[0]);
        }
    };

    const handleVolumeChange = (value: number[]) => {
        const newVol = value[0];
        setVolume(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={TRACK.src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />

            <motion.div
                initial={false}
                animate={{
                    width: isMinimized ? "300px" : "350px",
                    height: isMinimized ? "80px" : "550px",
                    borderRadius: "20px",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn(
                    "fixed bottom-6 right-6 z-50 overflow-hidden bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]",
                    isMinimized ? "cursor-pointer hover:bg-black/70" : ""
                )}
                onClick={() => isMinimized && setIsMinimized(false)}
            >
                {/* Visualizer Background (Subtle) */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />

                <div className="relative h-full flex flex-col p-4">

                    {/* Header Controls (Expanded Only) */}
                    <AnimatePresence>
                        {!isMinimized && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex justify-between items-center mb-6"
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-primary tracking-widest uppercase">Now Playing</span>
                                    <span className="text-[10px] text-zinc-400">System Audio</span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsMinimized(true); }}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <Minimize2 className="h-4 w-4 text-zinc-400" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Album Art Area */}
                    <div className={cn("flex gap-4 transition-all duration-300", isMinimized ? "items-center" : "flex-col items-center flex-1")}>

                        {/* Game-Themed Disc Container */}
                        <motion.div
                            layout
                            className={cn(
                                "relative shrink-0",
                                isMinimized ? "w-12 h-12" : "w-64 h-64 mb-6"
                            )}
                        >
                            {/* Outer Glow Ring */}
                            {!isMinimized && (
                                <div className={cn(
                                    "absolute inset-[-4px] rounded-full",
                                    isPlaying
                                        ? "bg-gradient-to-r from-primary via-secondary to-primary animate-spin shadow-[0_0_30px_rgba(0,243,255,0.5)]"
                                        : "bg-zinc-800"
                                )} style={{ animationDuration: '2s' }} />
                            )}

                            {/* Spinning Game Disc */}
                            <div
                                className={cn(
                                    "absolute inset-0 rounded-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-black shadow-2xl",
                                    isPlaying && !isMinimized ? "animate-spin" : "",
                                    isMinimized ? "rounded-lg" : ""
                                )}
                                style={{ animationDuration: '4s' }}
                            >
                                {/* Game-Themed Elements - Only visible when expanded */}
                                {!isMinimized && (
                                    <>
                                        {/* Tech Ring 1 - Outer */}
                                        <div className="absolute inset-[8%] rounded-full border-2 border-primary/40 shadow-[0_0_10px_rgba(0,243,255,0.3)]" />

                                        {/* Glowing Segments */}
                                        <div className="absolute inset-[12%] rounded-full border border-dashed border-primary/30" />

                                        {/* Tech Ring 2 */}
                                        <div className="absolute inset-[16%] rounded-full border border-secondary/30" />

                                        {/* Data Track Lines */}
                                        <div className="absolute inset-[20%] rounded-full border border-zinc-700/60" />
                                        <div className="absolute inset-[22%] rounded-full border border-primary/20" />

                                        {/* Holographic Shine */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-primary/10 to-transparent" />

                                        {/* Pulsing Ring */}
                                        <div className={cn(
                                            "absolute inset-[24%] rounded-full border-2 border-primary/50",
                                            isPlaying ? "animate-pulse shadow-[0_0_15px_rgba(0,243,255,0.4)]" : ""
                                        )} />

                                        {/* HUD Corner Markers */}
                                        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-4 h-1 bg-primary/60" />
                                        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-4 h-1 bg-primary/60" />
                                        <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-1 h-4 bg-primary/60" />
                                        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-1 h-4 bg-primary/60" />

                                        {/* Inner Tech Border */}
                                        <div className="absolute inset-[26%] rounded-full border border-zinc-600/40 bg-zinc-950/50" />
                                    </>
                                )}

                                {/* Album Art in Center - BIGGER */}
                                <div className={cn(
                                    "absolute overflow-hidden",
                                    isMinimized
                                        ? "inset-0 rounded-lg"
                                        : "inset-[20%] rounded-full border-2 border-primary/50 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
                                )}>
                                    <img
                                        src={TRACK.cover}
                                        alt="Album Art"
                                        className={cn(
                                            "w-full h-full object-cover",
                                            isPlaying && !isMinimized ? "animate-spin-reverse" : ""
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Outer Glow Effect when playing */}
                            {isPlaying && !isMinimized && (
                                <div className="absolute inset-[-10px] rounded-full bg-primary/5 blur-2xl animate-pulse pointer-events-none" />
                            )}
                        </motion.div>

                        {/* Text Info */}
                        <motion.div layout className={cn("flex flex-col overflow-hidden", isMinimized ? "flex-1 justify-center" : "items-center text-center w-full")}>
                            <h4 className={cn("font-bold text-white truncate w-full", isMinimized ? "text-sm" : "text-xl mb-1")}>
                                {TRACK.title}
                            </h4>
                            <p className={cn("text-zinc-400 truncate w-full", isMinimized ? "text-xs" : "text-sm text-primary")}>
                                {TRACK.artist}
                            </p>
                        </motion.div>

                        {/* Mini Controls (Minimized Only) */}
                        {isMinimized && (
                            <button
                                onClick={togglePlay}
                                className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors shrink-0"
                            >
                                {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current pl-0.5" />}
                            </button>
                        )}
                    </div>

                    {/* Full Controls (Expanded Only) */}
                    <AnimatePresence>
                        {!isMinimized && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-auto w-full space-y-6"
                            >
                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <Slider
                                        value={[currentTime]}
                                        max={duration || 100}
                                        step={1}
                                        onValueChange={handleSeek}
                                        className="cursor-pointer"
                                    />
                                    <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                {/* Main Buttons */}
                                <div className="flex items-center justify-center gap-8">
                                    <button className="text-zinc-400 hover:text-white transition-colors">
                                        <SkipBack className="h-6 w-6" />
                                    </button>

                                    <button
                                        onClick={togglePlay}
                                        className="h-16 w-16 flex items-center justify-center bg-primary text-black rounded-full hover:scale-105 hover:shadow-[0_0_20px_#00f3ff] transition-all"
                                    >
                                        {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current pl-1" />}
                                    </button>

                                    <button className="text-zinc-400 hover:text-white transition-colors">
                                        <SkipForward className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Volume */}
                                <div className="flex items-center gap-3 px-4">
                                    <Volume2 className="h-4 w-4 text-zinc-400" />
                                    <Slider
                                        value={[volume]}
                                        max={1}
                                        step={0.01}
                                        onValueChange={handleVolumeChange}
                                        className="w-full"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    );
}
