import React from "react";

export const PricingSection = ({ onOpenModal }) => (
  <section
    id="pricing"
    className="py-20 bg-gradient-to-b from-slate-800 to-slate-900"
  >
    <div className="max-w-7xl mx-auto px-6">
      {/* Бейдж */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-teal-400 text-sm">
          💎 Тарифи
        </div>
      </div>

      {/* Заголовок */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
        Обери свій абонемент
      </h2>

      <p className="text-slate-400 text-center max-w-2xl mx-auto mb-16">
        Гнучка система тарифів для будь-яких цілей та бюджету
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <PricingCard key={i} {...card} onOpenModal={onOpenModal} />
        ))}
      </div>
    </div>
  </section>
);

const cards = [
  {
    title: "Старт",
    price: "999",
    features: [
      { text: "Тренажерний зал 08:00-23:00", included: true },
      { text: "2 групових тренування", included: true },
      { text: "Персональний тренер", included: false },
      { text: "Сауна", included: false },
      { text: "Фітнес-бар", included: false },
    ],
  },
  {
    title: "Оптимум",
    price: "1599",
    isPopular: true,
    features: [
      { text: "Цілодобовий доступ", included: true },
      { text: "Всі групові програми", included: true },
      { text: "1 консультація з тренером", included: true },
      { text: "Сауна (2 рази на місяць)", included: true },
      { text: "Фітнес-бар (знижка 10%)", included: true },
    ],
  },
  {
    title: "VIP",
    price: "2999",
    features: [
      { text: "Цілодобовий доступ", included: true },
      { text: "Всі послуги клубу", included: true },
      { text: "8 персональних тренувань", included: true },
      { text: "SPA-зона без ліміту", included: true },
      { text: "Фітнес-бар включено", included: true },
    ],
  },
];

const PricingCard = ({ title, price, features, isPopular, onOpenModal }) => (
  <div
    className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(20,184,166,0.15)] ${
      isPopular
        ? "border-teal-400/50 shadow-[0_0_30px_rgba(20,184,166,0.2)] scale-105"
        : "border-white/10 hover:border-teal-400/30"
    }`}
  >
    {/* Популярний бейдж */}
    {isPopular && (
      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-5 py-1.5 rounded-full text-xs font-semibold shadow-lg">
          ⭐ Найпопулярніший
        </div>
      </div>
    )}

    {/* Декоративний градієнт зверху */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    <h3 className="text-2xl font-bold mb-2 text-white text-center">{title}</h3>

    <p className="text-slate-500 text-sm text-center mb-6">
      {isPopular ? "Найкраще співвідношення" : "Прозорі умови"}
    </p>

    <div className="text-center mb-8 pb-6 border-b border-white/10">
      <span className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
        {price}
      </span>
      <span className="text-slate-400 ml-1">₴/міс</span>
    </div>

    <ul className="space-y-3 mb-8">
      {features.map((f, i) => (
        <li
          key={i}
          className={`flex items-center gap-2 text-sm transition-all duration-300 group-hover:translate-x-1 ${
            f.included ? "text-slate-300" : "text-slate-500 line-through"
          }`}
        >
          <span className="flex-shrink-0 w-5 h-5">
            {f.included ? (
              <svg
                className="w-5 h-5 text-teal-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-slate-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </span>
          <span>{f.text}</span>
        </li>
      ))}
    </ul>

    <button
      onClick={() => onOpenModal("membership", title)}
      className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 active:scale-95 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-[0_0_20px_rgba(20,184,166,0.3)]"
    >
      Обрати {title}
    </button>
  </div>
);
