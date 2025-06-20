import { Link, useLocation } from "react-router-dom";
import { navItems } from "@/data/navItems";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const location = useLocation();
  const headerRef = useRef<HTMLHeadingElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const burgerLine1 = useRef<HTMLDivElement>(null);
  const burgerLine2 = useRef<HTMLDivElement>(null);
  const burgerLine3 = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(
          menuRef.current.children,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.outl" }
        );
      }
    }

    gsap.to(burgerLine1.current, {
      rotate: isMenuOpen ? 45 : 0,
      y: isMenuOpen ? 8 : 0,
      duration: 0.3,
    });
    gsap.to(burgerLine2.current, {
      opacity: isMenuOpen ? 0 : 1,
      duration: 0.3,
    });
    gsap.to(burgerLine3.current, {
      rotate: isMenuOpen ? -45 : 0,
      y: isMenuOpen ? -8 : 0,
      duration: 0.3,
    });
  }, [isMenuOpen]);

  return (
    <header ref={headerRef} id="main-header">
      <nav>
        <div className="relative flex items-center justify-between w-full h-24 px-4">
          <a href="/" className="z-20">
            <img src="img/logos/gkblacklogo.png" alt="logo" className="h-18" />
          </a>

          <div
            className="md:hidden z-20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div
              ref={burgerLine1}
              className="w-8 h-1 bg-black my-1 transition-all"
            />
            <div
              ref={burgerLine2}
              className="w-8 h-1 bg-black my-1 transition-all"
            />
            <div
              ref={burgerLine3}
              className="w-8 h-1 bg-black my-1 transition-all"
            />
          </div>

          <ul className="hidden md:flex justify-center gap-12 font-normal w-full">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <li
                  className={`text-black text-3xl font-semibold font-montserrat ${
                    isActive ? "border-b-2 border-black" : ""
                  }`}
                  key={item.to}
                >
                  <Link to={item.to}>{item.label}</Link>
                </li>
              );
            })}
          </ul>

          {isMenuOpen && (
            <ul
              ref={menuRef}
              className="md:hidden absolute top-24 left-0 w-full bg-white flex flex-col items-center gap-6 py-6 shadow-lg z-10"
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <li
                    className={`text-black text-2xl font-semibold font-montserrat ${
                      isActive ? "border-b-2 border-black" : ""
                    }`}
                    key={item.to}
                  >
                    <Link to={item.to} onClick={() => setIsMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
