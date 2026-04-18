import { useState } from "react";
import { adminLogin } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminLogin(form);
      localStorage.setItem("adminToken", res.data.token);
      toast.success("Welcome Admin!");
      navigate("/admin");
    } catch {
      toast.error("Wrong email or password");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "2.5rem", width: "100%", maxWidth: "380px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "serif", fontSize: "2rem", color: "#C9A84C" }}>Saffron.</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "0.3rem" }}>
            Admin Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="email" placeholder="Admin Email" required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />
          <input
            type="password" placeholder="Password" required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={inputStyle}
          />
          <button type="submit" style={btnStyle}>
            Login to Admin
          </button>
        </form>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "1.5rem 0" }} />

        {/* Back to Customer Login */}
        <Link to="/login"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "0.75rem", textDecoration: "none", color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", transition: "all 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(232,99,26,0.4)"}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
        >
          ← Back to Customer Login
        </Link>

        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
          admin@saffron.com / admin123
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "12px",
  padding: "0.85rem 1rem",
  color: "white",
  fontSize: "0.9rem",
  outline: "none",
};

const btnStyle = {
  background: "#E8631A",
  color: "white",
  border: "none",
  padding: "0.9rem",
  borderRadius: "12px",
  fontSize: "0.9rem",
  cursor: "pointer",
  fontWeight: "500",
};