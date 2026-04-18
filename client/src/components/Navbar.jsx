import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, LogOut, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2.5rem", borderBottom: "1px solid rgba(201,168,76,0.15)", background: "rgba(26,18,8,0.95)", backdropFilter: "blur(10px)" }}>

        <Link to="/" style={{ fontFamily: "serif", fontSize: "1.6rem", fontWeight: "900", color: "#C9A84C", textDecoration: "none" }}>
          Saffron<span style={{ color: "#E8631A" }}>.</span>
        </Link>

        <div style={{ display: "flex", gap: "2rem" }}>
          {[["Home", "/"], ["Menu", "/menu"], ["Feedback", "/feedback"], ["Contact", "/contact"]].map(([label, path]) => (
            <Link key={path} to={path} style={{ color: "rgba(253,246,236,0.6)", textDecoration: "none", fontSize: "0.8rem", letterSpacing: "1px", textTransform: "uppercase" }}>
              {label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {user ? (
            <>
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
                👋 {user.name.split(" ")[0]}
              </span>
              <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "0.4rem 0.8rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.8rem" }}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.82rem", border: "1px solid rgba(255,255,255,0.15)", padding: "0.4rem 0.9rem", borderRadius: "8px" }}>
              Login
            </Link>
          )}

          <button onClick={() => setCartOpen(true)}
            style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px", background: "#E8631A", color: "white", border: "none", padding: "0.6rem 1.2rem", borderRadius: "100px", cursor: "pointer", fontSize: "0.85rem" }}>
            <ShoppingCart size={16} />
            Cart
            {totalItems > 0 && (
              <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#C9A84C", color: "#1A1208", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: "700" }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}