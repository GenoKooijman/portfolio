import React, { useRef } from "react";
import { gsap } from "gsap";
import { projects } from "@/data/projectInfos";

export default function HomeProjects() {
  const descRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleEnter = (i: number) => {
    descRefs.current.forEach((desc, idx) => {
      if (desc && idx !== i) {
        gsap.killTweensOf(desc);
        gsap.to(desc, {
          opacity: 0,
          y: 20,
          height: 0,
          duration: 0.2,
          pointerEvents: "none",
        });
      }
    });
    const desc = descRefs.current[i];
    if (desc) {
      gsap.killTweensOf(desc);
      gsap.to(desc, {
        opacity: 1,
        y: 0,
        height: "auto",
        duration: 0.5,
        ease: "power3.out",
        pointerEvents: "auto",
      });
    }
  };

  const handleLeave = (i: number) => {
    const desc = descRefs.current[i];
    if (desc) {
      gsap.killTweensOf(desc);
      gsap.to(desc, {
        opacity: 0,
        y: 20,
        height: 0,
        duration: 0.3,
        ease: "power3.in",
        pointerEvents: "none",
      });
    }
  };

  React.useEffect(() => {
    projects.forEach((_, i) => {
      const desc = descRefs.current[i];
      if (desc) {
        gsap.set(desc, {
          opacity: 0,
          y: 20,
          height: 0,
          pointerEvents: "none",
        });
      }
    });
  }, [projects.length]);

  return (
    <section
      id="projects"
      className="mx-auto my-12 px-4 sm:my-16 sm:px-8 md:my-24 md:px-24 font-montserrat"
    >
      <h1 className="text-4xl sm:text-6xl md:text-8xl uppercase pb-4 sm:pb-6 font-bold">
        projects
      </h1>
      <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="flex flex-col w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] self-start rounded-2xl bg-white shadow-md min-w-0 p-4 transition-transform hover:scale-105 relative overflow-hidden min-h-[500px]"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            <img
              src={project.image}
              alt={project.name}
              className="h-40 sm:h-52 md:h-64 w-full object-cover shadow-lg rounded-2xl mb-2"
            />
            <h1 className="text-xl sm:text-2xl font-semibold">
              {project.name}
            </h1>
            <div
              ref={(el) => {
                descRefs.current[i] = el;
              }}
              className="text-base sm:text-lg pl-1 sm:pl-2 overflow-hidden"
              style={{ willChange: "opacity, transform, height" }}
            >
              {project.desc}
            </div>
            <p className="text-base sm:text-lg font-semibold pl-2 sm:pl-3 pb-2 sm:pb-3 mt-2">
              Skills used
            </p>
            <ul className="flex flex-row gap-2 pl-2 sm:pl-3">
              {project.items.map((item, idx) => (
                <li key={idx}>
                  <img
                    src={item}
                    alt={`skill-${idx}`}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 shadow object-cover"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
