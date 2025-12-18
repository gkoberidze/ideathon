'use client';

import Link from "next/link";

export default function Navbar({ toggleTheme, toggleLang, lang, t }: any) {
  return (
    <nav className="flex justify-between items-center p-4 shadow-sm bg-white/70 dark:bg-gray-800/70 backdrop-blur-md sticky top-0 z-10">
      <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
        EduConnect Georgia
      </h1>

      <div className="flex gap-6 text-sm">
        <Link href="/" className="hover:text-purple-500 transition">
          {t.nav?.home ?? 'Home'}
        </Link>
        <Link href="/tutors" className="hover:text-purple-500 transition">
          {t.nav?.tutors ?? 'Tutors'}
        </Link>
        <Link href="/students" className="hover:text-purple-500 transition">
          {t.nav?.students ?? 'Students'}
        </Link>
        <Link href="/profile" className="hover:text-purple-500 transition">
          {t.nav?.profile ?? 'Profile'}
        </Link>
        <Link href="/about" className="hover:text-purple-500 transition">
          {t.nav?.about ?? 'About'}
        </Link>
        <Link href="/example" className="hover:text-purple-500 transition">
          {t.nav?.example ?? 'Free lesson'}
        </Link>
      </div>

      <div className="flex gap-3 items-center">
        <button
          onClick={toggleLang}
          className="px-3 py-1 rounded-full text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90"
          aria-label="Toggle language"
        >
          {t.languageSwitch ?? 'KA / EN'}
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90"
        >
          {t.changeAppearance}
        </button>
      </div>
    </nav>
  );
}
