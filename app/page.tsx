import { HomeSection } from "@/components/HomeSection";
import { NavBar } from "@/components/NavBar";
import { ProjectsSection } from "@/components/ProjectsSection";
import { WorkSection } from "@/components/WorkSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="flex-1">
        <HomeSection />
        <ProjectsSection />
        <WorkSection />
      </main>
    </>
  );
}
