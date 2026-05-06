import { useCart } from "../context/CartContext";

const BASE_URL = "https://localhost:7184";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  const image = product.imageUrl
    ? BASE_URL + product.imageUrl
    : "/no-image.png";

  return (
    <div className="group bg-white border border-slate-100 rounded-xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 flex flex-col h-full">
      
      {/* IMAGE CONTAINER */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
        />
        
        {/* Simple Quick Add - Hanya muncul saat hover, tanpa background pekat */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold py-2 rounded-lg uppercase tracking-wider hover:bg-orange-600 transition-colors"
          >
            + Keranjang
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[9px] font-bold text-orange-500 uppercase tracking-wider">
            {product.categoryName || "Part"}
          </span>
          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
          <span className="text-[9px] font-medium text-slate-400 uppercase">
            In Stock
          </span>
        </div>
        
        <h2 className="text-slate-800 text-sm font-semibold line-clamp-2 mb-3 leading-snug group-hover:text-orange-600 transition-colors">
          {product.name}
        </h2>

        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
          <p className="text-slate-900 font-bold text-sm">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0
            }).format(product.price)}
          </p>
          
          {/* Ikon kecil yang lebih halus */}
          <button 
            onClick={() => addToCart(product)}
            className="text-slate-300 hover:text-orange-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}