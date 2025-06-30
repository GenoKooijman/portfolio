import viteImg from "@/assets/vite.png";
import reactImg from "@/assets/react.png";
import gsapImg from "@/assets/gsap.png";
import svelteImg from "@/assets/svelte.png";
import mysqlImg from "@/assets/mysql.png";
import phpImg from "@/assets/php.png";
import wordpressImg from "@/assets/wordpress.png";
import bunImg from "@/assets/bun.png";
import typescriptImg from "@/assets/typescript.png";
import kayakImg from "@/assets/Kayak.png";

export interface ProjectInfo {
  name: string;
  desc: string;
  items: string[];
  image: string;
  link: string; 
}

export const projects: ProjectInfo[] = [
  {
    name: "LoveUfestival",
    desc: "A modern, responsive website demo showcasing clean design, smooth navigation, and dynamic content.",
    items: [viteImg, reactImg, gsapImg],
    image: kayakImg,
    link: "https://gsap.com/", 
  },
  {
    name: "Happy Herbivore",
    desc: "A modern, responsive website demo showcasing clean design, smooth navigation, and dynamic content.",
    items: [svelteImg, mysqlImg, phpImg],
    image: kayakImg,
    link: "https://gsap.com/",
  },
  {
    name: "Bureau Webshop",
    desc: "A modern, responsive website demo showcasing clean design, smooth navigation, and dynamic content.",
    items: [svelteImg, wordpressImg, bunImg],
    image: kayakImg,
    link: "https://gsap.com/",
  },
  {
    name: "Portfolio",
    desc: "A modern, responsive website demo showcasing clean design, smooth navigation, and dynamic content.",
    items: [reactImg, typescriptImg, gsapImg],
    image: kayakImg,
    link: "https://gsap.com/",
  },
];
