import React from "react";

export const HeroSection = ({ onOpenModal }) => (
  <section className="relative py-24 overflow-hidden bg-gradient-to-t from-slate-800 to-slate-900">
    <div className="relative grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto px-6">
      {/* ЛІВА СТОРОНА */}
      <div className="text-white">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
          bg-white/5 backdrop-blur-sm border border-white/10 text-slate-300 text-sm mb-6"
        >
          🌿 Premium fitness club
        </div>

        <h1 className="text-5xl md:text-6xl font-black leading-tight">
          Побудуй тіло{" "}
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            нового рівня
          </span>
        </h1>

        <p className="mt-6 text-slate-300 text-lg leading-relaxed max-w-xl">
          Сучасний фітнес-клуб з персональними тренуваннями, преміум обладнанням
          та системним підходом до твого прогресу.
        </p>

        {/* КНОПКИ */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => onOpenModal("free", "Безкоштовне тренування")}
            className="px-8 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-teal-500 to-cyan-500 
            hover:from-teal-400 hover:to-cyan-400
            shadow-[0_0_25px_rgba(20,184,166,0.3)]
            transition-all active:scale-95"
          >
            Почати безкоштовно
          </button>

          <button
            className="px-8 py-3 rounded-xl font-semibold text-slate-300
            border border-white/15 hover:border-teal-400/50 hover:text-white
            transition-all backdrop-blur-sm"
          >
            Дізнатись більше
          </button>
        </div>

        {/* СТАТИСТИКА */}
        <div className="grid grid-cols-3 gap-6 mt-12">
          <Stat number="500+" label="клієнтів" />
          <Stat number="15" label="тренерів" />
          <Stat number="24/7" label="доступ" />
        </div>
      </div>

      {/* ПРАВА СТОРОНА */}
      <div className="relative flex items-center justify-center">
        <div
          className="h-[420px] w-full rounded-3xl
          bg-white/5 backdrop-blur-sm border border-white/10
          flex items-center justify-center
          shadow-[0_0_60px_rgba(0,0,0,0.4)]
          transition-all duration-300 hover:border-teal-400/30
        "
        >
          <span className="text-8xl drop-shadow-lg">🏋️</span>
        </div>

        {/* ПЛАВАЮЧИЙ БЕЙДЖ */}
        <div
          className="absolute bottom-[-20px] left-6 
          bg-white/10 backdrop-blur-md border border-white/15
          px-4 py-2 rounded-xl text-sm text-slate-300
          shadow-lg"
        >
          📊 Progress tracking
        </div>
      </div>
    </div>
  </section>
);

const Stat = ({ number, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
      {number}
    </div>
    <div className="text-slate-400 text-sm">{label}</div>
  </div>
);
