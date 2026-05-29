import FreeTraining from "../model/FreeTraining.js";
import Membership from "../model/Membership.js";

// ========== ДОПОМІЖНІ ФУНКЦІЇ ДЛЯ ВАЛІДАЦІЇ ==========

const validatePhone = (phone) => {
  return /^\+?3?8?(0[0-9]{9})$/.test(phone);
};

const validateEmail = (email) => {
  if (!email) return true; // email необов'язковий для тренування
  return /^\S+@\S+\.\S+$/.test(email);
};

const validateName = (name) => {
  return name && name.length >= 2 && name.length <= 50;
};

// ========== БЕЗКОШТОВНЕ ТРЕНУВАННЯ ==========

// CREATE - створити заявку на безкоштовне тренування
export const createFreeTraining = async (req, res) => {
  try {
    const { name, phone, email, preferredTime } = req.body;

    // Валідація
    const errors = [];
    if (!validateName(name)) errors.push("Ім'я має бути від 2 до 50 символів");
    if (!validatePhone(phone)) errors.push("Невірний формат телефону");
    if (!validateEmail(email)) errors.push("Невірний формат email");
    if (!preferredTime) errors.push("Оберіть зручний час");

    if (errors.length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    const training = await FreeTraining.create({
      name,
      phone,
      email: email || "",
      preferredTime,
      source: req.body.source || "fitness_landing",
    });

    res.status(201).json({
      success: true,
      message: "Заявку на безкоштовне тренування успішно відправлено",
      data: training,
    });
  } catch (err) {
    console.error("Error creating free training:", err);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};

// GET ALL - отримати всі заявки на тренування (для адміна)
export const getFreeTrainings = async (req, res) => {
  try {
    const trainings = await FreeTraining.find().sort({ createdAt: -1 });
    res.json({ success: true, data: trainings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};

//
