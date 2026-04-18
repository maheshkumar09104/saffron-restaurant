import { X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, changeQty, totalPrice } = useCart();
  const navigate = useNavigate();
  const SERVER = import.meta.env.VITE_SERVER_URL;

  return (
    <>
      {/* Dark overlay behind sidebar */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar panel */}
      <div className={`fixed right-0 top-0 h-full w-[360px] bg-[#1f1508] border-l border-yellow-900/20 z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="font-display text-xl text-brand-gold">Your Order</h2>
          <button onClick={onClose}><X size={20} className="text-white/50 hover:text-white" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-white/40 text-sm text-center mt-10">Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-3 items-center">
                <img
                  src={`${SERVER}/uploads/${item.image}`}
                  alt={item.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-brand-gold text-sm">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={() => changeQty(item._id, -1)} className="w-6 h-6 bg-white/10 rounded-full text-sm">−</button>
                    <span className="text-sm">{item.qty}</span>
                    <button onClick={() => changeQty(item._id, 1)} className="w-6 h-6 bg-white/10 rounded-full text-sm">+</button>
                  </div>
                </div>
                <span className="text-sm text-brand-gold">₹{item.price * item.qty}</span>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="flex justify-between mb-4">
            <span className="text-white/60">Total</span>
            <span className="font-display text-xl text-brand-gold">₹{totalPrice}</span>
          </div>
          <button
            onClick={() => { onClose(); navigate("/cart"); }}
            className="w-full bg-brand-orange text-white py-3 rounded-xl font-medium hover:bg-orange-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}