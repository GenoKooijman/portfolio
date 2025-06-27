import viteImg from "@/../public/img/homeimg/vite.png";
import reactImg from "@/../public/img/homeimg/react.png";
import gsapImg from "@/../public/img/homeimg/gsap.png";
import svelteImg from "@/../public/img/homeimg/svelte.png";
import mysqlImg from "@/../public/img/homeimg/mysql.png";
import phpImg from "@/../public/img/homeimg/php.png";
import wordpressImg from "@/../public/img/homeimg/wordpress.png";
import bunImg from "@/../public/img/homeimg/bun.png";
import typescriptImg from "@/../public/img/homeimg/typescript.png";
import kayakImg from "@/../public/img/homeimg/Kayak.png";

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
