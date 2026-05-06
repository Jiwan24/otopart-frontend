import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/product")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const carBrands = [
    { name: "Toyota", slug: "toyota" },
    { name: "Honda", slug: "honda" },
    { name: "BMW", slug: "bmw" },
    { name: "Mercedes", slug: "mercedesbenz" },
    { name: "Suzuki", slug: "suzuki" },
    { name: "Mitsubishi", slug: "mitsubishi" },
    { name: "Hyundai", slug: "hyundai" },
    { name: "Mazda", slug: "mazda" },
    { name: "Nissan", slug: "nissan" },
    { name: "Audi", slug: "audi" },
    { name: "Kia", slug: "kia" },
    { name: "Daihatsu", slug: "daihatsu" }
  ];

  return (
    <main className="bg-white text-slate-900">
      
      {/* --- HERO SECTION --- */}
<section className="relative min-h-[90vh] w-full flex items-center bg-white overflow-hidden">
  <div className="absolute inset-0 w-full h-full">
    <img
      src="/man-washing-engine-station.jpg"
      alt="Workshop"
      className="w-full h-full object-cover object-center"
    />
    {/* Overlay yang diperbaiki: Gradient lebih halus agar gambar di sisi kanan tetap jelas */}
    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
    
    {/* Efek Fade di bagian bawah agar menyatu mulus dengan section berikutnya */}
    <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent"></div>
  </div>

  <div className="relative max-w-7xl mx-auto px-8 w-full z-10">
    <div className="max-w-2xl py-20">
      <div className="w-16 h-1.5 bg-orange-500 mb-8 rounded-full"></div>
      <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
        Suku Cadang <span className="text-orange-500 italic">Premium</span>
        <br />
        Kendaraan Anda.
      </h1>
      {/* Background semi-transparan tipis pada teks agar tetap terbaca meski gambar di belakangnya ramai */}
      <p className="mt-8 text-slate-700 text-lg max-w-md font-medium leading-relaxed bg-white/30 backdrop-blur-sm md:backdrop-blur-none p-2 rounded-md">
        Menyediakan komponen original dengan standar kualitas manufaktur tertinggi. 
        Presisi, tahan lama, dan bergaransi resmi.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-6">
        <button className="bg-slate-900 hover:bg-orange-600 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-xl shadow-slate-200">
          Jelajahi Produk
        </button>
        <a href="#koleksi" className="group flex items-center gap-3 text-slate-900 text-sm font-bold uppercase tracking-widest">
          Lihat Koleksi
          <span className="group-hover:translate-x-2 transition-transform duration-300 text-orange-500 text-xl">→</span>
        </a>
      </div>
    </div>
  </div>
</section>

      {/* --- SECTION: ABOUT (CLEAN LOOK) --- */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1000" 
                alt="Quality Assurance" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4 block underline decoration-2 underline-offset-8">Quality Standards</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 tracking-tight mt-6">
              Kualitas Tanpa <br /> <span className="text-orange-500">Kompromi</span>
            </h2>
            <p className="mt-8 text-slate-500 leading-relaxed text-lg font-normal">
              Setiap komponen telah melalui seleksi ketat oleh tim ahli kami. Kami memastikan setiap part yang sampai ke tangan Anda menjamin performa terbaik dan keamanan berkendara.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION: PARTNER BRANDS (LIGHT STYLE) --- */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="mb-16">
            <h3 className="text-slate-900 text-3xl font-bold tracking-tight">Support Berbagai Brand</h3>
            <p className="text-slate-500 mt-2 font-medium italic">Kompatibel dengan merk kendaraan global</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {carBrands.map((brand) => (
              <div 
                key={brand.name} 
                className="group flex flex-col items-center justify-center h-40 bg-white border border-slate-100 hover:border-orange-500 hover:shadow-xl hover:shadow-orange-100 transition-all duration-300 p-8 rounded-xl"
              >
                <img 
                  // Menggunakan logo berwarna hitam untuk background putih
                  src={`https://cdn.simpleicons.org/${brand.slug}/black`} 
                  alt={brand.name} 
                  className="w-10 h-10 object-contain opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 mb-4"
                  onError={(e) => {
                    e.target.src = "https://cdn.simpleicons.org/speedtest/black"; 
                    e.target.style.opacity = "0.1";
                  }}
                />
                <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] group-hover:text-slate-900 transition-all">
                  {brand.name.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER (MINIMALIST LIGHT) --- */}
      <footer className="bg-white py-16 border-t border-slate-100 text-center">
        <div className="flex justify-center items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">O</span>
            </div>
            <span className="font-black tracking-tighter text-slate-900">OTOPART.</span>
        </div>
        <p className="text-slate-400 text-[10px] tracking-[0.3em] uppercase font-bold">
          &copy; {new Date().getFullYear()} Premium Parts Ecommerce.
        </p>
      </footer>
    </main>
  );
}