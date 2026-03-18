import { useState } from "react";
import bannerImg from "@/assets/banner.jpg";

interface BannerHeaderProps {
  onNavigate: (section: string) => void;
}

const navItems = [
  { label: "Início", section: "home" },
  { label: "Campanhas", section: "campaigns" },
  { label: "Produtos", section: "products" },
  { label: "Assistente", section: "assistant" },
  { label: "Contacto", section: "contact" },
];

const BannerHeader = ({ onNavigate }: BannerHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex-shrink-0 sticky top-0 z-[101] w-full overflow-visible bg-pink">
      <img
        src={bannerImg}
        alt="The Beauty Corner Gaia"
        className="w-full h-auto max-h-[160px] object-cover object-left block md:max-h-[160px] max-md:max-h-[110px] max-sm:max-h-[90px]"
      />
      {/* Clickable logo zone */}
      <div
        className="absolute top-0 left-0 w-[35%] h-full cursor-pointer z-10 group max-md:w-[45%]"
        onClick={() => onNavigate("home")}
      >
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-pink-deep/85 text-primary-foreground text-[11px] font-medium tracking-wider px-3 py-1 rounded-full whitespace-nowrap font-body opacity-0 group-hover:opacity-100 transition-opacity">
          🏠 Início
        </span>
      </div>
      {/* Hamburger */}
      <button
        className="absolute top-1/2 right-5 -translate-y-1/2 z-20 bg-white/25 backdrop-blur-sm border border-white/40 rounded-xl p-2.5 cursor-pointer flex flex-col gap-[5px] hover:bg-white/45 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        <span className="block w-[22px] h-[2px] bg-foreground rounded-full" />
        <span className="block w-[22px] h-[2px] bg-foreground rounded-full" />
        <span className="block w-[22px] h-[2px] bg-foreground rounded-full" />
      </button>
      {/* Dropdown nav */}
      {menuOpen && (
        <div
          className="absolute top-[calc(100%+4px)] right-4 bg-cream/97 backdrop-blur-xl rounded-2xl border border-border shadow-elevated p-2.5 flex flex-col gap-0.5 z-[200] min-w-[200px]"
          onClick={(e) => e.stopPropagation()}
        >
          {navItems.map((item) => (
            <button
              key={item.section}
              className="text-[13px] font-medium tracking-wider uppercase text-mid text-left px-4 py-3 rounded-[10px] hover:bg-pink-light hover:text-pink-deep transition-colors"
              onClick={() => {
                onNavigate(item.section);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerHeader;
