import mongoose from "mongoose";

const freeTrainingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Ім'я обов'язкове"],
      trim: true,
      minlength: [2, "Ім'я має містити хоча б 2 символи"],
      maxlength: [50, "Ім'я не може перевищувати 50 символів"],
    },
    phone: {
      type: String,
      required: [true, "Телефон обов'язковий"],
      trim: true,
      match: [/^\+?3?8?(0[0-9]{9})$/, "Невірний формат телефону"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
      match: [/^\S+@\S+\.\S+$/, "Невірний формат email"],
    },
    preferredTime: {
      type: String,
      required: [true, "Оберіть зручний час"],
      enum: ["morning", "day", "evening"],
    },
    source: {
      type: String,
      default: "fitness_landing",
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true, // додає createdAt та updatedAt автоматично
  },
);

export default mongoose.model("FreeTraining", freeTrainingSchema);
