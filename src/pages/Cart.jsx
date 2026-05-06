import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center pt-20">
        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Keranjang Anda Kosong</h2>
        <p className="text-slate-500 mt-1 mb-8 text-sm">Sepertinya Anda belum memilih produk apa pun.</p>
        <Link to="/products" className="bg-slate-900 text-white px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-orange-600 transition-all">
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex items-center gap-3 mb-10">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Keranjang Belanja</h1>
          <span className="text-slate-400 text-sm font-medium">({cartItems.length} Produk)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* List Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-6 pb-6 border-b border-slate-50 group">
                  <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                    <img 
                      src={`https://localhost:7184${item.imageUrl}`} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">{item.categoryName || "Genuine Part"}</span>
                    <h3 className="text-base font-semibold text-slate-800 mt-0.5">{item.name}</h3>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(item.price)}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-slate-100 rounded-lg bg-slate-50">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="px-3 py-1 hover:text-orange-600 text-slate-400 transition-colors"
                        >−</button>
                        <span className="px-2 py-1 text-xs font-bold text-slate-700 w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="px-3 py-1 hover:text-orange-600 text-slate-400 transition-colors"
                        >+</button>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-base font-bold text-slate-900">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={clearCart} className="mt-6 text-slate-400 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest transition-colors">
              Hapus Semua Item
            </button>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 sticky top-28">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-6">Ringkasan Pesanan</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-700">Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Estimasi Pengiriman</span>
                  <span className="text-green-600 font-semibold uppercase text-[10px]">Gratis</span>
                </div>
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-orange-600">Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-slate-200">
                Lanjut ke Pembayaran
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-slate-400">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" /></svg>
                <span className="text-[9px] font-bold uppercase tracking-tighter">Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}