import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import Payment from "./pages/Payment";
import OrderSuccess from "./pages/OrderSuccess";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#2a1e0a",
                color: "#FDF6EC",
                border: "1px solid rgba(201,168,76,0.3)",
              },
            }}
          />
          <Routes>
            <Route path="/"              element={<><Navbar /><Home /></>} />
            <Route path="/menu"          element={<><Navbar /><Menu /></>} />
            <Route path="/cart"          element={<><Navbar /><Cart /></>} />
            <Route path="/contact"       element={<><Navbar /><Contact /></>} />
            <Route path="/feedback"      element={<><Navbar /><Feedback /></>} />
            <Route path="/login"         element={<Login />} />
            <Route path="/payment"       element={<Payment />} />
            <Route path="/order-success" element={<><Navbar /><OrderSuccess /></>} />
            <Route path="/admin/login"   element={<AdminLogin />} />
            <Route path="/admin"         element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}