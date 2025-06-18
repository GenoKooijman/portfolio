import { Link, useLocation } from "react-router-dom";
import { navItems } from "@/data/navItems";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <nav>
        <div className="relative flex items-center w-full h-24">
          <a href="/" className="absolute left-0 top-1/2 -translate-y-1/2">
            <img src="img/logos/gkblacklogo.png" alt="logo" className="h-18" />
          </a>
          <ul className="flex justify-center gap-12 font-normal w-full">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <li
                  className={`text-black text-2xl font-montserrat ${
                    isActive ? "border-b-2 border-black" : ""
                  }`}
                  key={item.to}
                >
                  <Link to={item.to}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
