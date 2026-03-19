import { useState, useRef, useEffect, useCallback } from "react";
import { getChatResponse, campaigns } from "@/data/products";

interface CartItem {
  id: string;
  name: string;
  emoji: string;
  price: string;
  qty: number;
}

interface AssistantSectionProps {
  cart: CartItem[];
  onChangeQty: (id: string, delta: number) => void;
  onRemoveFromCart: (id: string) => void;
  lastAddedProductId: string | null;
  addVersion: number;
}

interface Message {
  id: number;
  content: string;
  role: "bot" | "user";
  type?: "text" | "cart-summary" | "wa-prompt";
}

const suggestions = [
  { emoji: "💧", text: "Tenho pele seca, o que recomenda?", label: "Tenho pele seca" },
  { emoji: "✨", text: "Pele oleosa, que produtos usar?", label: "Pele oleosa" },
  { emoji: "💄", text: "Qual a melhor base de longa duração?", label: "Base de longa duração" },
  { emoji: "👁️", text: "Tenho olheiras, o que usar?", label: "Olheiras" },
  { emoji: "🌺", text: "Pode recomendar um perfume?", label: "Recomendar perfume" },
  { emoji: "🌊", text: "Produtos para cabelo danificado?", label: "Cabelo danificado" },
];

let msgCounter = 1;

const AssistantSection = ({ cart, onChangeQty, onRemoveFromCart, lastAddedProductId, addVersion }: AssistantSectionProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, content: 'Olá! Sou a <strong>Gaia</strong>, a sua consultora de beleza virtual. 💄<br/>Como posso ajudá-la hoje?', role: "bot", type: "text" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [waOpened, setWaOpened] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const prevAddVersion = useRef(0);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages, typing]);

  // React to product being added
  useEffect(() => {
    if (addVersion > 0 && addVersion !== prevAddVersion.current && lastAddedProductId) {
      prevAddVersion.current = addVersion;
      const product = campaigns.find((c) => c.id === lastAddedProductId);
      if (!product) return;

      const addMsg: Message = {
        id: msgCounter++,
        content: `${product.emoji} <strong>${product.name}</strong> adicionado ao seu carrinho! — ${product.now}`,
        role: "bot",
        type: "text",
      };

      setMessages((prev) => {
        // Remove old cart-summary and wa-prompt
        const filtered = prev.filter((m) => m.type !== "cart-summary" && m.type !== "wa-prompt");
        return [
          ...filtered,
          addMsg,
          { id: msgCounter++, content: "", role: "bot", type: "cart-summary" },
          { id: msgCounter++, content: "", role: "bot", type: "wa-prompt" },
        ];
      });
      setWaOpened(false);
    }
  }, [addVersion, lastAddedProductId]);

  // Update cart-summary messages when cart changes (qty changes / removals)
  useEffect(() => {
    setMessages((prev) => {
      const hasCartSummary = prev.some((m) => m.type === "cart-summary");
      if (!hasCartSummary) return prev;
      if (cart.length === 0) {
        // Remove cart-summary and wa-prompt if cart is empty
        return prev.filter((m) => m.type !== "cart-summary" && m.type !== "wa-prompt");
      }
      return prev; // cart-summary reads from cart prop directly
    });
  }, [cart]);

  const sendMessage = useCallback((text?: string) => {
    const t = (text || input).trim();
    if (!t) return;
    setMessages((prev) => [...prev, { id: msgCounter++, content: t, role: "user", type: "text" }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: msgCounter++, content: getChatResponse(t), role: "bot", type: "text" }]);
    }, 800 + Math.random() * 700);
  }, [input]);

  const sendCartToWhatsApp = useCallback(() => {
    if (cart.length === 0) return;
    let msg = "Olá! Gostaria de saber mais informações sobre os seguintes produtos:%0A%0A";
    cart.forEach((item) => {
      msg += `• ${item.name} (x${item.qty}) — ${item.price}%0A`;
    });
    msg += "%0AObrigada! 💖";
    window.open(`https://wa.me/351910000000?text=${msg}`, "_blank");
    setWaOpened(true);

    // Add confirmation message
    setMessages((prev) => [
      ...prev.filter((m) => m.type !== "wa-prompt"),
      {
        id: msgCounter++,
        content: "A sua mensagem foi enviada via WhatsApp! 💬✅<br/><br/>A nossa equipa irá contactá-la em breve para confirmar a sua encomenda. Obrigada pela preferência! 💖",
        role: "bot",
        type: "text",
      },
    ]);
  }, [cart]);

  const renderMessage = (msg: Message) => {
    if (msg.type === "cart-summary") {
      if (cart.length === 0) return null;
      return (
        <div key={msg.id} className="flex gap-2.5">
          <div className="w-[30px] h-[30px] rounded-full flex-shrink-0 bg-gradient-to-br from-pink-light to-pink flex items-center justify-center text-[13px]">
            🛍️
          </div>
          <div className="max-w-[85%] py-3 px-4 rounded-[18px] rounded-bl-[4px] bg-pink-pale text-foreground">
            <p className="text-[12px] font-semibold text-pink-deep mb-2">O seu carrinho:</p>
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-2 py-1.5 border-b border-border/50 last:border-b-0">
                <span className="text-[18px]">{item.emoji}</span>
                <span className="flex-1 text-[12px] font-medium text-foreground leading-tight">{item.name}</span>
                <span className="text-[11px] font-semibold text-pink-deep">{item.price}</span>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => onChangeQty(item.id, -1)}
                    className="w-5 h-5 rounded-md border border-border bg-white text-pink-deep text-[11px] font-bold flex items-center justify-center cursor-pointer hover:bg-pink-light transition-all"
                  >−</button>
                  <span className="w-5 text-center text-[11px] font-semibold">{item.qty}</span>
                  <button
                    onClick={() => onChangeQty(item.id, 1)}
                    className="w-5 h-5 rounded-md border border-border bg-white text-pink-deep text-[11px] font-bold flex items-center justify-center cursor-pointer hover:bg-pink-light transition-all"
                  >+</button>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item.id)}
                  className="w-5 h-5 rounded-md bg-pink-deep/10 text-pink-deep text-[11px] flex items-center justify-center cursor-pointer hover:bg-pink-light transition-all flex-shrink-0"
                >✕</button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (msg.type === "wa-prompt") {
      if (cart.length === 0 || waOpened) return null;
      return (
        <div key={msg.id} className="flex gap-2.5">
          <div className="w-[30px] h-[30px] rounded-full flex-shrink-0 bg-gradient-to-br from-pink-light to-pink flex items-center justify-center text-[13px]">
            🌸
          </div>
          <div className="max-w-[85%] py-3 px-4 rounded-[18px] rounded-bl-[4px] bg-pink-pale text-foreground">
            <p className="text-[13px] leading-relaxed mb-3">
              Deseja enviar o seu pedido para a loja via <strong>WhatsApp</strong> para pedir orçamento ou encomendar? 💬
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={sendCartToWhatsApp}
                className="px-4 py-2 rounded-full font-body text-[11px] font-medium tracking-wider uppercase bg-gradient-to-r from-pink to-pink-deep text-primary-foreground shadow-sm border-none cursor-pointer hover:scale-[1.04] transition-all"
              >
                Sim, enviar via WhatsApp
              </button>
              <button
                onClick={() => setWaOpened(true)}
                className="px-4 py-2 rounded-full font-body text-[11px] font-medium tracking-wider uppercase bg-white/80 text-pink-deep border border-pink cursor-pointer hover:bg-pink-light transition-all"
              >
                Agora não
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Regular text message
    return (
      <div key={msg.id} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
        {msg.role === "bot" && (
          <div className="w-[30px] h-[30px] rounded-full flex-shrink-0 bg-gradient-to-br from-pink-light to-pink flex items-center justify-center text-[13px]">
            🌸
          </div>
        )}
        <div
          className={`max-w-[78%] py-[11px] px-[15px] rounded-[18px] text-[13px] leading-relaxed ${
            msg.role === "bot"
              ? "bg-pink-pale text-foreground rounded-bl-[4px]"
              : "bg-gradient-to-br from-pink to-pink-deep text-primary-foreground rounded-br-[4px]"
          }`}
          dangerouslySetInnerHTML={{ __html: msg.content }}
        />
        {msg.role === "user" && (
          <div className="w-[30px] h-[30px] rounded-full flex-shrink-0 bg-gradient-to-br from-pink to-pink-deep flex items-center justify-center text-[13px]">
            👤
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="px-9 py-[52px] pb-[72px] max-w-[1120px] mx-auto max-md:px-[18px] max-md:py-8 max-md:pb-[52px]">
      <span className="inline-flex items-center gap-2 text-[11px] tracking-[.18em] uppercase text-pink-deep font-medium mb-3 before:block before:w-6 before:h-px before:bg-pink">
        Disponível 24/7
      </span>
      <h2 className="font-display text-[clamp(30px,5vw,50px)] font-light text-foreground leading-[1.1] mb-1.5">
        Assistente<br /><em className="italic text-pink-deep">de Beleza</em>
      </h2>
      <div className="w-11 h-0.5 bg-gradient-to-r from-pink to-transparent rounded-full mt-4 mb-10" />

      <div className="grid grid-cols-[1fr_300px] gap-6 items-start max-[900px]:grid-cols-1">
        {/* Chat */}
        <div className="bg-white/85 backdrop-blur-[14px] rounded-lg border border-border overflow-hidden shadow-elevated flex flex-col h-[520px]">
          <div className="p-[18px_22px] bg-gradient-to-br from-pink-light/90 to-rose/90 border-b border-border flex items-center gap-3.5 flex-shrink-0">
            <div className="w-[46px] h-[46px] rounded-full flex-shrink-0 bg-gradient-to-br from-pink to-pink-deep flex items-center justify-center text-xl">
              ✨
            </div>
            <div>
              <h3 className="font-display text-[19px] font-semibold text-foreground">Gaia — Consultora Virtual</h3>
              <p className="text-[11px] text-pink-deep tracking-wider">
                <span className="inline-block w-[7px] h-[7px] bg-[#4cca82] rounded-full mr-1.5 animate-pulse-dot" />
                Online agora
              </p>
            </div>
          </div>
          <div ref={messagesRef} className="flex-1 overflow-y-auto p-[18px] flex flex-col gap-3">
            {messages.map((msg) => renderMessage(msg))}
            {typing && (
              <div className="flex gap-2.5">
                <div className="w-[30px] h-[30px] rounded-full flex-shrink-0 bg-gradient-to-br from-pink-light to-pink flex items-center justify-center text-[13px]">
                  🌸
                </div>
                <div className="bg-pink-pale py-[11px] px-[15px] rounded-[18px] rounded-bl-[4px]">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((j) => (
                      <span
                        key={j}
                        className="inline-block w-1.5 h-1.5 bg-pink rounded-full"
                        style={{ animation: `typing 0.9s ease-in-out infinite`, animationDelay: `${j * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-[12px_14px] border-t border-border flex gap-2.5 bg-white/60 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Escreva uma mensagem..."
              className="flex-1 py-[11px] px-4 rounded-full border-2 border-border bg-pink-pale font-body text-[13px] text-foreground outline-none focus:border-pink transition-colors"
            />
            <button
              onClick={() => sendMessage()}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-pink to-pink-deep border-none cursor-pointer flex items-center justify-center flex-shrink-0 shadow-[0_4px_16px_hsla(342,45%,55%,0.35)] hover:scale-110 transition-transform"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Suggestion bubbles */}
        <div className="flex flex-col gap-2.5 max-[900px]:flex-row max-[900px]:flex-wrap">
          <h4 className="font-display text-[17px] font-semibold text-foreground mb-1">Sugestões Rápidas</h4>
          <p className="text-xs text-mid font-light mb-3 leading-relaxed">
            Carregue e a Gaia responde de imediato ✨
          </p>
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => sendMessage(s.text)}
              className="block w-full py-[13px] px-[18px] rounded-full border-[1.5px] border-border bg-white/80 text-pink-deep font-body text-[13px] text-left cursor-pointer shadow-card hover:bg-pink-light hover:border-pink hover:shadow-elevated hover:-translate-y-[3px] hover:scale-[1.02] transition-all animate-float max-[900px]:w-auto max-[900px]:flex-shrink-0 max-[900px]:text-xs max-[900px]:px-3.5 max-[900px]:py-2.5"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {s.emoji} {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssistantSection;
