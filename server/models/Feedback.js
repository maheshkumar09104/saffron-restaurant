import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  type:    { type: String, enum: ["suggestion", "complaint", "compliment", "other"], default: "suggestion" },
  message: { type: String, required: true },
  rating:  { type: Number, min: 1, max: 5, default: 5 },
  status:  { type: String, enum: ["unread", "read"], default: "unread" },
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);