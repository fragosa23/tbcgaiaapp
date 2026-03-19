import { useState, useCallback } from "react";
import BannerHeader from "@/components/BannerHeader";
import HeroSection from "@/components/HeroSection";
import CampaignsSection from "@/components/CampaignsSection";
import ProductsSection from "@/components/ProductsSection";
import AssistantSection from "@/components/AssistantSection";
import ContactSection from "@/components/ContactSection";
import ProductDetail from "@/components/ProductDetail";
import FloatingButtons from "@/components/FloatingButtons";
import SiteFooter from "@/components/SiteFooter";
import { campaigns } from "@/data/products";

interface CartItem {
  id: string;
  name: string;
  emoji: string;
  price: string;
  qty: number;
}

const Index = () => {
  const [section, setSection] = useState("home");
  const [prevSection, setPrevSection] = useState("home");
  const [productId, setProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProductId, setLastAddedProductId] = useState<string | null>(null);
  const [addVersion, setAddVersion] = useState(0);

  const navigate = useCallback((id: string) => {
    setPrevSection(section);
    setSection(id);
  }, [section]);

  const openProduct = useCallback((id: string) => {
    setPrevSection(section);
    setProductId(id);
    setSection("product-detail");
  }, [section]);

  const goBack = useCallback(() => {
    setSection(prevSection === "product-detail" ? "home" : prevSection);
  }, [prevSection]);

  const addToCart = useCallback((id: string) => {
    const p = campaigns.find((c) => c.id === id);
    if (!p) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
      }
      return [...prev, { id: p.id, name: p.name, emoji: p.emoji, price: p.now, qty: 1 }];
    });
    setLastAddedProductId(id);
    setAddVersion((v) => v + 1);
    // Auto-navigate to assistant
    setPrevSection(section);
    setSection("assistant");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }, [section]);

  const changeQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden">
      <BannerHeader onNavigate={navigate} />

      <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: "touch" }}>
        {section === "home" && <HeroSection onNavigate={navigate} onOpenProduct={openProduct} />}
        {section === "campaigns" && <CampaignsSection onOpenProduct={openProduct} />}
        {section === "products" && <ProductsSection />}
        {section === "assistant" && (
          <AssistantSection cart={cart} onChangeQty={changeQty} onRemoveFromCart={removeFromCart} />
        )}
        {section === "contact" && <ContactSection />}
        {section === "product-detail" && productId && (
          <ProductDetail
            productId={productId}
            onBack={goBack}
            onNavigate={navigate}
            onAddToCart={addToCart}
          />
        )}
        <SiteFooter />
      </div>

      <FloatingButtons onAssistantClick={() => navigate("assistant")} cartCount={cartCount} />

      {/* Cart toast */}
      <div
        className={`fixed bottom-24 left-6 bg-gradient-to-br from-pink to-pink-deep text-primary-foreground text-[13px] font-medium px-[18px] py-2.5 rounded-full shadow-[0_6px_24px_hsla(342,45%,55%,0.4)] z-[997] whitespace-nowrap transition-all duration-300 pointer-events-none ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2.5"
        }`}
      >
        ✓ Adicionado ao carrinho!
      </div>
    </div>
  );
};

export default Index;
