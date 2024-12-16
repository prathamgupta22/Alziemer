import mongoose from "mongoose";
const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    photo: {
      type: String,
      required: [true, "Photo is required"],
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export const itemModel = mongoose.model("item", itemSchema);
