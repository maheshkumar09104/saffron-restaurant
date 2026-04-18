import Feedback from "../models/Feedback.js";

export const submitFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json({ message: "Feedback submitted!", feedback });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id, { status: "read" }, { new: true }
    );
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};