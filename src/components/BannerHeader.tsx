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
    <div className="relative flex-shrink-0 sticky top-0 z-[101] w-full overflow-visible" style={{ background: 'linear-gradient(135deg, hsl(340 33% 96%), hsl(340 50% 92%), hsl(340 33% 96%))' }}>
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

        {/* Hamburger */}
        <button
          className="z-20 bg-background/25 backdrop-blur-sm border border-background/40 rounded-xl p-2.5 cursor-pointer flex flex-col gap-[5px] hover:bg-background/45 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
        >
          <span className="block w-[22px] h-[2px] bg-foreground rounded-full" />
          <span className="block w-[22px] h-[2px] bg-foreground rounded-full" />
          <span className="block w-[22px] h-[2px] bg-foreground rounded-full" />
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
