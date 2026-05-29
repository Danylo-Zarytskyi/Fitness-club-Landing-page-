import React from "react";

export const LeadFormSection = ({ onOpenModal }) => (
  <section className="py-20 bg-gradient-to-t from-slate-900 to-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* ФОРМА */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:shadow-[0_0_40px_rgba(20,184,166,0.1)]">
          {/* Бейдж */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-teal-400 text-sm mb-5">
            🎁 Пропозиція
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Отримай безкоштовне тренування
          </h2>

          <p className="text-slate-400 mb-8 leading-relaxed">
            Заповни форму і ми підберемо для тебе ідеальну програму тренувань та
            харчування
          </p>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="group">
              <input
                type="text"
                className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
                placeholder="Ваше ім'я"
              />
            </div>

            <div className="group">
              <input
                type="email"
                className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
                placeholder="Email"
              />
            </div>

            <div className="group">
              <input
                type="tel"
                className="w-full px-5 py-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
                placeholder="Номер телефону"
              />
            </div>

            <button
              type="button"
              onClick={() => onOpenModal("free", "Безкоштовне тренування")}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 active:scale-95 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-[0_0_25px_rgba(20,184,166,0.3)]"
            >
              Записатись безкоштовно
            </button>
          </form>

          <p className="text-slate-500 text-xs text-center mt-4">
            *Натискаючи на кнопку, ви погоджуєтесь з умовами конфіденційності
          </p>
        </div>

        {/* ПРАВА СТОРОНА - ПЕРЕВАГИ */}
        <div className="relative bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="text-center mb-8">
              <span className="text-7xl mb-4 inline-block animate-pulse">
                🎯
              </span>
              <h3 className="text-2xl font-bold text-white mt-4">
                Чому варто спробувати?
              </h3>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-teal-400/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    <span className="text-xl">{benefit.icon}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{benefit.title}</p>
                    <p className="text-slate-400 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Статистика */}
            <div className="mt-8 pt-6 border-t border-white/10 flex justify-around text-center">
              <div>
                <div className="text-2xl font-bold text-teal-400">98%</div>
                <div className="text-slate-500 text-xs">задоволених</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-teal-400">24/7</div>
                <div className="text-slate-500 text-xs">підтримка</div>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <div className="text-2xl font-bold text-teal-400">0</div>
                <div className="text-slate-500 text-xs">штрафів</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const benefits = [
  {
    icon: "🏋️",
    title: "Тест-драйв клубу",
    desc: "Повноцінне тренування з тренером",
  },
  {
    icon: "📊",
    title: "Аналіз тіла",
    desc: "Професійне Body Scan дослідження",
  },
  { icon: "🎯", title: "План дій", desc: "Індивідуальна програма тренувань" },
];
