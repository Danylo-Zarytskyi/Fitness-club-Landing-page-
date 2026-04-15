import React from "react";

// Header Component
export const Header = ({ onOpenModal }) => (
  <header className="flex justify-between items-center py-6 flex-wrap">
    <div className="flex items-center gap-2 group">
      <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
        💪
      </span>
      <span className="text-2xl font-bold text-gray-800 group-hover:text-red-500 transition-colors duration-300">
        FitPower
      </span>
    </div>

    <nav className="hidden md:flex gap-8">
      {["Про нас", "Переваги", "Абонементи", "Контакти"].map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase()}`}
          className="text-gray-600 hover:text-red-500 hover:scale-110 transition-all duration-300"
        >
          {item}
        </a>
      ))}
    </nav>

    <button
      onClick={() => onOpenModal("free", "Безкоштовне тренування")}
      className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Записатись
    </button>
  </header>
);

// Hero Section
export const HeroSection = ({ onOpenModal }) => (
  <section className="grid md:grid-cols-2 gap-12 items-center py-16">
    <div className="animate-[fadeIn_1s_ease-out]">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        Твоє тіло{" "}
        <span className="text-red-500 relative inline-block hover:scale-105 transition-transform duration-300">
          нового рівня
        </span>
      </h1>
      <p className="text-lg text-gray-600 mt-4 mb-8 animate-[slideUp_0.8s_ease-out]">
        Сучасний фітнес-клуб з професійними тренерами, новітнім обладнанням та
        індивідуальним підходом
      </p>

      <div className="flex flex-wrap gap-4 mb-10">
        <button
          onClick={() => onOpenModal("free", "Безкоштовне тренування")}
          className="bg-red-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-600 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Спробувати безкоштовно
        </button>
      </div>

      <StatsSection />
    </div>

    <div className="bg-gradient-to-br from-red-400 to-purple-600 h-[400px] rounded-2xl flex items-center justify-center hover:scale-105 hover:rotate-1 transition-all duration-500">
      <span className="text-8xl animate-pulse">🏋️</span>
    </div>
  </section>
);

const StatsSection = () => {
  const stats = [
    { number: "500+", label: "клієнтів" },
    { number: "15", label: "тренерів" },
    { number: "24/7", label: "доступ" },
  ];

  return (
    <div className="flex gap-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="hover:scale-110 transition-transform duration-300"
        >
          <span className="text-3xl font-bold text-red-500">{stat.number}</span>
          <span className="block text-gray-600">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

// About Section
export const AboutSection = () => (
  <section id="about" className="py-20 bg-gray-50 -mx-4 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 hover:scale-105 transition-transform duration-300 origin-left">
        Чому обирають нас
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mb-12">
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
    desc: "Сертифіковані тренери з міжнародним досвідом",
  },
  {
    icon: "🆕",
    title: "Сучасне обладнання",
    desc: "Преміум тренажери від світових брендів",
  },
  {
    icon: "📊",
    title: "Індивідуальний підхід",
    desc: "Персональні програми тренувань та харчування",
  },
];

const AboutCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
    <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3 group-hover:text-red-500 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

// Features Section
export const FeaturesSection = () => (
  <section id="features" className="py-20">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 hover:scale-105 transition-transform duration-300">
      Все для твого прогресу
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((item, i) => (
        <FeatureCard key={i} {...item} />
      ))}
    </div>
  </section>
);

const features = [
  {
    icon: "🏋️‍♂️",
    title: "Тренажерний зал",
    desc: "300+ кв.м вільного простору",
  },
  {
    icon: "🧘‍♀️",
    title: "Групові програми",
    desc: "Йога, пілатес, зумба",
  },
  {
    icon: "🥗",
    title: "Фітнес-бар",
    desc: "Смузі та протеїнові коктейлі",
  },
  {
    icon: "🧖‍♀️",
    title: "Сауна та SPA",
    desc: "Відновлення після тренувань",
  },
];

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-xl hover:scale-105 transition-all duration-300 group">
    <div className="text-5xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
      {title}
    </h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);
