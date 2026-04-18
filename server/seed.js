import mongoose from "mongoose";
import dotenv from "dotenv";
import Food from "./models/Food.js";

dotenv.config();

const foods = [
  { name: "Paneer Tikka",       description: "Marinated cottage cheese grilled in tandoor", price: 240, category: "starter", image: "paneer-tikka.jpg",  isAvailable: true },
  { name: "Samosa",             description: "Crispy pastry with spiced potato filling",    price: 80,  category: "starter", image: "samosa.jpg",         isAvailable: true },
  { name: "Butter Chicken",     description: "Creamy tomato-based curry, slow cooked",      price: 320, category: "main",    image: "butter-chicken.jpg", isAvailable: true },
  { name: "Hyderabadi Biryani", description: "Aromatic basmati rice with tender meat",      price: 350, category: "main",    image: "biryani.jpg",        isAvailable: true },
  { name: "Dal Makhani",        description: "Black lentils simmered overnight in butter",  price: 220, category: "main",    image: "dal-makhani.jpg",    isAvailable: true },
  { name: "Gulab Jamun",        description: "Soft milk dumplings in sugar syrup",          price: 120, category: "dessert", image: "gulab-jamun.jpg",    isAvailable: true },
  { name: "Mango Lassi",        description: "Chilled yogurt drink with Alphonso mango",    price: 90,  category: "drink",   image: "mango-lassi.jpg",    isAvailable: true },
  { name: "Masala Chai",        description: "Spiced Indian tea with ginger and cardamom",  price: 60,  category: "drink",   image: "masala-chai.jpg",    isAvailable: true },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Food.deleteMany();
  await Food.insertMany(foods);
  console.log("✅ Sample food data added successfully!");
  process.exit();
}).catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});