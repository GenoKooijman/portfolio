import React, { useRef } from "react";
import { gsap } from "gsap";
import { projects } from "@/data/projectInfos";

export default function HomeProjects() {
  const descRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const checkRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const listRefs = useRef<(HTMLUListElement | null)[]>([]);

  const handleEnter = (i: number) => {
    const targets = [
      descRefs.current[i],
      checkRefs.current[i],
      listRefs.current[i],
    ];
    gsap.killTweensOf(targets);
    gsap.to(targets, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.5,
      delay: 0.1,
      ease: "power3.out",
    });
  };

  const handleLeave = (i: number) => {
    const targets = [
      descRefs.current[i],
      checkRefs.current[i],
      listRefs.current[i],
    ];
    gsap.killTweensOf(targets);
    gsap.to(targets, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power3.in",
    });
  };

  React.useEffect(() => {
    projects.forEach((_, i) => {
      gsap.set(
        [descRefs.current[i], checkRefs.current[i], listRefs.current[i]],
        {
          opacity: 0,
          y: 20,
        }
      );
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
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl bg-white shadow-md min-w-0 p-4 transition-transform hover:scale-105"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            <img
              src="/img/homeimg/Kayak.png"
              alt="testimg"
              className="h-40 sm:h-52 md:h-64 w-full object-cover shadow-lg rounded-2xl mb-2"
            />
            <h1 className="text-xl sm:text-2xl font-semibold">
              {project.name}
            </h1>
            <h2
              className="text-base sm:text-lg pl-1 sm:pl-2"
              ref={(el) => {
                descRefs.current[i] = el;
              }}
            >
              {project.desc}
            </h2>
            <p
              className="text-base sm:text-lg font-semibold pl-2 sm:pl-3 pb-2 sm:pb-3"
              ref={(el) => {
                checkRefs.current[i] = el;
              }}
            >
              Skills used
            </p>
            <ul
              className="flex flex-row gap-2 pl-2 sm:pl-3"
              ref={(el) => {
                listRefs.current[i] = el;
              }}
            >
              {project.items.map((item, idx) => (
                <li key={idx}>
                  <img
                    src={item}
                    alt={`tech-${idx}`}
                    className="w-full h-full sm:w-10 sm:h-10 rounded-full border border-gray-200 shadow"
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
