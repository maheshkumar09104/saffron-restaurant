import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName:  { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  address:       { type: String, required: true },
  items: [{
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
    name:   String,
    price:  Number,
    qty:    Number,
  }],
  totalAmount:   { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "payment-confirmed", "preparing", "out-for-delivery", "delivered"],
    default: "pending",
  },
  deliveryOTP:   { type: String, default: null },  // 4-digit OTP
  otpVerified:   { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);