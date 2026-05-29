import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
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
      required: [true, "Email обов'язковий"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Невірний формат email"],
    },
    membershipType: {
      type: String,
      required: [true, "Тип абонемента обов'язковий"],
      enum: ["Старт", "Оптимум", "VIP"],
    },
    membershipPrice: {
      type: Number,
      required: [true, "Ціна абонемента обов'язкова"],
    },
    source: {
      type: String,
      default: "fitness_landing",
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "purchased", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Membership", membershipSchema);
