import React, { useState } from "react";
import axios from "axios";

// Отримуємо URL бекенду з змінних оточення або використовуємо локальний для розробки
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const Modal = ({ isOpen, onClose, content, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const getEmoji = (type) => {
    const emojis = {
      free: "🏋️",
      info: "ℹ️",
      membership: "💳",
    };
    return emojis[type] || "📝";
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError("");

    try {
      let response;

      if (content.type === "free") {
        response = await api.post("/free-training", {
          name: formData.name,
          phone: formData.phone,
          email: formData.email || "",
          preferredTime: formData.preferredTime,
          source: "fitness_landing",
        });
      } else if (content.type === "membership") {
        const prices = {
          Старт: 999,
          Оптимум: 1599,
          VIP: 2999,
        };

        response = await api.post("/memberships", {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          membershipType: content.title,
          membershipPrice: prices[content.title] || 0,
          source: "fitness_landing",
        });
      }

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          onSubmit();
          onClose(); // Закриваємо модалку після успіху
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Помилка сервера");
        console.log("Помилка:", err.response.data);
      } else if (err.request) {
        setError("Сервер не відповідає. Перевір з'єднання.");
      } else {
        setError("Помилка при відправці даних");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300 ease-out opacity-100"></div>

      <div
        className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl max-w-md w-full p-8 shadow-2xl border border-white/10 transition-all duration-300 ease-out opacity-100 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-teal-400 hover:rotate-90 transition-all duration-300 text-2xl"
          disabled={loading}
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="text-5xl mb-4 animate-pulse">
            {getEmoji(content.type)}
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            {content.title}
          </h3>
          {content.type === "free" && (
            <p className="text-slate-400 text-sm mt-2">
              Перше тренування — наш подарунок! 🎁
            </p>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm backdrop-blur-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4 animate-bounce">✅</div>
            <p className="text-teal-400 font-semibold">
              Дякуємо! Дані успішно відправлено.
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Наш менеджер зв'яжеться з вами найближчим часом.
            </p>
          </div>
        ) : (
          <>
            {content.type === "free" && (
              <FreeTrainingForm onSubmit={handleFormSubmit} loading={loading} />
            )}
            {content.type === "membership" && (
              <MembershipForm
                title={content.title}
                onSubmit={handleFormSubmit}
                loading={loading}
              />
            )}
            {content.type === "info" && <InfoContent onClose={onClose} />}
          </>
        )}
      </div>
    </div>
  );
};

const FreeTrainingForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    preferredTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Ваше ім'я"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
        required
        disabled={loading}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Номер телефону"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
        required
        disabled={loading}
      />
      <input
        type="email"
        name="email"
        placeholder="Email (необов'язково)"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
        disabled={loading}
      />
      <select
        name="preferredTime"
        value={formData.preferredTime}
        onChange={handleChange}
        className="w-full p-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300 appearance-none cursor-pointer"
        required
        disabled={loading}
      >
        <option value="" className="bg-slate-800">
          Оберіть зручний час
        </option>
        <option value="morning" className="bg-slate-800">
          🌅 Ранок (8:00 - 11:00)
        </option>
        <option value="day" className="bg-slate-800">
          ☀️ День (11:00 - 17:00)
        </option>
        <option value="evening" className="bg-slate-800">
          🌙 Вечір (17:00 - 21:00)
        </option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 active:scale-95 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-[0_0_25px_rgba(20,184,166,0.3)] ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Відправка...
          </span>
        ) : (
          "Записатись на тренування"
        )}
      </button>
    </form>
  );
};

const MembershipForm = ({ title, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <div className="text-center p-3 rounded-xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-400/20">
        <p className="text-teal-400 text-sm font-medium">
          Ви обрали абонемент "{title}"
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Ваше ім'я"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
          required
          disabled={loading}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Номер телефону"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
          required
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-400/50 focus:ring-1 focus:ring-teal-400/50 transition-all duration-300"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 active:scale-95 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-[0_0_25px_rgba(20,184,166,0.3)] ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Відправка...
            </span>
          ) : (
            "Придбати абонемент"
          )}
        </button>
      </form>
    </div>
  );
};

const InfoContent = ({ onClose }) => (
  <div className="space-y-4 text-center">
    <div className="text-6xl mb-2">📞</div>
    <p className="text-slate-300">
      Дякуємо за інтерес! Наш менеджер зв'яжеться з вами протягом 15 хвилин.
    </p>
    <button
      onClick={onClose}
      className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 active:scale-95 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-[0_0_25px_rgba(20,184,166,0.3)]"
    >
      Добре
    </button>
  </div>
);

export default Modal;
