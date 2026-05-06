export default function About() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-8">
        <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
          Tentang Kami
        </span>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">
          Solusi Terpercaya untuk <br /> Suku Cadang Kendaraan Anda.
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 leading-relaxed">
          <p className="text-sm">
            Otopart hadir sebagai platform modern bagi para pemilik kendaraan yang menginginkan kemudahan dalam mencari suku cadang berkualitas tinggi. Kami fokus pada penyediaan komponen mesin dan sistem kelistrikan yang terjamin keasliannya.
          </p>
          <p className="text-sm">
            Sebagai bagian dari portofolio pengembangan perangkat lunak, platform ini dibangun menggunakan teknologi terbaru seperti .NET Core dan React untuk memberikan pengalaman belanja yang cepat, aman, dan responsif.
          </p>
        </div>

        <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-slate-900 font-bold mb-1">Lokasi Kami</h3>
            <p className="text-slate-500 text-xs font-medium">Jl. Teknik Informatika No. 101, Indonesia</p>
          </div>
          <div className="flex gap-4">
             <div className="text-center">
                <span className="block text-xl font-bold text-slate-900">100%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Original</span>
             </div>
             <div className="w-[1px] h-10 bg-slate-200"></div>
             <div className="text-center">
                <span className="block text-xl font-bold text-slate-900">24/7</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Support</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}