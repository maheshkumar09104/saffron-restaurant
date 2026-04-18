import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();
  const otp = state?.otp;

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <div>
        <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>🎉</div>
        <h1 style={{ fontFamily: "serif", fontSize: "2.5rem", color: "#C9A84C", marginBottom: "1rem" }}>
          Order Placed!
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", maxWidth: "400px", margin: "0 auto 2rem", lineHeight: "1.7" }}>
          Your order has been received. Our team will prepare your food and deliver it to your address.
        </p>

        {/* Show OTP */}
        {otp && (
          <div style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "16px", padding: "1.5rem", maxWidth: "300px", margin: "0 auto 2rem" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>
              Your Delivery OTP
            </p>
            <p style={{ fontFamily: "serif", fontSize: "3rem", color: "#C9A84C", fontWeight: "700", letterSpacing: "8px" }}>
              {otp}
            </p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.5rem" }}>
              Share this OTP with the delivery person to confirm delivery
            </p>
          </div>
        )}

        <Link to="/menu"
          style={{ display: "inline-block", background: "#E8631A", color: "white", padding: "0.9rem 2rem", borderRadius: "12px", textDecoration: "none", fontSize: "0.9rem", fontWeight: "500" }}>
          Order More Food
        </Link>
      </div>
    </div>
  );
}