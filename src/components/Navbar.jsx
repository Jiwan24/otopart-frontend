import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import context keranjang

export default function Navbar({ token, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart(); // Ambil data keranjang

  // Hitung total item unik di keranjang
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Produk", to: "/products", active: location.pathname === "/products" },
    { label: "Kategori", to: "#", active: false },
    { label: "Tentang", to: "/about", active: location.pathname === "/about" },
  ];

  const handleLogout = () => {
    onLogout?.();
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled 
        ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm" 
        : "bg-white py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
             <img
              src="/logo.png"
              alt="Otopart"
              className="h-6 w-auto object-contain brightness-0 invert"
            />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">
            OTOPART
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`
                px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full
                ${link.active 
                  ? "text-orange-500 bg-orange-50" 
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r border-slate-100 pr-4">
            <button className="p-2.5 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Link ke Halaman Cart */}
            <Link to="/cart" className="relative p-2.5 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-orange-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Auth Button */}
          <div>
            {token ? (
              <button 
                onClick={handleLogout}
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all rounded-xl border border-transparent hover:border-red-100"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white hover:bg-orange-600 shadow-lg shadow-slate-200 hover:shadow-orange-200 transition-all rounded-xl inline-block"
              >
                Masuk
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
