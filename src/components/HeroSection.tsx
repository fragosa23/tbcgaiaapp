import { campaigns } from "@/data/products";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  onOpenProduct: (id: string) => void;
}

const HeroSection = ({ onNavigate, onOpenProduct }: HeroSectionProps) => {
  return (
    <section className="flex flex-col items-center justify-center text-center px-7 pt-[52px] min-h-[calc(100vh-212px)]">
      <h1 className="font-display text-[clamp(38px,7vw,78px)] font-light text-foreground leading-[1.0] mb-5 animate-fade-up-delay-1">
        A Sua Beleza,<br />
        o Nosso <em className="italic text-pink-deep">Cuidado</em>
      </h1>
      <p className="text-[15px] text-mid font-light max-w-[480px] mb-10 tracking-wider leading-[1.7] animate-fade-up-delay-2">
        Descubra a nossa seleção exclusiva de produtos de beleza, skincare e maquilhagem — pensados para realçar a sua beleza natural.
      </p>
      <div className="flex gap-3 mb-8 animate-fade-up-delay-2">
        <button
          onClick={() => onNavigate("campaigns")}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-xs font-medium tracking-[.12em] uppercase cursor-pointer bg-gradient-to-r from-pink to-pink-deep text-primary-foreground shadow-[0_8px_28px_hsla(342,45%,55%,0.35)] hover:shadow-[0_12px_36px_hsla(342,45%,55%,0.5)] hover:scale-[1.04] active:scale-[0.97] transition-all border-none"
        >
          Ver Campanhas
        </button>
        <button
          onClick={() => onNavigate("products")}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-xs font-medium tracking-[.12em] uppercase cursor-pointer bg-white/80 text-pink-deep border-2 border-pink hover:bg-pink-light hover:scale-[1.04] active:scale-[0.97] transition-all"
        >
          Explorar Produtos
        </button>
      </div>

      {/* Conveyor */}
      <div className="w-screen overflow-hidden py-6 pb-[52px] cursor-grab select-none">
        <div className="flex gap-[18px] w-max animate-conveyor">
          {[...campaigns, ...campaigns].map((p, i) => (
            <div
              key={`${p.id}-${i}`}
              className="flex-shrink-0 w-[195px] bg-white/82 backdrop-blur-[10px] rounded-2xl overflow-hidden border border-border shadow-card hover:-translate-y-1.5 hover:shadow-hover transition-all cursor-pointer max-md:w-[160px]"
              onClick={() => onOpenProduct(p.id)}
            >
              <div className="w-full aspect-square bg-gradient-to-br from-pink-light to-rose flex items-center justify-center text-[50px] relative">
                {p.emoji}
                <span className="absolute top-2 left-2 bg-gradient-to-br from-pink to-pink-deep text-primary-foreground text-[9px] font-bold tracking-wider uppercase px-2.5 py-[3px] rounded-full">
                  {p.badge}
                </span>
              </div>
              <div className="p-[11px_13px_15px]">
                <div className="font-display text-[15px] font-semibold text-foreground mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {p.name}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-mid/60 line-through">{p.before}</span>
                  <span className="text-[17px] font-semibold text-pink-deep">{p.now}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
