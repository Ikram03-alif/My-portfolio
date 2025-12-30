"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProfileCard = require("@/components/ProfileCard.jsx").default as React.ComponentType<any>;
import "@/components/ProfileCard.css";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Hyperspeed = require("@/components/Hyperspeed.jsx").default as React.ComponentType<any>;
import "@/components/Hyperspeed.css";

// TRON LEGACY inspired preset - Optimized for smooth performance
const hyperspeedOptions = {
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',  // Simpler distortion for performance
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 2,                    // Fewer lanes = better performance
    fov: 90,
    fovSpeedUp: 120,
    speedUp: 1.5,
    carLightsFade: 0.4,
    totalSideLightSticks: 15,           // Reduced for performance
    lightPairsPerRoadWay: 30,           // Reduced for smoother scrolling
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.05, 0.1],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [40, 60],          // Slower = smoother
    movingCloserSpeed: [-100, -140],    // Slower incoming
    carLightsLength: [400 * 0.04, 400 * 0.15],
    carLightsRadius: [0.04, 0.1],
    carWidthPercentage: [0.2, 0.4],
    carShiftX: [-0.5, 0.5],
    carFloorSeparation: [0, 3],
    colors: {
        roadColor: 0x000000,
        islandColor: 0x000000,
        background: 0x000000,
        shoulderLines: 0x00f3ff,
        brokenLines: 0x00a8cc,          // Slightly dimmer
        leftCars: [0xff6600, 0xff4400, 0xff8800],
        rightCars: [0x00f3ff, 0x00d4ff, 0x00a8cc],
        sticks: 0x00f3ff,
    }
};

export function Hero() {
    return (
        <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-20 lg:py-0">
            {/* Hyperspeed Background */}
            <div className="absolute inset-0 z-0">
                <Hyperspeed effectOptions={hyperspeedOptions} />
            </div>

            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/40 z-[1]" />

            {/* Background Glow Effects */}
            <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px] z-[2]" />
            <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary/20 blur-[120px] z-[2]" />

            <div className="container grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Column: Text */}
                <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-sm font-medium text-primary shadow-[0_0_10px_rgba(0,243,255,0.3)]">
                            System Engineer & Web Developer
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none"
                    >
                        HI, I'M <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary animate-pulse">
                            IKRAM ALIF
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-2xl text-muted-foreground lg:max-w-xl"
                    >
                        Bachelor of Information Systems Engineering (Hons) Information System Engineering
                        <br />
                        <span className="text-secondary">UiTM Shah Alam</span>
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-md md:text-lg text-zinc-400 lg:max-w-xl"
                    >
                        Passionate about building scalable web solutions with <span className="text-primary font-bold">Laravel</span> & <span className="text-primary font-bold">Next.js</span>.
                        Designing immersive digital experiences.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4"
                    >
                        <Button size="lg" className="rounded-none border-2 border-primary bg-primary/10 text-primary hover:bg-primary hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,243,255,0.2)] hover:shadow-[0_0_30px_rgba(0,243,255,0.6)] clip-path-button tracking-widest font-bold">
                            START MISSION
                        </Button>
                        <Button asChild size="lg" variant="ghost" className="rounded-none border-2 border-zinc-800 hover:border-white hover:bg-white hover:text-black transition-all clip-path-button tracking-widest">
                            <Link href="mailto:ikramalif.roslee@gmail.com">
                                <Mail className="mr-2 h-4 w-4" />
                                COMMS LINK
                            </Link>
                        </Button>
                        <Button asChild size="icon" variant="outline" className="rounded-none border-zinc-800 hover:border-secondary hover:text-secondary hover:shadow-[0_0_15px_#bc13fe] clip-path-button">
                            <Link href="https://linkedin.com/in/ikrm-alif" target="_blank">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>

                {/* Right Column: ProfileCard */}
                <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <ProfileCard
                            name="Ikram Alif"
                            title="System Engineer & Web Developer"
                            handle="ikrm-alif"
                            status="Available for Hire"
                            contactText="Contact Me"
                            avatarUrl="/Untitled design (1).png"
                            showUserInfo={true}
                            enableTilt={true}
                            enableMobileTilt={false}
                            behindGlowColor="rgba(0, 243, 255, 0.5)"
                            innerGradient="linear-gradient(145deg, #00f3ff22 0%, #bc13fe33 100%)"
                            onContactClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=ikramalif.roslee@gmail.com', '_blank')}
                        />
                    </motion.div>
                </div>

            </div>

            <style jsx global>{`
            .clip-path-button {
                clip-path: polygon(
                    10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%
                );
            }
        `}</style>
        </section>
    );
}
