export default function Contact() {
  return (
    <div style={{ padding: "5rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "serif", fontSize: "2.5rem", color: "#C9A84C", marginBottom: "2rem" }}>
        Contact Us
      </h1>

      <div style={{ display: "grid", gap: "1.5rem", marginBottom: "3rem" }}>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "1.5rem" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>Address</p>
          <p style={{ marginTop: "0.5rem" }}>Anna Nagar, Chennai, Tamil Nadu</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "1.5rem" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>Phone</p>
          <p style={{ marginTop: "0.5rem" }}>+91 98765 43210</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "1.5rem" }}>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>Hours</p>
          <p style={{ marginTop: "0.5rem" }}>Monday – Sunday: 11am to 11pm</p>
        </div>
      </div>
    </div>
  );
}