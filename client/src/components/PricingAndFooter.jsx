import React from "react";

// Pricing Section
export const PricingSection = ({ onOpenModal }) => (
  <section id="pricing" className="py-20 bg-gray-50 -mx-4 px-4">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 hover:scale-105 transition-transform duration-300">
        Обери свій абонемент
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        <PricingCard
          title="Старт"
          price="999"
          features={[
            { text: "Тренажерний зал 08:00-23:00", included: true },
            { text: "2 групових тренування", included: true },
            { text: "Персональний тренер", included: false },
            { text: "Сауна", included: false },
          ]}
          onSelect={() => onOpenModal("membership", "Старт")}
        />

        <PricingCard
          title="Оптимум"
          price="1599"
          isPopular={true}
          features={[
            { text: "Цілодобовий доступ", included: true },
            { text: "Всі групові програми", included: true },
            { text: "1 консультація з тренером", included: true },
            { text: "Сауна (2 рази на місяць)", included: true },
          ]}
          onSelect={() => onOpenModal("membership", "Оптимум")}
        />

        <PricingCard
          title="VIP"
          price="2999"
          features={[
            { text: "Цілодобовий доступ", included: true },
            { text: "Всі послуги клубу", included: true },
            { text: "8 персональних тренувань", included: true },
            { text: "SPA-зона без ліміту", included: true },
          ]}
          onSelect={() => onOpenModal("membership", "VIP")}
        />
      </div>
    </div>
  </section>
);

const PricingCard = ({ title, price, features, isPopular, onSelect }) => (
  <div
    className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ${
      isPopular ? "border-2 border-red-500 transform scale-105 relative" : ""
    }`}
  >
    {isPopular && (
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-6 py-1 rounded-full text-sm animate-pulse">
        Найпопулярніший
      </div>
    )}
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <div className="mb-6">
      <span className="text-4xl font-bold text-red-500">{price}</span>
      <span className="text-gray-500">₴/міс</span>
    </div>
    <ul className="space-y-3 mb-8">
      {features.map((feature, i) => (
        <li
          key={i}
          className={`flex items-center gap-2 hover:translate-x-2 transition-transform duration-300 ${
            !feature.included ? "text-gray-400" : ""
          }`}
        >
          {feature.included ? "✅" : "❌"} {feature.text}
        </li>
      ))}
    </ul>
    <button
      onClick={onSelect}
      className={`w-full py-3 rounded-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-300 ${
        isPopular
          ? "bg-red-500 text-white hover:bg-red-600"
          : "border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      }`}
    >
      Обрати
    </button>
  </div>
);

// Lead Form Section
export const LeadFormSection = ({ onOpenModal }) => (
  <section className="py-20 grid md:grid-cols-2 gap-12 items-center">
    <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300">
      <h2 className="text-3xl font-bold mb-3 hover:scale-105 transition-transform duration-300 origin-left">
        Отримай безкоштовне тренування
      </h2>
      <p className="text-gray-600 mb-6">
        Заповни форму і ми підберемо для тебе ідеальну програму
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Ім'я"
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:scale-[1.02] transition-all duration-300"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:scale-[1.02] transition-all duration-300"
          required
        />
        <input
          type="tel"
          placeholder="Телефон"
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 focus:scale-[1.02] transition-all duration-300"
          required
        />
        <button
          type="button"
          onClick={() => onOpenModal("free", "Безкоштовне тренування")}
          className="w-full bg-red-500 text-white py-4 rounded-lg font-semibold text-lg hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          Записатись
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-4">
        Натискаючи кнопку, ви погоджуєтесь на обробку персональних даних
      </p>
    </div>

    <div className="bg-gradient-to-br from-green-400 to-blue-500 h-[400px] rounded-2xl flex items-center justify-center hover:scale-105 hover:-rotate-1 transition-all duration-500">
      <span className="text-8xl animate-bounce">📝</span>
    </div>
  </section>
);

// Testimonials Section
export const TestimonialsSection = () => (
  <section className="py-20">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 hover:scale-105 transition-transform duration-300">
      Нас рекомендують
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {testimonials.map((item, i) => (
        <TestimonialCard key={i} {...item} />
      ))}
    </div>
  </section>
);

const testimonials = [
  {
    text: "Найкращий фітнес-клуб у місті! За 3 місяці скинув 8 кг.",
    author: "Андрій К.",
    avatar: "👤",
  },
  {
    text: "Дуже подобаються групові заняття та сучасне обладнання.",
    author: "Олена Ш.",
    avatar: "👩",
  },
  {
    text: "Персональний тренер склав ідеальну програму.",
    author: "Максим Б.",
    avatar: "👨",
  },
];

const TestimonialCard = ({ text, author, avatar }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
    <p className="text-gray-600 italic mb-4 group-hover:text-red-500 transition-colors duration-300">
      "{text}"
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-red-100 transition-all duration-300">
        {avatar}
      </div>
      <div>
        <h4 className="font-bold group-hover:text-red-500 transition-colors duration-300">
          {author}
        </h4>
        <p className="text-sm text-gray-500">клієнт FitPower</p>
      </div>
    </div>
  </div>
);

// Footer - ось він! Додай цей компонент
export const Footer = () => (
  <footer id="contact" className="text-white -mx-4 px-4 py-16 mt-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-4 group">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
              💪
            </span>
            <span className="text-2xl font-bold group-hover:text-red-500 transition-colors duration-300">
              FitPower
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            Твій шлях до ідеального тіла починається тут
          </p>
          <div className="flex gap-4">
            {["📱", "📘", "📷"].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="text-2xl hover:text-red-500 hover:scale-110 transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4 text-red-500 hover:scale-105 transition-transform duration-300 origin-left">
            Контакти
          </h4>
          <p className="text-gray-400 mb-2 hover:translate-x-2 transition-transform duration-300">
            📍 вул. Спортивна, 25, Київ
          </p>
          <p className="text-gray-400 mb-2 hover:translate-x-2 transition-transform duration-300">
            📞 +38 (099) 123-45-67
          </p>
          <p className="text-gray-400 hover:translate-x-2 transition-transform duration-300">
            ✉️ info@fitpower.ua
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4 text-red-500 hover:scale-105 transition-transform duration-300 origin-left">
            Графік
          </h4>
          <p className="text-gray-400 mb-2 hover:translate-x-2 transition-transform duration-300">
            Пн-Пт: 06:00 - 23:00
          </p>
          <p className="text-gray-400 mb-2 hover:translate-x-2 transition-transform duration-300">
            Сб-Нд: 08:00 - 22:00
          </p>
          <p className="text-gray-400 hover:translate-x-2 transition-transform duration-300">
            VIP: цілодобово
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
        <p>&copy; 2025 FitPower. Всі права захищено</p>
      </div>
    </div>
  </footer>
);
