import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar({ token, onLogout }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State untuk menu mobile
  const location = useLocation();
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Tutup menu mobile saat pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Produk", to: "/products", active: location.pathname === "/products" },
    { label: "Kategori", to: "#", active: false },
    { label: "Tentang", to: "/about", active: location.pathname === "/about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
      scrolled || isOpen
        ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 py-3 shadow-sm" 
        : "bg-white py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 z-[110]">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center transition-transform duration-500 hover:rotate-12">
            <img src="/logo.png" alt="Otopart" className="h-6 w-auto brightness-0 invert" />
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
              className={`px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full ${
                link.active ? "text-orange-500 bg-orange-50" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4 z-[110]">
          {/* Cart Icon (Selalu Muncul) */}
          <Link to="/cart" className="relative p-2.5 text-slate-400 hover:text-orange-500 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-orange-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Button Desktop */}
          <div className="hidden md:block">
            {token ? (
              <button onClick={onLogout} className="px-6 py-2.5 text-[10px] font-black uppercase bg-slate-100 text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all">
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-6 py-2.5 text-[10px] font-black uppercase bg-slate-900 text-white rounded-xl hover:bg-orange-600 transition-all">
                Masuk
              </Link>
            )}
          </div>

          {/* Hamburger Menu Button (Mobile Only) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 md:hidden text-slate-900 focus:outline-none"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Menu Samping/Overlay) */}
      <div className={`fixed inset-0 bg-white z-[105] md:hidden transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col h-full pt-28 px-8 pb-10">
          <div className="space-y-6 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`block text-2xl font-black uppercase tracking-tighter ${
                  link.active ? "text-orange-500" : "text-slate-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Button Mobile */}
          <div className="pt-8 border-t border-slate-100">
            {token ? (
              <button 
                onClick={onLogout}
                className="w-full py-4 text-center font-black uppercase tracking-widest bg-red-50 text-red-600 rounded-2xl"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login"
                className="block w-full py-4 text-center font-black uppercase tracking-widest bg-slate-900 text-white rounded-2xl shadow-xl shadow-slate-200"
              >
                Masuk ke Akun
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}