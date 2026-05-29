import FreeTraining from "../model/FreeTraining.js";
import Membership from "../model/Membership.js";

// Валідація
const validatePhone = (phone) => /^\+?3?8?(0[0-9]{9})$/.test(phone);
const validateEmail = (email) => !email || /^\S+@\S+\.\S+$/.test(email);
const validateName = (name) => name && name.length >= 2 && name.length <= 50;

// ========== БЕЗКОШТОВНЕ ТРЕНУВАННЯ ==========
export const createFreeTraining = async (req, res) => {
  try {
    const { name, phone, email, preferredTime } = req.body;

    const errors = [];
    if (!validateName(name)) errors.push("Ім'я має бути від 2 до 50 символів");
    if (!validatePhone(phone)) errors.push("Невірний формат телефону");
    if (!validateEmail(email)) errors.push("Невірний формат email");
    if (!preferredTime) errors.push("Оберіть зручний час");

    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    const training = await FreeTraining.create({
      name,
      phone,
      email: email || "",
      preferredTime,
    });

    res
      .status(201)
      .json({ success: true, message: "Заявку відправлено", data: training });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};

// ========== АБОНЕМЕНТИ ==========
export const createMembership = async (req, res) => {
  try {
    const { name, phone, email, membershipType } = req.body;

    const errors = [];
    if (!validateName(name)) errors.push("Ім'я має бути від 2 до 50 символів");
    if (!validatePhone(phone)) errors.push("Невірний формат телефону");
    if (!validateEmail(email)) errors.push("Невірний формат email");
    if (!membershipType) errors.push("Оберіть тип абонемента");

    if (errors.length) {
      return res.status(400).json({ success: false, errors });
    }

    const prices = { Старт: 999, Оптимум: 1599, VIP: 2999 };

    const membership = await Membership.create({
      name,
      phone,
      email,
      membershipType,
      membershipPrice: prices[membershipType],
    });

    res
      .status(201)
      .json({
        success: true,
        message: `Заявку на абонемент "${membershipType}" відправлено`,
        data: membership,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Помилка сервера" });
  }
};
