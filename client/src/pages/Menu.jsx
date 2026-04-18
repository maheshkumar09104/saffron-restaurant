import { useEffect, useState } from "react";
import { getAllFoods } from "../api/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const CATEGORIES = ["all", "starter", "main", "dessert", "drink"];
const SERVER = import.meta.env.VITE_SERVER_URL;

export default function Menu() {
  const [foods, setFoods]      = useState([]);
  const [loading, setLoading]  = useState(true);
  const [activeTab, setActive] = useState("all");
  const { addToCart }          = useCart();

  useEffect(() => {
    getAllFoods()
      .then((res) => setFoods(res.data))
      .catch(() => toast.error("Failed to load menu"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeTab === "all"
    ? foods
    : foods.filter((f) => f.category === activeTab);

  if (loading) return (
    <div style={{ textAlign: "center", padding: "5rem", color: "rgba(255,255,255,0.4)" }}>
      Loading menu...
    </div>
  );

  return (
    <div style={{ padding: "4rem 2rem" }}>
      <h1 style={{ fontFamily: "serif", fontSize: "2.5rem", textAlign: "center", marginBottom: "2.5rem" }}>
        Our <span style={{ color: "#C9A84C" }}>Menu</span>
      </h1>

      {/* Category Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginBottom: "3rem", flexWrap: "wrap" }}>
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActive(cat)}
            style={{
              padding: "0.5rem 1.4rem", borderRadius: "100px", cursor: "pointer",
              fontSize: "0.85rem", textTransform: "capitalize", transition: "all 0.2s",
              background: activeTab === cat ? "#E8631A" : "transparent",
              color: activeTab === cat ? "white" : "rgba(255,255,255,0.6)",
              border: activeTab === cat ? "1px solid #E8631A" : "1px solid rgba(255,255,255,0.2)",
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        {filtered.map((food) => (
          <div key={food._id}
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", overflow: "hidden", transition: "transform 0.3s", cursor: "pointer" }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-6px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}>

            {/* Food Image */}
            <div style={{ width: "100%", height: "180px", background: "rgba(232,99,26,0.08)", overflow: "hidden", position: "relative" }}>
              <img
                src={`${SERVER}/uploads/${food.image}?t=${food.updatedAt}`}
                alt={food.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  // If image fails, show emoji fallback
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              {/* Emoji fallback (hidden by default) */}
              <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", fontSize: "4rem", position: "absolute", top: 0, left: 0 }}>
                {food.category === "starter" ? "🥗" :
                 food.category === "main"    ? "🍛" :
                 food.category === "dessert" ? "🍮" : "🥤"}
              </div>
            </div>

            <div style={{ padding: "1.1rem" }}>
              <h3 style={{ fontWeight: "500", marginBottom: "0.3rem", fontSize: "0.95rem" }}>{food.name}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginBottom: "0.9rem", lineHeight: "1.5" }}>
                {food.description}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "serif", fontSize: "1.2rem", color: "#C9A84C" }}>₹{food.price}</span>
                <button
                  onClick={() => { addToCart(food); toast.success(`${food.name} added!`); }}
                  style={{ background: "#E8631A", color: "white", border: "none", width: "34px", height: "34px", borderRadius: "50%", fontSize: "1.2rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}