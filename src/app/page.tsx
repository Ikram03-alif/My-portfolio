import { Hero } from "@/features/hero/Hero";
import { ProjectGrid } from "@/features/projects/ProjectGrid";
import { Experience } from "@/features/resume/Experience";
import { GameParallax } from "@/components/ui/GameParallax";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <GameParallax />
      <div className="relative z-10 w-full">
        <Hero />
        <Experience />
        <ProjectGrid />
      </div>
    </main>
  );
}
