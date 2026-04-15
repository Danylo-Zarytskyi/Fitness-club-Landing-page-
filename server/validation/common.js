import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv({
  allErrors: true,
  removeAdditional: true,
  strict: false,
  // ВИДАЛИ keywords: ['errorMessage']
});

addErrors(ajv); // ЦЕ ДОДАЄ ПІДТРИМКУ errorMessage

// Схема для статусу
export const statusSchema = {
  type: "object",
  properties: {
    status: {
      type: "string",
      enum: ["new", "contacted", "scheduled", "completed", "cancelled"],
      errorMessage: {
        enum: "Невірний статус",
      },
    },
  },
  required: ["status"],
  additionalProperties: false,
};

// Схема для нотаток
export const noteSchema = {
  type: "object",
  properties: {
    text: {
      type: "string",
      minLength: 1,
      maxLength: 500,
      errorMessage: {
        minLength: "Текст нотатки не може бути порожнім",
        maxLength: "Максимум 500 символів",
      },
    },
    createdBy: {
      type: "string",
      nullable: true,
    },
  },
  required: ["text"],
  additionalProperties: false,
};

export const validateStatus = ajv.compile(statusSchema);
export const validateNote = ajv.compile(noteSchema);
