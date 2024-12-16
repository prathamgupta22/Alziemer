import mongoose from "mongoose";
const locationSchema = new mongoose.Schema(
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
    item:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item'
    }
  },
  { timestamps: true }
);
export const locationModel = mongoose.model("location", locationSchema);
