import { useEffect, useState, useRef } from "react";
import { getAllFoods, createFood, updateFood, deleteFood, getAllOrders, updateOrderStatus, verifyDeliveryOTP, getAllFeedback, markFeedbackRead } from "../../api/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SERVER = import.meta.env.VITE_SERVER_URL;
const CATEGORIES = ["starter", "main", "dessert", "drink"];

export default function AdminDashboard() {
  const [tab, setTab]           = useState("menu");
  const [foods, setFoods]       = useState([]);
  const [orders, setOrders]     = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm]         = useState({ name: "", description: "", price: "", category: "starter" });
  const [image, setImage]       = useState(null);
  const [preview, setPreview]   = useState(null);
  const [editId, setEditId]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [otpInputs, setOtpInputs] = useState({}); // store OTP input per order
  const fileRef                 = useRef();
  const navigate                = useNavigate();

  useEffect(() => { fetchFoods(); fetchOrders(); fetchFeedbacks(); }, []);

  const fetchFoods     = async () => { const r = await getAllFoods();    setFoods(r.data); };
  const fetchOrders    = async () => { const r = await getAllOrders();   setOrders(r.data); };
  const fetchFeedbacks = async () => { const r = await getAllFeedback(); setFeedbacks(r.data); };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editId && !image) { toast.error("Please select an image"); return; }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append("image", image);

      if (editId) {
        await updateFood(editId, formData);
        toast.success("Food item updated!");
        setEditId(null);
      } else {
        await createFood(formData);
        toast.success("Food item added!");
      }
      setForm({ name: "", description: "", price: "", category: "starter" });
      setImage(null); setPreview(null);
      fetchFoods();
    } catch { toast.error("Failed to save"); }
    finally { setLoading(false); }
  };

  const handleEdit = (food) => {
    setEditId(food._id);
    setForm({ name: food.name, description: food.description, price: food.price, category: food.category });
    setPreview(`${SERVER}/uploads/${food.image}`);
    setTab("menu");
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    await deleteFood(id);
    toast.success("Deleted!");
    fetchFoods();
  };

  // Status change — only allowed transitions
  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      toast.success("Status updated!");
      fetchOrders();
    } catch { toast.error("Failed to update status"); }
  };

  // OTP verification for delivery
  const handleVerifyOTP = async (orderId) => {
    const otp = otpInputs[orderId];
    if (!otp || otp.length !== 4) { toast.error("Enter 4-digit OTP"); return; }
    try {
      await verifyDeliveryOTP(orderId, otp);
      toast.success("OTP verified! Order delivered ✅");
      fetchOrders();
    } catch (err) {
      toast.error(err.response?.data?.message || "Wrong OTP!");
    }
  };

  const handleMarkRead = async (id) => {
    await markFeedbackRead(id);
    fetchFeedbacks();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const unreadCount = feedbacks.filter(f => f.status === "unread").length;

  return (
    <div style={{ minHeight: "100vh", background: "#120d04" }}>

      {/* Admin Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(26,18,8,0.98)" }}>
        <span style={{ fontFamily: "serif", fontSize: "1.4rem", color: "#C9A84C" }}>Saffron Admin</span>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {[
            ["menu",     "🍽 Menu",    null],
            ["orders",   "📦 Orders",  null],
            ["feedback", "💬 Feedback", unreadCount],
          ].map(([key, label, badge]) => (
            <button key={key} onClick={() => setTab(key)}
              style={{ position: "relative", background: tab === key ? "#E8631A" : "transparent", color: tab === key ? "white" : "rgba(255,255,255,0.5)", border: `1px solid ${tab === key ? "#E8631A" : "rgba(255,255,255,0.15)"}`, padding: "0.5rem 1.2rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem" }}>
              {label}
              {badge > 0 && (
                <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#ef4444", color: "white", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontWeight: "700" }}>
                  {badge}
                </span>
              )}
            </button>
          ))}
          <button onClick={handleLogout}
            style={{ background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.5rem 1rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.85rem" }}>
            Logout
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>

        {/* ── MENU TAB ── */}
        {tab === "menu" && (
          <div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "2rem", marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "serif", color: "#C9A84C", marginBottom: "1.5rem", fontSize: "1.3rem" }}>
                {editId ? "✏️ Edit Food Item" : "➕ Add New Food Item"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <input placeholder="Food Name" required value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                  <input type="number" placeholder="Price (₹)" required value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })} style={inputStyle} />
                </div>
                <textarea placeholder="Description" required value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  style={{ ...inputStyle, width: "100%", height: "80px", resize: "vertical", marginBottom: "1rem" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    {CATEGORIES.map((c) => <option key={c} value={c} style={{ background: "#1A1208" }}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                  </select>
                  <div>
                    <input type="file" accept="image/*" ref={fileRef} onChange={handleImageChange} style={{ display: "none" }} />
                    <button type="button" onClick={() => fileRef.current.click()}
                      style={{ ...inputStyle, cursor: "pointer", textAlign: "left", color: "rgba(255,255,255,0.5)" }}>
                      📷 {image ? image.name : "Choose Food Image"}
                    </button>
                  </div>
                </div>
                {preview && <img src={preview} alt="preview" style={{ height: "120px", borderRadius: "12px", objectFit: "cover", marginBottom: "1.5rem" }} />}
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button type="submit" disabled={loading}
                    style={{ background: "#E8631A", color: "white", border: "none", padding: "0.85rem 2rem", borderRadius: "12px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500" }}>
                    {loading ? "Saving..." : editId ? "Update Item" : "Add Item"}
                  </button>
                  {editId && (
                    <button type="button" onClick={() => { setEditId(null); setForm({ name: "", description: "", price: "", category: "starter" }); setPreview(null); setImage(null); }}
                      style={{ background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", padding: "0.85rem 1.5rem", borderRadius: "12px", cursor: "pointer" }}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <h2 style={{ fontFamily: "serif", color: "#C9A84C", marginBottom: "1.5rem" }}>All Menu Items ({foods.length})</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "1.5rem" }}>
              {foods.map((food) => (
                <div key={food._id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
                  <img src={`${SERVER}/uploads/${food.image}?t=${Date.now()}`} alt={food.name}
                    style={{ width: "100%", height: "160px", objectFit: "cover" }}
                    onError={(e) => { e.target.style.display = "none"; }} />
                  <div style={{ padding: "1rem" }}>
                    <p style={{ fontWeight: "500", marginBottom: "0.3rem" }}>{food.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginBottom: "0.5rem" }}>{food.category}</p>
                    <p style={{ color: "#C9A84C", fontFamily: "serif", fontSize: "1.1rem", marginBottom: "1rem" }}>₹{food.price}</p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button onClick={() => handleEdit(food)}
                        style={{ flex: 1, background: "rgba(201,168,76,0.1)", color: "#C9A84C", border: "1px solid rgba(201,168,76,0.2)", padding: "0.5rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem" }}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(food._id)}
                        style={{ flex: 1, background: "rgba(220,38,38,0.1)", color: "#f87171", border: "1px solid rgba(220,38,38,0.2)", padding: "0.5rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem" }}>
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {tab === "orders" && (
          <div>
            <h2 style={{ fontFamily: "serif", color: "#C9A84C", marginBottom: "1.5rem" }}>All Orders ({orders.length})</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {orders.map((order) => (
                <div key={order._id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "1.5rem" }}>

                  {/* Order Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                    <div>
                      <p style={{ fontWeight: "500", fontSize: "1rem" }}>{order.customerName}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>{order.customerEmail} • {order.customerPhone}</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginTop: "0.25rem" }}>📍 {order.address}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "serif", fontSize: "1.3rem", color: "#C9A84C" }}>₹{order.totalAmount}</p>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "0.75rem 0", marginBottom: "1rem" }}>
                    {order.items.map((item, i) => (
                      <span key={i} style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", marginRight: "1rem" }}>
                        {item.name} × {item.qty}
                      </span>
                    ))}
                  </div>

                  {/* Status Badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1px" }}>Status:</span>
                      <span style={{ padding: "0.3rem 0.9rem", borderRadius: "100px", fontSize: "0.78rem", fontWeight: "500", ...statusStyle(order.status) }}>
                        {statusEmoji(order.status)} {order.status.replace(/-/g, " ")}
                      </span>
                    </div>

                    {/* Status Change Buttons — smart flow */}
                    {order.status === "pending" && (
                      <button onClick={() => handleStatusChange(order._id, "payment-confirmed")}
                        style={actionBtnStyle("#3b82f6")}>
                        ✅ Confirm Payment
                      </button>
                    )}
                    {order.status === "payment-confirmed" && (
                      <button onClick={() => handleStatusChange(order._id, "preparing")}
                        style={actionBtnStyle("#C9A84C")}>
                        👨‍🍳 Start Preparing
                      </button>
                    )}
                    {order.status === "preparing" && (
                      <button onClick={() => handleStatusChange(order._id, "out-for-delivery")}
                        style={actionBtnStyle("#8b5cf6")}>
                        🚗 Out for Delivery
                      </button>
                    )}

                    {/* OTP input for delivery */}
                    {order.status === "out-for-delivery" && (
                      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <input
                          type="text" maxLength={4} placeholder="Enter OTP"
                          value={otpInputs[order._id] || ""}
                          onChange={(e) => setOtpInputs({ ...otpInputs, [order._id]: e.target.value })}
                          style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", padding: "0.4rem 0.75rem", color: "white", width: "110px", fontSize: "0.9rem", letterSpacing: "4px", outline: "none" }}
                        />
                        <button onClick={() => handleVerifyOTP(order._id)}
                          style={actionBtnStyle("#22c55e")}>
                          ✅ Verify & Deliver
                        </button>
                      </div>
                    )}

                    {order.status === "delivered" && (
                      <span style={{ color: "#4ade80", fontSize: "0.82rem" }}>✅ Delivered successfully</span>
                    )}
                  </div>

                  {/* Show OTP hint for testing */}
                  {order.status === "out-for-delivery" && order.deliveryOTP && (
                    <p style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
                      (Dev mode — OTP: {order.deliveryOTP})
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FEEDBACK TAB ── */}
        {tab === "feedback" && (
          <div>
            <h2 style={{ fontFamily: "serif", color: "#C9A84C", marginBottom: "1.5rem" }}>
              Customer Feedback ({feedbacks.length})
              {unreadCount > 0 && <span style={{ marginLeft: "1rem", background: "#ef4444", color: "white", fontSize: "0.75rem", padding: "0.2rem 0.7rem", borderRadius: "100px" }}>{unreadCount} unread</span>}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {feedbacks.map((fb) => (
                <div key={fb._id}
                  style={{ background: fb.status === "unread" ? "rgba(232,99,26,0.06)" : "rgba(255,255,255,0.03)", border: `1px solid ${fb.status === "unread" ? "rgba(232,99,26,0.2)" : "rgba(255,255,255,0.07)"}`, borderRadius: "16px", padding: "1.5rem" }}>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <p style={{ fontWeight: "500" }}>{fb.name}</p>
                        <span style={{ padding: "0.2rem 0.75rem", borderRadius: "100px", fontSize: "0.72rem", background: typeColor(fb.type) + "22", color: typeColor(fb.type), border: `1px solid ${typeColor(fb.type)}44` }}>
                          {typeEmoji(fb.type)} {fb.type}
                        </span>
                        {fb.status === "unread" && (
                          <span style={{ background: "#ef4444", color: "white", fontSize: "0.65rem", padding: "0.2rem 0.6rem", borderRadius: "100px" }}>NEW</span>
                        )}
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", marginTop: "0.2rem" }}>{fb.email}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1rem", marginBottom: "0.3rem" }}>
                        {"⭐".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}
                      </div>
                      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.88rem", lineHeight: "1.6", marginBottom: "1rem", background: "rgba(255,255,255,0.03)", padding: "0.75rem", borderRadius: "10px" }}>
                    "{fb.message}"
                  </p>

                  {fb.status === "unread" && (
                    <button onClick={() => handleMarkRead(fb._id)}
                      style={{ background: "transparent", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.4rem 1rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.78rem" }}>
                      Mark as Read
                    </button>
                  )}
                </div>
              ))}
              {feedbacks.length === 0 && (
                <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "3rem" }}>No feedback yet</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper styles
const inputStyle = {
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "12px", padding: "0.85rem 1rem", color: "white",
  fontSize: "0.9rem", outline: "none", width: "100%",
};

const actionBtnStyle = (color) => ({
  background: color + "22", color, border: `1px solid ${color}44`,
  padding: "0.4rem 1rem", borderRadius: "8px", cursor: "pointer", fontSize: "0.82rem",
});

const statusStyle = (status) => ({
  pending:           { background: "rgba(232,99,26,0.15)",  color: "#E8631A" },
  "payment-confirmed": { background: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  preparing:         { background: "rgba(201,168,76,0.15)", color: "#C9A84C" },
  "out-for-delivery":{ background: "rgba(139,92,246,0.15)", color: "#a78bfa" },
  delivered:         { background: "rgba(34,197,94,0.15)",  color: "#4ade80" },
}[status] || {});

const statusEmoji = (s) => ({
  pending: "⏳", "payment-confirmed": "💳",
  preparing: "👨‍🍳", "out-for-delivery": "🚗", delivered: "✅",
}[s] || "");

const typeColor = (t) => ({ suggestion: "#3b82f6", compliment: "#22c55e", complaint: "#ef4444", other: "#C9A84C" }[t]);
const typeEmoji = (t) => ({ suggestion: "💡", compliment: "👏", complaint: "⚠️", other: "📝" }[t]);