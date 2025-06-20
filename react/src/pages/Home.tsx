import HomeHero from "@/components/home/HomeHero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeSkills from "@/components/home/HomeSkills";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <HomeAbout />
      <HomeSkills />
    </main>
  );
}
