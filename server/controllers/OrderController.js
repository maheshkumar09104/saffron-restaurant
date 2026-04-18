import Order from "../models/Order.js";

// Generate 4-digit OTP
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// Place order
export const placeOrder = async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, address, items, totalAmount } = req.body;

    const otp = generateOTP(); // generate OTP at order time

    const order = await Order.create({
      customerName, customerEmail, customerPhone,
      address, items, totalAmount,
      deliveryOTP: otp,
      status: "pending",
    });

    // In real app, send OTP via SMS. For now return it in response
    res.status(201).json({
      message: "Order placed successfully!",
      order,
      deliveryOTP: otp, // customer gets this OTP
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status (admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updateData = { status };

    // When marking out-for-delivery, make sure OTP exists
    const order = await Order.findByIdAndUpdate(
      req.params.id, updateData, { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify OTP to mark delivered (admin enters OTP given by customer)
export const verifyDeliveryOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.deliveryOTP !== otp) {
      return res.status(400).json({ message: "Wrong OTP! Ask customer for the correct OTP." });
    }

    order.status     = "delivered";
    order.otpVerified = true;
    await order.save();

    res.json({ message: "OTP verified! Order marked as delivered ✅", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};