import { HomeSection } from "@/components/HomeSection";
import { NavBar } from "@/components/NavBar";
import { PersonalSection } from "@/components/PersonalSection";
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
        <PersonalSection />
      </main>
    </>
  );
}
