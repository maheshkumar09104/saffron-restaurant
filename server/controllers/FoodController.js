import Food from "../models/Food.js";

// GET all foods — public
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single food
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST add new food — admin only
export const createFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const image = req.file?.filename; // filename from multer upload

    if (!image) return res.status(400).json({ message: "Image is required" });

    const food = await Food.create({ name, description, price, category, image });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT update food — admin only
export const updateFood = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If new image uploaded, use it
    if (req.file) {
      updateData.image = req.file.filename;
    }

    const food = await Food.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE food — admin only
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
