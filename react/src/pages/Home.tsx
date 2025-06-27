import HomeHero from "@/components/home/HomeHero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeSkills from "@/components/home/HomeSkills";
import HomeProjects from "@/components/home/HomeProjects";
import HomeContact from "@/components/home/HomeContact";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeAbout />
      <HomeProjects />
      <HomeSkills />
      <HomeContact />
    </main>
  );
}
