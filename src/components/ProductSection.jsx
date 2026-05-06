import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [categories, setCategories] = useState(["Semua"]);

  useEffect(() => {
    api.get("/Product")
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.error("Error produk:", err));

    api.get("/Category")
      .then(res => {
        const categoryNames = res.data.map(c => c.name || c.categoryName || c); 
        setCategories(["Semua", ...categoryNames]);
      })
      .catch(err => {
        console.error("Error kategori:", err);
        setCategories(["Semua"]);
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (selectedCategory !== "Semua") {
      result = result.filter(p => (p.category === selectedCategory || p.categoryName === selectedCategory));
    }
    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  if (!categories || categories.length === 0) {
    return <div className="bg-white min-h-screen"></div>;
  }

  return (
    <section id="koleksi" className="bg-white min-h-screen pt-32 pb-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="w-16 h-1.5 bg-orange-500 mb-6 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Koleksi <span className="text-orange-500">Terbaik</span>
            </h2>
            <p className="text-slate-500 mt-2 font-medium">Temukan komponen presisi untuk performa maksimal.</p>
          </div>
          
          {/* Badge Count */}
          <div className="bg-slate-100 px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <span className="text-slate-900 font-bold text-sm">
               {filteredProducts.length} Produk Ditemukan
            </span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-16 p-2 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex-[3] relative">
            <input 
              type="text"
              placeholder="Cari suku cadang (misal: Oli, Rem, Piston)..."
              className="w-full bg-white border border-slate-200 text-slate-900 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm font-medium shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative flex-1">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-900 px-6 py-4 rounded-xl appearance-none cursor-pointer font-bold tracking-tight text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat === "Semua" ? "SEMUA KATEGORI" : cat.toUpperCase()}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-orange-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
             <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Produk tidak ditemukan</p>
          </div>
        )}
      </div>
    </section>
  );
}