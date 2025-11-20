"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 md:h-24 flex items-center z-50 transition-all ${
        isScrolled
          ? "bg-white shadow-md text-gray-900"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container ">
        <Link href="/">
          <img src="/logo.svg" alt="Tripzy" className="h-8 w-auto md:h-10" />
        </Link>
      </div>
    </nav>
  );
}
