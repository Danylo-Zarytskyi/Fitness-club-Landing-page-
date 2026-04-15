import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  strict: false,
  // ВИДАЛИ keywords: ['errorMessage']
});

addFormats(ajv);
addErrors(ajv); // ЦЕ ДОДАЄ ПІДТРИМКУ errorMessage

// Схема для безкоштовного тренування
export const freeTrainingSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
      pattern: "^[а-яА-ЯїЇєЄіІa-zA-Z\\s]+$",
      errorMessage: {
        type: "Ім'я має бути рядком",
        minLength: "Ім'я має містити мінімум 2 символи",
        maxLength: "Ім'я має містити максимум 50 символів",
        pattern: "Ім'я може містити тільки літери",
      },
    },
    phone: {
      type: "string",
      pattern: "^\\+?[\\d\\s-]{10,}$",
      errorMessage: {
        type: "Телефон має бути рядком",
        pattern: "Невірний формат телефону",
      },
    },
    email: {
      type: "string",
      format: "email",
      nullable: true,
      errorMessage: {
        type: "Email має бути рядком",
        format: "Невірний формат email",
      },
    },
    preferredTime: {
      type: "string",
      enum: ["morning", "day", "evening"],
      errorMessage: {
        type: "Час має бути рядком",
        enum: "Оберіть morning, day або evening",
      },
    },
    goals: {
      type: "array",
      items: {
        type: "string",
        enum: ["weight_loss", "muscle_gain", "fitness", "health", "other"],
      },
      nullable: true,
      errorMessage: {
        type: "Цілі мають бути масивом",
      },
    },
  },
  required: ["name", "phone", "preferredTime"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "Ім'я обов'язкове",
      phone: "Телефон обов'язковий",
      preferredTime: "Виберіть час тренування",
    },
  },
};

export const validateFreeTraining = ajv.compile(freeTrainingSchema);
