import HomeHero from "@/components/home/HomeHero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeSkills from "@/components/home/HomeSkills";
import HomeProjects from "@/components/home/HomeProjects";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeAbout />
      <HomeProjects />
      <HomeSkills />
    </main>
  );
}
