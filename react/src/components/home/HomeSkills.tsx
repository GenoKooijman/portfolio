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
      id="skills"
      className="
        w-full
        min-h-[60vh]
        grid
        gap-0
        grid-cols-2
        grid-rows-6
        sm:grid-cols-3 sm:grid-rows-4
        md:grid-cols-5 md:grid-rows-3
        md:h-[120vh]
      "
    >
      {ICON_IMAGES.map((img, i) => (
        <div
          key={i}
          ref={el => {
            if (el) blocksRef.current[i] = el;
          }}
          className="
            flex items-center justify-center
            w-full h-32
            sm:h-36
            md:h-full
            hover:bg-gray-200 transition-colors shadow-lg
            rounded-lg
          "
        >
          <img
            src={`/img/homeimg/${img}`}
            alt={img.replace('.png', '')}
            className="w-20 h-16 sm:w-20 sm:h-20 md:w-auto md:h-[50%] md:object-cover"
          />
        </div>
      ))}
    </section>
  );
}
