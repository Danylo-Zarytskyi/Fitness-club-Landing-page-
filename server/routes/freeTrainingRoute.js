import express from "express";
import FreeTraining from "../model/freeTrainingModel.js";
import { validateFreeTraining } from "../validation/freeTraining.js";
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

// Створити запис на безкоштовне тренування
router.post("/", validate(validateFreeTraining), async (req, res) => {
  try {
    const training = new FreeTraining({
      ...req.body,
      status: "new",
      source: req.headers["user-agent"] || "unknown",
      ipAddress: req.ip,
    });

    await training.save();

    res.status(201).json({
      success: true,
      message: "Запис успішно створено",
      data: training,
    });
  } catch (error) {
    console.error("Помилка створення запису:", error);
    res.status(500).json({
      success: false,
      message: "Помилка сервера",
    });
  }
});

// Отримати всі записи
router.get("/", async (req, res) => {
  try {
    const { status, startDate, endDate, limit = 100 } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const trainings = await FreeTraining.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: trainings.length,
      data: trainings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка отримання даних",
    });
  }
});

// Отримати запис за ID
router.get("/:id", async (req, res) => {
  try {
    const training = await FreeTraining.findById(req.params.id);
    if (!training) {
      return res.status(404).json({
        success: false,
        message: "Запис не знайдено",
      });
    }
    res.json({
      success: true,
      data: training,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка отримання даних",
    });
  }
});

// Оновити статус запису
router.patch("/:id/status", validate(validateStatus), async (req, res) => {
  try {
    const training = await FreeTraining.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
        updatedAt: Date.now(),
      },
      { new: true },
    );

    if (!training) {
      return res.status(404).json({
        success: false,
        message: "Запис не знайдено",
      });
    }

    res.json({
      success: true,
      data: training,
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
    const training = await FreeTraining.findById(req.params.id);

    if (!training) {
      return res.status(404).json({
        success: false,
        message: "Запис не знайдено",
      });
    }

    const note = {
      text: req.body.text,
      createdAt: new Date(),
      createdBy: req.body.createdBy || "system",
    };

    training.notes.push(note);
    await training.save();

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

// Видалити запис
router.delete("/:id", async (req, res) => {
  try {
    const training = await FreeTraining.findByIdAndDelete(req.params.id);

    if (!training) {
      return res.status(404).json({
        success: false,
        message: "Запис не знайдено",
      });
    }

    res.json({
      success: true,
      message: "Запис видалено",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Помилка видалення",
    });
  }
});

export default router;
