"use client";

import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { metadata } from "./metadata"; // Import metadata from a separate file
import "@styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Footer from "./footer/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("dark-mode") === "enabled") {
      document.body.classList.add("dark-mode");
    }

    const button = document.getElementById("dark-mode-toggle");
    if (button) {
      button.addEventListener("click", toggleDarkMode);
    }

    return () => {
      if (button) {
        button.removeEventListener("click", toggleDarkMode);
      }
    };
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Footer />
        <button
          id="dark-mode-toggle"
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        ></button>
      </body>
    </html>
  );
}
