import { useEffect, useState } from "react";
import { FaStarOfLife } from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-24 flex items-center z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md text-gray-900"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container ">
        <div className="flex items-center gap-2 text-[#19C0FF]">
          <span className="flex items-center justify-center font-bold">
            <FaStarOfLife size={40} />
          </span>
          <span className="text-xl sm:text-2xl md:text-[28px] font-bold">
            Tripzy
          </span>
        </div>
      </div>
    </nav>
  );
}
