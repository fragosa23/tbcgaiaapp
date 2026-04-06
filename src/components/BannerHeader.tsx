import { useState } from "react";
import logoImg from "@/assets/logo-bc.png";

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
    <div className="relative flex-shrink-0 sticky top-0 z-[101] w-full overflow-visible bg-transparent">
      <div className="flex items-center justify-between h-[70px] max-md:h-[56px] px-4">
        {/* Logo button */}
        <button
          className="relative group h-[44px] max-md:h-[36px] cursor-pointer bg-transparent border-none p-0"
          onClick={() => onNavigate("home")}
        >
          <img
            src={logoImg}
            alt="The Beauty Corner"
            className="h-full w-auto object-contain"
          />
          <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-pink-deep/85 text-primary-foreground text-[11px] font-medium tracking-wider px-3 py-1 rounded-full whitespace-nowrap font-body opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            Início
          </span>
        </button>

        {/* Center title */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none select-none">
          <span className="font-display text-[15px] max-md:text-[12px] tracking-[0.15em] uppercase leading-tight block" style={{ color: '#ffffff', textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            TheBeautyCorner
          </span>
          <span className="font-body text-[9px] max-md:text-[8px] tracking-[0.3em] uppercase block mt-0.5" style={{ color: 'rgba(255,255,255,0.7)', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
            GAIA — APP
          </span>
        </div>

        {/* Hamburger */}
        <button
          className="z-20 bg-background/25 backdrop-blur-sm border border-background/40 rounded-xl p-2.5 cursor-pointer flex flex-col gap-[5px] hover:bg-background/45 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <span className="block w-[22px] h-[2px] bg-white rounded-full" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
          <span className="block w-[22px] h-[2px] bg-white rounded-full" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
          <span className="block w-[22px] h-[2px] bg-white rounded-full" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />
        </button>
      </div>

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
