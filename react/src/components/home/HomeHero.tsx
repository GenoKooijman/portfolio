import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HomeHero() {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current.children,
        {y: 60, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 1.1,  
          stagger: 0.2,
          ease: "expo.out",
        }
      )
    }
  }, []);

  return (
    <section
     id="hero"
     ref={textRef}
     className="flex flex-col mx-12 my-24 md:mx-24 md:my-48 font-montserrat"
     >
      <h1 className="text-6xl md:text-8xl font-bold">Geno</h1>
      <h2 className="text-6xl md:text-8xl font-bold">Kooijman</h2>
      <p className="text-lg md:text-xl font-bold pt-1">Passionate Web Developer</p>
    </section>
  );
}
