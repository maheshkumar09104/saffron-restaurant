import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/api";
import toast from "react-hot-toast";
import { useState } from "react";

export default function Payment() {
  const { state }     = useLocation();
  const { clearCart } = useCart();
  const navigate      = useNavigate();
  const [loading, setLoading] = useState(false);

  const UPI_ID  = "saffron@upi";
  const AMOUNT  = state?.totalAmount || 0;
  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Saffron Restaurant&am=${AMOUNT}&cu=INR&tn=Food Order`;

  const confirmPayment = async () => {
    setLoading(true);
    try {
      const res = await placeOrder(state);
      clearCart();
      toast.success("Order placed successfully! 🎉");
      navigate("/order-success", { state: { otp: res.data.deliveryOTP } });
    } catch {
      toast.error("Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "2.5rem", width: "100%", maxWidth: "420px", textAlign: "center" }}>

        <h1 style={{ fontFamily: "serif", fontSize: "1.8rem", color: "#C9A84C", marginBottom: "0.5rem" }}>
          Complete Payment
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginBottom: "2rem" }}>
          Scan QR or click Pay Now to complete your order
        </p>

        {/* Amount */}
        <div style={{ background: "rgba(232,99,26,0.1)", border: "1px solid rgba(232,99,26,0.2)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
            Amount to Pay
          </p>
          <p style={{ fontFamily: "serif", fontSize: "2.5rem", color: "#E8631A", fontWeight: "700", marginTop: "0.3rem" }}>
            ₹{AMOUNT}
          </p>
        </div>

        {/* UPI ID */}
        <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "12px", padding: "1rem", marginBottom: "1.5rem" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>UPI ID</p>
          <p style={{ color: "#C9A84C", fontSize: "1rem", fontWeight: "500", marginTop: "0.3rem" }}>
            {UPI_ID}
          </p>
        </div>

        {/* QR Placeholder */}
        <div style={{ background: "white", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "4rem" }}>📱</div>
          <p style={{ color: "#1A1208", fontSize: "0.8rem", marginTop: "0.5rem" }}>
            Open any UPI app and scan or use the UPI ID above
          </p>
        </div>

        {/* Open UPI App */}
        <a href={upiLink}
          style={{ display: "block", background: "#E8631A", color: "white", padding: "0.9rem", borderRadius: "12px", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500", marginBottom: "1rem" }}>
          Open UPI App — Pay ₹{AMOUNT}
        </a>

        {/* Confirm Button */}
        <button onClick={confirmPayment} disabled={loading}
          style={{ width: "100%", background: "rgba(201,168,76,0.15)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.3)", padding: "0.9rem", borderRadius: "12px", fontSize: "0.9rem", cursor: "pointer" }}>
          {loading ? "Confirming..." : "I Have Paid — Confirm Order"}
        </button>

        <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.72rem", marginTop: "1rem" }}>
          Click confirm only after completing payment
        </p>
      </div>
    </div>
  );
}