import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Cart() {
  const { cartItems, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName:  user?.name  || "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) { toast.error("Please login first!"); navigate("/login"); return; }
    if (cartItems.length === 0) { toast.error("Your cart is empty!"); return; }

    // Go to payment page with order details
    navigate("/payment", {
      state: {
        ...form,
        items: cartItems,
        totalAmount: totalPrice,
      },
    });
  };

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "serif", fontSize: "2.5rem", marginBottom: "2.5rem" }}>Checkout</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>

        {/* Order Summary */}
        <div>
          <h2 style={{ color: "#C9A84C", fontSize: "1rem", marginBottom: "1rem" }}>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p style={{ color: "rgba(255,255,255,0.4)" }}>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "0.9rem" }}>
                <span>{item.name} × {item.qty}</span>
                <span style={{ color: "#C9A84C" }}>₹{item.price * item.qty}</span>
              </div>
            ))
          )}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.5rem", fontFamily: "serif", fontSize: "1.4rem" }}>
            <span>Total</span>
            <span style={{ color: "#C9A84C" }}>₹{totalPrice}</span>
          </div>
        </div>

        {/* Delivery Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            ["customerName",  "Your Name",       "text"],
            ["customerEmail", "Email Address",    "email"],
            ["customerPhone", "Phone Number",     "tel"],
            ["address",       "Delivery Address", "text"],
          ].map(([field, placeholder, type]) => (
            <input key={field} type={type} placeholder={placeholder} required
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "0.85rem 1rem", color: "white", fontSize: "0.9rem", outline: "none" }}
            />
          ))}
          <button type="submit"
            style={{ background: "#E8631A", color: "white", border: "none", padding: "0.9rem", borderRadius: "12px", fontSize: "0.9rem", cursor: "pointer", fontWeight: "500" }}>
            Proceed to Payment →
          </button>
        </form>
      </div>
    </div>
  );
}