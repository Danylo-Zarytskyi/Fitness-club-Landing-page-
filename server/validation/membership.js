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

// Схема для абонемента
export const membershipSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      maxLength: 50,
      pattern: "^[а-яА-ЯїЇєЄіІa-zA-Z\\s]+$",
      errorMessage: {
        minLength: "Ім'я має містити мінімум 2 символи",
        maxLength: "Ім'я має містити максимум 50 символів",
        pattern: "Ім'я може містити тільки літери",
      },
    },
    phone: {
      type: "string",
      pattern: "^\\+?[\\d\\s-]{10,}$",
      errorMessage: {
        pattern: "Невірний формат телефону",
      },
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Невірний формат email",
      },
    },
    membershipType: {
      type: "string",
      enum: ["Старт", "Оптимум", "VIP"],
      errorMessage: {
        enum: "Оберіть Старт, Оптимум або VIP",
      },
    },
    membershipPrice: {
      type: "number",
      minimum: 0,
      errorMessage: {
        type: "Ціна має бути числом",
        minimum: "Ціна не може бути від'ємною",
      },
    },
    paymentMethod: {
      type: "string",
      enum: ["cash", "card", "online", "installment"],
      nullable: true,
      errorMessage: {
        enum: "Невірний метод оплати",
      },
    },
    promoCode: {
      type: "string",
      maxLength: 20,
      nullable: true,
      errorMessage: {
        maxLength: "Максимум 20 символів",
      },
    },
    discount: {
      type: "number",
      minimum: 0,
      maximum: 100,
      nullable: true,
      errorMessage: {
        type: "Знижка має бути числом",
        minimum: "Знижка не може бути від'ємною",
        maximum: "Знижка не може бути більше 100%",
      },
    },
  },
  required: ["name", "phone", "email", "membershipType", "membershipPrice"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "Ім'я обов'язкове",
      phone: "Телефон обов'язковий",
      email: "Email обов'язковий",
      membershipType: "Тип абонемента обов'язковий",
      membershipPrice: "Ціна обов'язкова",
    },
  },
};

export const validateMembership = ajv.compile(membershipSchema);
