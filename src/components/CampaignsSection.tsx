import { campaigns } from "@/data/products";

interface CampaignsSectionProps {
  onOpenProduct: (id: string) => void;
}

const CampaignsSection = ({ onOpenProduct }: CampaignsSectionProps) => {
  return (
    <section className="px-9 py-[52px] pb-[72px] max-w-[1120px] mx-auto max-md:px-[18px] max-md:py-8 max-md:pb-[52px]">
      <span className="inline-flex items-center gap-2 text-[11px] tracking-[.18em] uppercase text-pink-deep font-medium mb-3 before:block before:w-6 before:h-px before:bg-pink">
        Promoções Exclusivas
      </span>
      <h2 className="font-display text-[clamp(30px,5vw,50px)] font-light text-foreground leading-[1.1] mb-1.5">
        Campanhas<br /><em className="italic text-pink-deep">do Mês</em>
      </h2>
      <div className="w-11 h-0.5 bg-gradient-to-r from-pink to-transparent rounded-full mt-4 mb-10" />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5 max-md:grid-cols-[repeat(auto-fill,minmax(155px,1fr))] max-md:gap-3.5 max-sm:grid-cols-2">
        {campaigns.map((p, i) => (
          <div
            key={p.id}
            className="bg-white/82 backdrop-blur-[10px] rounded-lg overflow-hidden border border-border shadow-card hover:-translate-y-2 hover:shadow-hover transition-all cursor-pointer"
            style={{ animationDelay: `${i * 0.07}s` }}
            onClick={() => onOpenProduct(p.id)}
          >
            <div className="w-full aspect-square bg-gradient-to-br from-pink-light via-rose to-pink-light flex items-center justify-center text-[64px] relative overflow-hidden">
              {p.emoji}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_25%,rgba(255,255,255,0.4),transparent_60%)]" />
              <span className="absolute top-3 left-3 z-[1] bg-gradient-to-br from-pink to-pink-deep text-primary-foreground text-[10px] font-semibold tracking-wider uppercase px-[11px] py-1 rounded-full">
                {p.badge}
              </span>
            </div>
            <div className="p-[18px_20px_20px]">
              <div className="font-display text-lg font-semibold text-foreground mb-1">{p.name}</div>
              <div className="text-xs text-mid font-light mb-3.5 leading-relaxed">{p.desc}</div>
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="text-xs text-mid/60 line-through">{p.before}</span>
                <span className="text-xl font-semibold text-pink-deep">{p.now}</span>
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

export default CampaignsSection;
