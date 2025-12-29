"use client";

import { education, experience } from "../projects/data";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { InfiniteMenu } from "@/components/ui/InfiniteMenu";

const skillItems = [
    { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg", title: "Laravel", description: "PHP Framework for Web Artisans" },
    { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", title: "Next.js", description: "React Framework for Production" },
    { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", title: "Flutter", description: "Cross-platform Mobile SDK" },
    { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", title: "MySQL", description: "Relational Database System" },
    { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", title: "TypeScript", description: "JavaScript with Superpowers" },
    { image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", title: "Azure", description: "Microsoft Cloud Platform" },
];

export function Experience() {
    return (
        <section className="container mx-auto px-4 py-24 relative">
            {/* Background Grid Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />

            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-center mb-16 text-white group">
                <span className="text-secondary">#</span> EXPERIENCE & SKILLS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Left Col: Timeline */}
                <div className="space-y-12">
                    <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                        <span className="h-2 w-2 bg-primary rounded-full shadow-[0_0_10px_#00f3ff]" />
                        CAREER & EDUCATION
                    </h3>

                    <div className="relative border-l-2 border-zinc-800 pl-8 ml-3 space-y-12">
                        {/* Work */}
                        {experience.map((job, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                key={idx} className="relative"
                            >
                                <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-secondary shadow-[0_0_10px_#bc13fe]" />
                                <h4 className="text-xl font-bold text-white">{job.role}</h4>
                                <p className="text-secondary font-mono text-sm mb-2">{job.company} | {job.period}</p>
                                <p className="text-zinc-400">{job.description}</p>
                            </motion.div>
                        ))}

                        {/* Edu */}
                        {education.map((edu, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                key={idx} className="relative"
                            >
                                <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-background bg-zinc-600" />
                                <h4 className="text-xl font-bold text-white">{edu.school}</h4>
                                <p className="text-zinc-500 font-mono text-sm mb-2">{edu.degree} | {edu.year}</p>
                                {edu.gpa && <Badge variant="outline" className="border-primary text-primary">CGPA: {edu.gpa}</Badge>}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Col: Skills */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-secondary flex items-center gap-2">
                        <span className="h-2 w-2 bg-secondary rounded-full shadow-[0_0_10px_#bc13fe]" />
                        TECH ARSENAL
                    </h3>

                    {/* InfiniteMenu Carousel */}
                    <div className="h-[500px] relative">
                        <InfiniteMenu items={skillItems} />
                    </div>

                    <div className="p-6 rounded-none border-l-4 border-secondary bg-zinc-900/30 mt-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-2 opacity-20">
                            <span className="text-[100px] leading-none font-black text-secondary">?</span>
                        </div>
                        <h4 className="font-bold text-white mb-4 text-xl tracking-wider">CERTIFICATIONS_UNLOCKED</h4>
                        <ul className="space-y-3 text-zinc-400 relative z-10">
                            <li className="flex items-center gap-3">
                                <span className="text-green-400 font-mono">[PASSED]</span> Microsoft Certified: Azure Data Fundamentals
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-green-400 font-mono">[PASSED]</span> Microsoft Certified: Power BI Data Analyst Associate
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
