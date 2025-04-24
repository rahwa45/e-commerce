"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Load saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark-mode");
      setIsDark(true);
    }
  }, []);

  // Toggle dark mode on body
  const toggleDarkMode = () => {
    const body = document.body;
    const isCurrentlyDark = body.classList.contains("dark-mode");

    if (isCurrentlyDark) {
      body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <nav className="p-4 fixed top-0 w-full shadow-sm z-50 navbar">
      <div className="max-w-7xl mx-auto flex justify-between items-center font-bold ">
        <Link href="/" className="text-2xl font-bold logo">
          ambar
        </Link>

        {/* Hamburger icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl humbergur"
          >
            ☰
          </button>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex space-x-6 gap-4">
          <Link href="/" className="hover:font-semibold">
            Home
          </Link>
          <Link href="/products" className="hover:font-normal">
            Products
          </Link>
          <Link href="/signup">Signup/Signin</Link>
          <button onClick={toggleDarkMode}>{isDark ? "🌙" : "☀"}</button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-start space-y-2 px-4 py-2 mt-2 shadow-md bg-white dark-mode:bg-[#333] list">
          <Link href="/" className="hover:font-semibold">
            Home
          </Link>
          <Link href="/products" className="hover:font-semibold">
            Products
          </Link>
          <Link href="/signup">Signup/Signin</Link>
          <button onClick={toggleDarkMode}>{isDark ? "🌙" : "☀"}</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
