import express from "express";
import Membership from "../model/membershipModel.js";
import { validateMembership } from "../validation/membership.js";
import { validateStatus, validateNote } from "../validation/common.js";

const router = express.Router();

// Middleware для валідації
const validate = (validator) => (req, res, next) => {
  const valid = validator(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      errors: validator.errors.map((err) => ({
        field: err.instancePath.replace("/", "") || err.params?.missingProperty,
        message: err.message,
      })),
    });
  }
  next();
};

// Створити заявку на абонемент
router.post("/", validate(validateMembership), async (req, res) => {
  try {
    // Розрахунок кінцевої ціни
    const finalPrice =
      req.body.membershipPrice * (1 - (req.body.discount || 0) / 100);

    // Розрахунок дати закінчення (за замовчуванням +1 місяць)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const membership = new Membership({
      ...req.body,
      finalPrice,
      startDate,
      endDate,
      status: "new",
      paymentStatus: "pending",
      source: req.headers["user-agent"] || "unknown",
      ipAddress: req.ip,
    });

    await membership.save();

    res.status(201).json({
      success: true,
      message: "Заявку на абонемент успішно створено",
      data: membership,
    });
  } catch (error) {
    console.error("Помилка створення заявки:", error);
    res.status(500).json({
      success: false,
      message: "Помилка сервера",
    });
  }
});

// Отримати всі заявки
router.get("/", async (req, res) => {
  try {
    const {
      status,
      membershipType,
      startDate,
      endDate,
      limit = 100,
    } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (membershipType) filter.membershipType = membershipType;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const memberships = await Membership.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: memberships.length,
      data: memberships,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка отримання даних",
    });
  }
});

// Отримати заявку за ID
router.get("/:id", async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Заявку не знайдено",
      });
    }
    res.json({
      success: true,
      data: membership,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка отримання даних",
    });
  }
});

// Оновити статус заявки
router.patch("/:id/status", validate(validateStatus), async (req, res) => {
  try {
    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        updatedAt: Date.now(),
      },
      { new: true },
    );

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Заявку не знайдено",
      });
    }

    res.json({
      success: true,
      data: membership,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка оновлення",
    });
  }
});

// Оновити статус оплати
router.patch("/:id/payment", async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    if (!["pending", "partial", "paid", "refunded"].includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: "Невірний статус оплати",
      });
    }

    const membership = await Membership.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus,
        updatedAt: Date.now(),
      },
      { new: true },
    );

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Заявку не знайдено",
      });
    }

    res.json({
      success: true,
      data: membership,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка оновлення",
    });
  }
});

// Додати нотатку
router.post("/:id/notes", validate(validateNote), async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Заявку не знайдено",
      });
    }

    const note = {
      text: req.body.text,
      createdAt: new Date(),
      createdBy: req.body.createdBy || "system",
    };

    membership.managerNotes.push(note);
    await membership.save();

    res.json({
      success: true,
      data: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка додавання нотатки",
    });
  }
});

// Видалити заявку
router.delete("/:id", async (req, res) => {
  try {
    const membership = await Membership.findByIdAndDelete(req.params.id);

    if (!membership) {
      return res.status(404).json({
        success: false,
        message: "Заявку не знайдено",
      });
    }

    res.json({
      success: true,
      message: "Заявку видалено",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка видалення",
    });
  }
});

export default router;
