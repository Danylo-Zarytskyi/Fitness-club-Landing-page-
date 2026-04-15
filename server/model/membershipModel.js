import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    membershipType: {
      type: String,
      required: true,
      enum: ["Старт", "Оптимум", "VIP"],
    },
    membershipPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "cancelled"],
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "contacted", "agreed", "paid", "cancelled"],
    },
  },
  {
    timestamps: true,
  },
);

const Membership = mongoose.model("Membership", membershipSchema);
export default Membership;
