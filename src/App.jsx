import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart"; // Import halaman Cart yang baru
import Login from "./components/Login";
import { CartProvider } from "./context/CartContext";
import About from "./pages/About";

export default function App() {
  // Cek apakah user sudah login (memiliki token)
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const isAuthenticated = !!token;

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <CartProvider>
      <div className="bg-white min-h-screen text-slate-900 selection:bg-orange-100">
        
        {/* Navbar tetap di luar Routes agar selalu muncul di tiap halaman */}
        <Navbar token={token} onLogout={handleLogout} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            
            {/* Rute baru untuk Halaman Keranjang Belanja */}
            <Route path="/cart" element={<Cart />} />
            
            {/* 
              Logika: Jika user sudah login, mereka tidak boleh masuk ke halaman login lagi.
              Arahkan otomatis ke halaman utama (Home).
            */}
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
            />

            {/* Fallback: Jika user mengetik URL asal, arahkan ke Home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Footer bisa diletakkan di sini jika sudah ada komponennya */}
      </div>
    </CartProvider>
  );
}
