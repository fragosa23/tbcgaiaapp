import { campaigns, type Campaign } from "@/data/products";

interface ProductDetailProps {
  productId: string;
  onBack: () => void;
  onNavigate: (section: string) => void;
  onAddToCart: (id: string) => void;
}

const ProductDetail = ({ productId, onBack, onNavigate, onAddToCart }: ProductDetailProps) => {
  const product = campaigns.find((p) => p.id === productId) as Campaign;
  if (!product) return null;

  const backButton = (
    <button
      onClick={onBack}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-body text-xs font-medium tracking-wider uppercase cursor-pointer bg-white/80 text-pink-deep border-2 border-pink hover:bg-pink-light transition-all"
    >
      ← Voltar
    </button>
  );

  return (
    <section className="px-9 py-[52px] pb-[72px] max-w-[1120px] mx-auto max-md:px-[18px] max-md:py-8">
      <div className="mb-8">{backButton}</div>

      <div className="grid grid-cols-2 gap-12 items-start max-md:grid-cols-1 max-md:gap-7">
        {/* Image */}
        <div className="aspect-square rounded-lg bg-gradient-to-br from-pink-light to-rose flex items-center justify-center text-[120px] relative overflow-hidden shadow-elevated">
          {product.emoji}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_25%,rgba(255,255,255,0.4),transparent_60%)]" />
          <span className="absolute top-[18px] left-[18px] z-[1] bg-gradient-to-br from-pink to-pink-deep text-primary-foreground text-[13px] font-bold tracking-wider uppercase px-4 py-1.5 rounded-full">
            {product.badge}
          </span>
        </div>

        {/* Info */}
        <div>
          <div className="text-[11px] tracking-[.18em] uppercase text-pink-deep font-medium mb-3 inline-flex items-center gap-2 before:block before:w-6 before:h-px before:bg-pink">
            {product.cat}
          </div>
          <h2 className="font-display text-[clamp(28px,5vw,48px)] font-light text-foreground leading-[1.1] mb-4">
            {product.name}
          </h2>
          <p className="text-[15px] text-mid font-light leading-[1.8] mb-7">{product.desc}</p>

          <ul className="list-none mb-8 flex flex-col gap-2.5">
            {product.benefits.map((b, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-foreground font-light">
                <span className="inline-flex w-6 h-6 rounded-full bg-pink-light text-pink-deep items-center justify-center text-xs font-semibold flex-shrink-0">
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3.5 mb-7">
            <span className="text-base text-mid/60 line-through">{product.before}</span>
            <span className="text-4xl font-semibold text-pink-deep max-md:text-[28px]">{product.now}</span>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onAddToCart(product.id)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-xs font-medium tracking-[.12em] uppercase cursor-pointer bg-gradient-to-r from-pink to-pink-deep text-primary-foreground shadow-[0_8px_28px_hsla(342,45%,55%,0.35)] hover:shadow-[0_12px_36px_hsla(342,45%,55%,0.5)] hover:scale-[1.04] active:scale-[0.97] transition-all border-none"
            >
              Adicionar ao carrinho 🛍️
            </button>
            <button
              onClick={() => onSaberMais(product.id)}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-xs font-medium tracking-[.12em] uppercase cursor-pointer bg-white/80 text-pink-deep border-2 border-pink hover:bg-pink-light transition-all"
            >
              Saber mais
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">{backButton}</div>
    </section>
  );
};

export default ProductDetail;
