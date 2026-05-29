import React from "react";

export const TestimonialsSection = () => (
  <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-teal-400 text-sm mb-4">
          💬 Відгуки
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Нас рекомендують
        </h2>
        <p className="text-slate-400 mt-3 max-w-md mx-auto">
          Понад 500 задоволених клієнтів досягли своїх цілей разом з нами
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 
            border border-white/10 hover:border-teal-400/30 
            transition-all duration-300 hover:-translate-y-2 
            hover:shadow-[0_0_30px_rgba(20,184,166,0.1)]"
          >
            {/* Лапки */}
            <div className="absolute top-4 right-4 text-6xl font-serif text-teal-400/20 group-hover:text-teal-400/30 transition-all">
              „
            </div>

            {/* Рейтинг */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, starIdx) => (
                <svg
                  key={starIdx}
                  className="w-5 h-5 text-teal-400 fill-teal-400/80"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" />
                </svg>
              ))}
            </div>

            {/* Текст відгуку */}
            <p className="text-slate-300 leading-relaxed mb-6 relative z-10">
              “{t.text}”
            </p>

            {/* Автор */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                {t.author.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-white">{t.author}</div>
                <div className="text-xs text-teal-400">Клієнт клубу</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Додатковий елемент - загальний рейтинг */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-8 px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-white">4.9</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-teal-400 fill-teal-400"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L15 8.5L22 9.5L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9.5L9 8.5L12 2Z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="w-px h-6 bg-white/20" />
          <div className="text-slate-300">
            На основі <span className="text-teal-400 font-semibold">128</span>{" "}
            відгуків
          </div>
        </div>
      </div>
    </div>
  </section>
);

const testimonials = [
  {
    text: "Найкращий фітнес-клуб у місті! Тренери професіонали, обладнання топове. Результати помітив вже за місяць.",
    author: "Андрій",
  },
  {
    text: "Дуже подобається сервіс та індивідуальний підхід. Персональний тренер склав програму саме під мої цілі.",
    author: "Олена",
  },
  {
    text: "Результат реально є. За 3 місяці скинув 12 кг і підтягнув м'язи. Атмосфера в клубі неймовірна!",
    author: "Максим",
  },
];
