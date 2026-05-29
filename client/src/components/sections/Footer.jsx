import React from "react";

export const Footer = () => (
  <footer
    id="contact"
    className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-white/10"
  >
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-4 gap-10">
        {/* ЛОГО ТА ОПИС */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">💪</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              FitPower
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Твій шлях до ідеального тіла. Сучасний фітнес-клуб з преміум
            обладнанням та професійними тренерами.
          </p>

          {/* Соціальні мережі */}
          <div className="flex gap-3 mt-6">
            <SocialIcon icon="📘" />
            <SocialIcon icon="📸" />
            <SocialIcon icon="🎵" />
            <SocialIcon icon="▶️" />
          </div>
        </div>

        {/* НАВІГАЦІЯ */}
        <div>
          <h4 className="text-teal-400 font-bold mb-5 text-sm uppercase tracking-wider">
            Навігація
          </h4>
          <ul className="space-y-3">
            {navItems.map((item, i) => (
              <li key={i}>
                <a
                  href={`#${item.href}`}
                  className="text-slate-400 hover:text-teal-400 transition-colors duration-300 text-sm flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 transition-all duration-300" />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* КОНТАКТИ */}
        <div>
          <h4 className="text-teal-400 font-bold mb-5 text-sm uppercase tracking-wider">
            Контакти
          </h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-slate-400 text-sm">
              <span>📍</span>
              <span>м. Київ, вул. Спортивна, 15</span>
            </li>
            <li className="flex items-center gap-3 text-slate-400 text-sm hover:text-teal-400 transition-colors duration-300">
              <span>📞</span>
              <a href="tel:+380991234567" className="hover:text-teal-400">
                +38 (099) 123-45-67
              </a>
            </li>
            <li className="flex items-center gap-3 text-slate-400 text-sm hover:text-teal-400 transition-colors duration-300">
              <span>✉️</span>
              <a href="mailto:info@fitpower.ua" className="hover:text-teal-400">
                info@fitpower.ua
              </a>
            </li>
          </ul>
        </div>

        {/* ГРАФІК РОБОТИ */}
        <div>
          <h4 className="text-teal-400 font-bold mb-5 text-sm uppercase tracking-wider">
            Графік роботи
          </h4>
          <ul className="space-y-3">
            <li className="flex justify-between text-slate-400 text-sm">
              <span>Пн - Пт:</span>
              <span className="text-white">06:00 - 23:00</span>
            </li>
            <li className="flex justify-between text-slate-400 text-sm">
              <span>Сб - Нд:</span>
              <span className="text-white">08:00 - 22:00</span>
            </li>
            <li className="flex justify-between text-slate-400 text-sm pt-2 border-t border-white/10">
              <span>💪 Тренери:</span>
              <span className="text-teal-400">24/7 онлайн</span>
            </li>
          </ul>

          {/* Кнопка швидкого зв'язку */}
          <button className="w-full mt-6 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-400/30 hover:border-teal-400/50 transition-all duration-300 hover:scale-105">
            📅 Записатись онлайн
          </button>
        </div>
      </div>

      {/* НИЖНІЙ БАР */}
      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">
          © 2025 FitPower. Всі права захищено.
        </p>

        <div className="flex gap-6 text-xs text-slate-500">
          <a href="#" className="hover:text-teal-400 transition-colors">
            Політика конфіденційності
          </a>
          <span className="text-slate-700">|</span>
          <a href="#" className="hover:text-teal-400 transition-colors">
            Умови використання
          </a>
          <span className="text-slate-700">|</span>
          <a href="#" className="hover:text-teal-400 transition-colors">
            Public offer
          </a>
        </div>

        <p className="text-slate-600 text-xs">
          Розроблено з ❤️ для твого здоров'я
        </p>
      </div>
    </div>
  </footer>
);

// Компонент іконки соціальної мережі
const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg hover:bg-gradient-to-r hover:from-teal-500/20 hover:to-cyan-500/20 hover:border-teal-400/30 transition-all duration-300 hover:scale-110"
  >
    {icon}
  </a>
);

const navItems = [
  { label: "Головна", href: "home" },
  { label: "Про нас", href: "about" },
  { label: "Переваги", href: "features" },
  { label: "Тарифи", href: "pricing" },
  { label: "Контакти", href: "contact" },
];
