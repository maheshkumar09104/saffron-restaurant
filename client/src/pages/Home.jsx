export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
      <h1 style={{ fontFamily: "serif", fontSize: "3.5rem", color: "#C9A84C", marginBottom: "1rem" }}>
        Welcome to Saffron
      </h1>
      <p style={{ color: "rgba(253,246,236,0.8)", fontSize: "1.2rem", marginBottom: "2rem" }}>
        Authentic Indian Cuisine
      </p>
      <a href="/menu" style={{
        background: "#E8631A", color: "white", padding: "0.85rem 2.5rem",
        borderRadius: "100px", textDecoration: "none", fontSize: "1rem", fontWeight: "500",
      }}>
        View Menu
      </a>
    </div>
  );
}