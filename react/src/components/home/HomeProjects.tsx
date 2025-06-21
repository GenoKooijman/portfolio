import React, { useRef } from "react";
import { gsap } from "gsap";
import { projects } from "@/data/projectInfos";

export default function HomeProjects() {
  const descRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const checkRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const listRefs = useRef<(HTMLUListElement | null)[]>([]);

  const handleEnter = (i: number) => {
  const targets = [descRefs.current[i], checkRefs.current[i], listRefs.current[i]];
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
  const targets = [descRefs.current[i], checkRefs.current[i], listRefs.current[i]];
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
      gsap.set([descRefs.current[i], checkRefs.current[i], listRefs.current[i]], {
        opacity: 0,
        y: 20,
      });
    });
  }, [projects.length]);

  return (
    <section className="mx-auto my-24 px-24 font-montserrat">
      <h1 className="text-8xl uppercase font-bold">projects</h1>
      <div className="flex flex-row gap-4">
        {projects.map((project, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl"
            onMouseEnter={() => handleEnter(i)}
            onMouseLeave={() => handleLeave(i)}
          >
            <img src="/img/homeimg/Kayak.png" alt="testimg" className="h-82 shadow-lg rounded-2xl" />
            <h1 className="text-2xl">{project.name}</h1>
            <h2
              className="text-lg"
              ref={el => { descRefs.current[i] = el; }}
            >
              {project.desc}
            </h2>
            <p
              className="text-lg"
              ref={el => { checkRefs.current[i] = el; }}
            >
              CHECK
            </p>
            <ul
              className="flex flex-col"
              ref={el => { listRefs.current[i] = el; }}
            >
              {project.items.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
