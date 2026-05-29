import React from "react";

export const AboutSection = () => (
  <section
    id="about"
    className="py-20 bg-gradient-to-b from-slate-800 to-slate-900"
  >
    <div className="max-w-7xl mx-auto px-6">
      {/* Бейдж */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-teal-400 text-sm">
          ✨ Про нас
        </div>
      </div>

      {/* Заголовок */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
        Чому обирають нас
      </h2>

      <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-16">
        FitPower — це не просто тренажерний зал. Це спільнота однодумців, де
        кожен знаходить шлях до кращої версії себе.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {aboutItems.map((item, i) => (
          <AboutCard key={i} {...item} />
        ))}
      </div>
    </div>
  </section>
);

const aboutItems = [
  {
    icon: "🏆",
    title: "Професійні тренери",
    desc: "Сертифіковані тренери з міжнародним досвідом та індивідуальним підходом",
    detail: "ISSA, NASM, CrossFit Level 1",
  },
  {
    icon: "🆕",
    title: "Сучасне обладнання",
    desc: "Преміум тренажери від світових брендів Technogym та Hammer Strength",
    detail: "Оновлення щороку",
  },
  {
    icon: "📊",
    title: "Індивідуальний підхід",
    desc: "Персональні програми тренувань та харчування з регулярним моніторингом прогресу",
    detail: "Body Scan аналіз",
  },
];

const AboutCard = ({ icon, title, desc, detail }) => (
  <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-teal-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]">
    {/* Декоративний градієнтний круг ззаду */}
    <div className="absolute -top-3 -right-3 w-20 h-20 bg-teal-400/10 rounded-full blur-2xl group-hover:bg-teal-400/20 transition-all duration-300" />

    {/* Іконка */}
    <div className="relative w-16 h-16 mb-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
      <span className="text-3xl">{icon}</span>
    </div>

    {/* Заголовок */}
    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-teal-400 transition-colors duration-300">
      {title}
    </h3>

    {/* Опис */}
    <p className="text-slate-400 leading-relaxed mb-4">{desc}</p>

    {/* Додаткова деталь */}
    <div className="pt-4 mt-2 border-t border-white/10">
      <span className="text-xs text-teal-400/80 font-medium">{detail}</span>
    </div>

    {/* Анімована лінія при ховері */}
    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-500" />
  </div>
);
