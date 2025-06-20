import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    let textAnim: gsap.core.Tween | undefined;
    let imagesAnim: gsap.core.Tween | undefined;

    if (textRef.current) {
      textAnim = gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "power2.out",
          scrolltrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
            scroller: document.body,
          },
        }
      );
    }
    if (imagesRef.current && textRef.current) {
      imagesAnim = gsap.fromTo(
        imagesRef.current.children,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.4,
          ease: "power2.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            end: "bottom 10%",
            toggleActions: "play none none none",
            scroller: document.body,
          },
        }
      );
    }

    return () => {
      textAnim?.scrollTrigger?.kill();
      imagesAnim?.scrollTrigger?.kill();
    };
  }, []);


  return (
    <section
      ref={sectionRef}
      className="mx-auto my-24 max-w-5xl px-6 font-montserrat"
    >
      <h1 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-tight text-center md:text-left">
        About
      </h1>
      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div
          ref={textRef}
          className="flex-1 text-lg text-gray-700 leading-relaxed bg-white/80 rounded-2xl shadow-md p-8 py-23"
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi
            consectetur nisi, euismod euismod nisi nisi euismod.
            <br />
            <br />
            Mauris non tempor quam, et lacinia sapien. Mauris accumsan eros eget
            libero posuere vulputate. Etiam elit elit, elementum sed varius at,
            adipiscing vitae est. Sed nec felis pellentesque, lacinia dui sed,
            ultricies sapien.
          </p>
        </div>
        <div
          ref={imagesRef}
          className="flex-1 flex flex-col gap-4 items-center md:items-end w-full"
        >
            <div className="flex gap-4 w-full justify-center md:justify-end">
                <img
                src="img/homeimg/Kayak.png"
                alt="dummy1"
                className="rounded-xl shadow-lg w-39 h-28 object-cover"
                />
                <img
                src="img/homeimg/Kayak.png"
                alt="dummy2"
                className="rounded-xl shadow-lg w-39 h-28 object-cover"
                />
            </div>
          <div className="w-full flex justify-center md:justify-end">
            <img
              src="img/homeimg/Kayak.png"
              alt="dummy3"
              className="rounded-xl shadow-lg w-max h-82 object-cover mt-4"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
