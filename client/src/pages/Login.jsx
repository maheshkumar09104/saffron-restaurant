import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = isRegister
        ? `${import.meta.env.VITE_API_URL}/users/register`
        : `${import.meta.env.VITE_API_URL}/users/login`;

      const res = await axios.post(url, form);
      login(res.data);
      toast.success(isRegister ? "Account created! 🎉" : "Welcome back! 👋");
      navigate("/menu");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "2.5rem", width: "100%", maxWidth: "420px" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontFamily: "serif", fontSize: "2rem", color: "#C9A84C" }}>Saffron.</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginTop: "0.3rem" }}>
            {isRegister ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {isRegister && (
            <input
              type="text" placeholder="Full Name" required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={inputStyle}
            />
          )}
          <input
            type="email" placeholder="Email Address" required
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
          {isRegister && (
            <input
              type="tel" placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              style={inputStyle}
            />
          )}

          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? "Please wait..." : isRegister ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
          {isRegister ? "Already have an account? " : "New here? "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            style={{ color: "#E8631A", cursor: "pointer", fontWeight: "500" }}
          >
            {isRegister ? "Sign In" : "Create Account"}
          </span>
        </p>

        {/* Admin login link */}
        <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.75rem" }}>
          <Link to="/admin/login" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none" }}>
            Admin Login →
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%", background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px",
  padding: "0.85rem 1rem", color: "white", fontSize: "0.9rem",
  outline: "none",
};

const btnStyle = {
  background: "#E8631A", color: "white", border: "none",
  padding: "0.9rem", borderRadius: "12px", fontSize: "0.9rem",
  cursor: "pointer", fontWeight: "500", marginTop: "0.5rem",
};