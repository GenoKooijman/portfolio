import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {ICON_IMAGES} from "@/data/icons";

gsap.registerPlugin(ScrollTrigger);

export default function HomeSkills() {
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    blocksRef.current.forEach((block, i) => {
      if (!block) return;

      gsap.set(block, { opacity: 0, y: 40 });

      ScrollTrigger.create({
        trigger: block,
        start: "top 90%",
        onEnter: () => {
          gsap.to(block, {
            opacity: 1,
            y: 0,
            delay: (i % 5) * 0.2,
            duration: 0.6,
            ease: "power3.out",
          });
        },
        once: true, 
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      id="skills-grid"
      className="w-full h-[120vh] grid grid-cols-5 grid-rows-3 gap-0"
    >
      {ICON_IMAGES.map((img, i) => (
        <div
          key={i}
          ref={el => {
            if (el) blocksRef.current[i] = el;
          }}
          className="flex items-center justify-center w-full h-full bg-white box-border hover:bg-gray-200 transition-colors shadow-lg"
        >
          <img
            src={`/img/homeimg/${img}`}
            alt={img.replace('.png', '')}
            className="w-auto h-[50%] object-cover"
          />
        </div>
      ))}
    </section>
  );
}
