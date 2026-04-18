import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name:        { type: String, required: true },
    description: { type: String, required: true },
    price:       { type: Number, required: true },
    category:    { type: String, enum: ["starter", "main", "dessert", "drink"], required: true },
    image:       { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Food", foodSchema);