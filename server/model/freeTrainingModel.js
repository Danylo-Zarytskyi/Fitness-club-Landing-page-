import mongoose from "mongoose";

const freeTrainingSchema = new mongoose.Schema(
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
      trim: true,
    },
    preferredTime: {
      type: String,
      required: true,
      enum: ["morning", "day", "evening"],
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "contacted", "scheduled", "completed", "cancelled"],
    },
  },
  {
    timestamps: true,
  },
);

const FreeTraining = mongoose.model("FreeTraining", freeTrainingSchema);
export default FreeTraining;
