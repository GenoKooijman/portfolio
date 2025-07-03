import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ICON_IMAGES } from "@/data/icons";

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

  const handleMouseMove = (i: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const block = blocksRef.current[i];
    if (!block) return;

    const rect = block.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 35;
    const rotateX = -((y - centerY) / centerY) * 35;

    gsap.to(block, {
      rotateY,
      rotateX,
      scale: 1.12, 
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = (i: number) => {
    const block = blocksRef.current[i];
    if (!block) return;

    gsap.to(block, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="skills"
      className="
        font-montserrat
      "
    >
      <h1 className="text-8xl font-bold uppercase mx-auto my-12 px-4 sm:my-16 sm:px-8 md:my-24 md:px-24">skills</h1>
      <div className="
        w-full
        min-h-[60vh]
        grid
        gap-0
        grid-cols-2
        grid-rows-6
        sm:grid-cols-3 sm:grid-rows-4
        md:grid-cols-5 md:grid-rows-3
        md:h-[120vh]">
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
              hover:bg-white transition-colors hover:shadow-xl
              rounded-lg
              will-change-transform
            "
            onMouseMove={e => handleMouseMove(i, e)}
            onMouseLeave={() => handleMouseLeave(i)}
            style={{ perspective: 800 }}
          >
            <img
              src={`/img/homeimg/${img}`}
              alt={img.replace('.png', '')}
              className="w-20 h-16 sm:w-20 sm:h-20 md:w-auto md:h-[50%] md:object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
