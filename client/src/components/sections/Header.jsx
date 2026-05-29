import React, { useState } from "react";

export const Header = ({ onOpenModal }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full flex justify-between items-center py-4 px-6 md:px-12 bg-slate-900/80 backdrop-blur-md border-b border-teal-400/20 sticky top-0 z-50">
      {/* LOGO */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25 group-hover:scale-110 transition duration-300">
          <span className="text-xl">💪</span>
        </div>

        <div className="flex flex-col leading-tight">
          <span className="text-xl font-black text-white group-hover:text-teal-400 transition duration-300">
            FitPower
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">
            fitness club
          </span>
        </div>
      </div>

      {/* DESKTOP NAVIGATION */}
      <nav className="hidden md:flex gap-8">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={`#${item.href}`}
            className="relative text-slate-300 hover:text-white transition group text-sm font-medium"
          >
            {item.label}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </a>
        ))}
      </nav>

      {/* DESKTOP CTA */}
      <button
        onClick={() => onOpenModal("free", "Безкоштовне тренування")}
        className="hidden md:block px-6 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] active:scale-95"
      >
        Записатись
      </button>

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1.5 hover:border-teal-400/30 transition-all duration-300"
      >
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-teal-400/20 py-4 px-6 flex flex-col gap-3 md:hidden animate-in slide-in-from-top-2 duration-300">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={`#${item.href}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-300 hover:text-teal-400 transition py-2 text-base font-medium border-b border-white/5"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenModal("free", "Безкоштовне тренування");
            }}
            className="w-full mt-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 active:scale-95"
          >
            Записатись
          </button>
        </div>
      )}
    </header>
  );
};

const navItems = [
  { label: "Про нас", href: "about" },
  { label: "Переваги", href: "features" },
  { label: "Абонементи", href: "pricing" },
  { label: "Контакти", href: "contact" },
];
