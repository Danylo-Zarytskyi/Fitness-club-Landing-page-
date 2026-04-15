import React, { useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ease-out opacity-100"></div>

      <div
        className="relative bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl transition-all duration-300 ease-out opacity-100 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300 text-2xl"
          disabled={loading}
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="text-5xl mb-4 animate-bounce">
            {getEmoji(content.type)}
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{content.title}</h3>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center py-8">
            <div className="text-5xl mb-4 animate-bounce">✅</div>
            <p className="text-green-600 font-semibold">
              Дякуємо! Дані успішно відправлено.
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
        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
        required
        disabled={loading}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Номер телефону"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
        required
        disabled={loading}
      />
      <input
        type="email"
        name="email"
        placeholder="Email (необов'язково)"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
        disabled={loading}
      />
      <select
        name="preferredTime"
        value={formData.preferredTime}
        onChange={handleChange}
        className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300"
        required
        disabled={loading}
      >
        <option value="">Оберіть зручний час</option>
        <option value="morning">Ранок (8:00 - 11:00)</option>
        <option value="day">День (11:00 - 17:00)</option>
        <option value="evening">Вечір (17:00 - 21:00)</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Відправка..." : "Записатись на тренування"}
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
      <p className="text-gray-600 text-center">Ви обрали абонемент "{title}"</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Ваше ім'я"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 mb-4"
          required
          disabled={loading}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Номер телефону"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 mb-4"
          required
          disabled={loading}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-300 mb-4"
          required
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Відправка..." : "Придбати абонемент"}
        </button>
      </form>
    </div>
  );
};

const InfoContent = ({ onClose }) => (
  <div className="space-y-4">
    <p className="text-gray-600">
      Дякуємо за інтерес! Наш менеджер зв'яжеться з вами протягом 15 хвилин.
    </p>
    <button
      onClick={onClose}
      className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
    >
      Добре
    </button>
  </div>
);

export default Modal;
