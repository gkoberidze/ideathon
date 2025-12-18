'use client';

import { useState, useEffect } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { translations } from "./translations";
import { LanguageProvider } from "@/lib/i18n";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState<"ka" | "en">("ka");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    const rawLang = localStorage.getItem("lang");
    const storedLang: "ka" | "en" = rawLang === "ka" || rawLang === "en" ? rawLang : "ka";
    setTheme(storedTheme);
    setLang(storedLang);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const toggleLang = () => {
    const next = lang === "ka" ? "en" : "ka";
    setLang(next);
    localStorage.setItem("lang", next);
  };

  const t = (translations as any)[lang] ?? (translations as any).ka;

  return (
    <html lang={lang}>
      <body
        className={`min-h-screen overflow-x-hidden overflow-y-auto transition-colors duration-500 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900"
        }`}
      >
        <LanguageProvider lang={lang} t={t}>
          <div className="flex min-h-screen flex-col">
            <Navbar toggleTheme={toggleTheme} toggleLang={toggleLang} lang={lang} t={t} />
            <main className="flex-1 w-full overflow-visible">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}

