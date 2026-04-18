import { useState } from "react";
import { submitFeedback } from "../api/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const TYPES = ["suggestion", "compliment", "complaint", "other"];

export default function Feedback() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name:    user?.name  || "",
    email:   user?.email || "",
    type:    "suggestion",
    message: "",
    rating:  5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitFeedback(form);
      setSubmitted(true);
      toast.success("Feedback submitted! Thank you 🙏");
    } catch {
      toast.error("Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
      <div>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🙏</div>
        <h2 style={{ fontFamily: "serif", fontSize: "2rem", color: "#C9A84C", marginBottom: "1rem" }}>Thank You!</h2>
        <p style={{ color: "rgba(255,255,255,0.5)" }}>Your feedback has been received. We appreciate your time!</p>
        <button onClick={() => setSubmitted(false)}
          style={{ marginTop: "2rem", background: "#E8631A", color: "white", border: "none", padding: "0.75rem 2rem", borderRadius: "12px", cursor: "pointer", fontSize: "0.9rem" }}>
          Submit Another
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "serif", fontSize: "2.5rem", color: "#C9A84C", marginBottom: "0.5rem" }}>
        Your Feedback
      </h1>
      <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "2.5rem" }}>
        Share your experience, suggestions, or any concerns with us.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

        {/* Name & Email */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <input placeholder="Your Name" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle} />
          <input type="email" placeholder="Email" required value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle} />
        </div>

        {/* Feedback Type */}
        <div>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.7rem", textTransform: "uppercase", letterSpacing: "1px" }}>
            Type of Feedback
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            {TYPES.map((t) => (
              <button key={t} type="button" onClick={() => setForm({ ...form, type: t })}
                style={{
                  padding: "0.5rem 1.2rem", borderRadius: "100px", cursor: "pointer",
                  fontSize: "0.82rem", textTransform: "capitalize", transition: "all 0.2s",
                  background: form.type === t ? typeColor(t) : "rgba(255,255,255,0.05)",
                  color: form.type === t ? "white" : "rgba(255,255,255,0.5)",
                  border: `1px solid ${form.type === t ? typeColor(t) : "rgba(255,255,255,0.1)"}`,
                }}>
                {typeEmoji(t)} {t}
              </button>
            ))}
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.7rem", textTransform: "uppercase", letterSpacing: "1px" }}>
            Rating
          </p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setForm({ ...form, rating: star })}
                style={{ background: "none", border: "none", fontSize: "2rem", cursor: "pointer", opacity: star <= form.rating ? 1 : 0.3, transition: "opacity 0.2s" }}>
                ⭐
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <textarea
          placeholder="Write your feedback here... (minimum 20 characters)"
          required minLength={20} value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ ...inputStyle, height: "140px", resize: "vertical" }}
        />

        <button type="submit" disabled={loading}
          style={{ background: "#E8631A", color: "white", border: "none", padding: "0.9rem", borderRadius: "12px", fontSize: "0.9rem", fontWeight: "500", cursor: "pointer" }}>
          {loading ? "Submitting..." : "Submit Feedback →"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%", background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px",
  padding: "0.85rem 1rem", color: "white", fontSize: "0.9rem", outline: "none",
};

const typeColor = (t) => ({
  suggestion: "#3b82f6", compliment: "#22c55e",
  complaint: "#ef4444",  other: "#C9A84C",
}[t]);

const typeEmoji = (t) => ({
  suggestion: "💡", compliment: "👏",
  complaint: "⚠️",  other: "📝",
}[t]);