import { useState } from "react";
import { allProducts } from "@/data/products";

const categories = [
  { label: "Todos", value: "all" },
  { label: "Hidratação", value: "hidratacao" },
  { label: "Maquilhagem", value: "maquilhagem" },
  { label: "Perfumaria", value: "perfumaria" },
  { label: "Cabelo", value: "cabelo" },
  { label: "Skincare", value: "skincare" },
];

const ProductsSection = () => {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const filtered = allProducts.filter((p) => {
    const matchCat = activeCat === "all" || p.cat === activeCat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section className="px-9 py-[52px] pb-[72px] max-w-[1120px] mx-auto max-md:px-[18px] max-md:py-8 max-md:pb-[52px]">
      <span className="inline-flex items-center gap-2 text-[11px] tracking-[.18em] uppercase text-pink-deep font-medium mb-3 before:block before:w-6 before:h-px before:bg-pink">
        Catálogo Completo
      </span>
      <h2 className="font-display text-[clamp(30px,5vw,50px)] font-light text-foreground leading-[1.1] mb-1.5">
        Os Nossos<br /><em className="italic text-pink-deep">Produtos</em>
      </h2>
      <div className="w-11 h-0.5 bg-gradient-to-r from-pink to-transparent rounded-full mt-4 mb-10" />

      {/* Search */}
      <div className="flex gap-3 mb-5">
        <div className="flex-1 relative">
          <span className="absolute left-[17px] top-1/2 -translate-y-1/2 text-pink text-[15px]">🔍</span>
          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActiveCat("all");
            }}
            className="w-full py-[13px] pl-[46px] pr-[18px] rounded-full border-2 border-border bg-white/75 font-body text-sm text-foreground outline-none focus:border-pink focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap mb-7">
        {categories.map((cat) => (
          <button
            key={cat.value}
            className={`py-2 px-[18px] rounded-full border-[1.5px] font-body text-xs font-medium tracking-wider cursor-pointer transition-all ${
              activeCat === cat.value
                ? "bg-pink-light border-pink text-pink-deep"
                : "border-border bg-white/70 text-mid hover:bg-pink-light hover:border-pink hover:text-pink-deep"
            }`}
            onClick={() => setActiveCat(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5 max-md:grid-cols-[repeat(auto-fill,minmax(155px,1fr))] max-md:gap-3.5 max-sm:grid-cols-2">
        {filtered.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="bg-white/82 backdrop-blur-[10px] rounded-lg overflow-hidden border border-border shadow-card hover:-translate-y-2 hover:shadow-hover transition-all cursor-pointer"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-pink-light via-rose to-pink-light flex items-center justify-center text-[64px] relative overflow-hidden">
              {p.emoji}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_25%,rgba(255,255,255,0.4),transparent_60%)]" />
            </div>
            <div className="p-[18px_20px_20px]">
              <div className="font-display text-lg font-semibold text-foreground mb-1">{p.name}</div>
              <div className="text-xs text-mid font-light mb-3.5 leading-relaxed">{p.desc}</div>
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="text-xl font-semibold text-pink-deep">{p.price}</span>
              </div>
              <button className="w-full py-[11px] rounded-xl bg-pink-light text-pink-deep font-body text-xs font-medium tracking-wider uppercase border-none cursor-pointer hover:bg-gradient-to-r hover:from-pink hover:to-pink-deep hover:text-primary-foreground hover:scale-[1.02] transition-all">
                Ver produto
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
