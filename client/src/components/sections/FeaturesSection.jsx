import React from "react";

export const FeaturesSection = () => (
  <section
    id="features"
    className="py-20 bg-gradient-to-b from-slate-900 to-slate-800"
  >
    <div className="max-w-7xl mx-auto px-6">
      {/* Бейдж */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-teal-400 text-sm">
          ⚡ Переваги
        </div>
      </div>

      {/* Заголовок */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
        Все для твого прогресу
      </h2>

      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
        Сучасна інфраструктура та комфортні умови для досягнення найкращих
        результатів
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, i) => (
          <FeatureCard key={i} {...item} />
        ))}
      </div>
    </div>
  </section>
);

const features = [
  {
    icon: "🏋️‍♂️",
    title: "Тренажерний зал",
    desc: "300+ кв.м вільного простору",
    detail: "Преміум обладнання",
  },
  {
    icon: "🧘‍♀️",
    title: "Групові програми",
    desc: "Йога, пілатес, зумба",
    detail: "10+ занять на тиждень",
  },
  {
    icon: "🥗",
    title: "Фітнес-бар",
    desc: "Смузі та протеїнові коктейлі",
    detail: "Натуральні інгредієнти",
  },
  {
    icon: "🧖‍♀️",
    title: "Сауна та SPA",
    desc: "Відновлення після тренувань",
    detail: "Фінська та інфрачервона",
  },
];

const FeatureCard = ({ icon, title, desc, detail }) => (
  <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-teal-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]">
    {/* Декоративний елемент */}
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal-400/0 via-teal-400/0 to-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    {/* Іконка */}
    <div className="relative w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
      <span className="text-4xl">{icon}</span>
    </div>

    {/* Заголовок */}
    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-teal-400 transition-colors duration-300">
      {title}
    </h3>

    {/* Опис */}
    <p className="text-slate-400 text-sm mb-3">{desc}</p>

    {/* Додаткова деталь */}
    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-teal-400 text-xs font-medium">
      {detail}
    </div>
  </div>
);
