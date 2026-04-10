import { useState } from "react";

const ContactSection = () => {
  const [sent, setSent] = useState(false);

  return (
    <section className="px-9 py-[52px] pb-[72px] max-w-[1120px] mx-auto max-md:px-[18px] max-md:py-8 max-md:pb-[52px]">
      <span className="inline-flex items-center gap-2 text-[11px] tracking-[.18em] uppercase text-pink-deep font-medium mb-3 before:block before:w-6 before:h-px before:bg-pink">
        Estamos Aqui
      </span>
      <h2 className="font-display text-[clamp(30px,5vw,50px)] font-light text-foreground leading-[1.1] mb-1.5">
        Entre em<br /><em className="italic text-pink-deep">Contacto</em>
      </h2>
      <div className="w-11 h-0.5 bg-gradient-to-r from-pink to-transparent rounded-full mt-4 mb-10" />

      <div className="grid grid-cols-2 gap-4 mb-7 max-md:grid-cols-1">
        {[
          { icon: "📞", label: "Telefone", value: "+351 910 000 000", href: "tel:+351910000000" },
          { icon: "📧", label: "Email", value: "geral@beautycorner.pt", href: "mailto:geral@beautycorner.pt" },
          { icon: "📍", label: "Localização", value: "Vila Nova de Gaia, Portugal" },
          { icon: "🕐", label: "Horário", value: "Seg–Sex: 9h–19h | Sáb: 10h–17h" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white backdrop-blur-[10px] rounded-lg p-6 px-5 border border-border shadow-card flex items-start gap-3.5 hover:-translate-y-1 transition-transform"
          >
            <div className="w-[46px] h-[46px] rounded-[14px] flex-shrink-0 bg-gradient-to-br from-pink-light to-rose flex items-center justify-center text-xl">
              {item.icon}
            </div>
            <div>
              <h4 className="text-[11px] font-medium tracking-[.09em] uppercase text-pink-deep mb-1">{item.label}</h4>
              {item.href ? (
                <a href={item.href} className="text-sm text-foreground no-underline hover:text-pink-deep transition-colors">
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-foreground">{item.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg p-8 border border-border shadow-elevated mt-6 max-md:p-[22px]">
        <h3 className="font-display text-[26px] font-normal text-foreground mb-6">Envie-nos uma mensagem</h3>
        <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-md:grid-cols-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-[.08em] uppercase text-mid">Nome</label>
            <input
              type="text"
              placeholder="O seu nome"
              className="py-3 px-[15px] rounded-xl border-2 border-border bg-pink-pale/80 font-body text-sm text-foreground outline-none focus:border-pink focus:bg-white transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium tracking-[.08em] uppercase text-mid">Email</label>
            <input
              type="email"
              placeholder="o.seu@email.com"
              className="py-3 px-[15px] rounded-xl border-2 border-border bg-pink-pale/80 font-body text-sm text-foreground outline-none focus:border-pink focus:bg-white transition-colors"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 mb-[18px]">
          <label className="text-[11px] font-medium tracking-[.08em] uppercase text-mid">Mensagem</label>
          <textarea
            placeholder="Como podemos ajudá-la?"
            className="py-3 px-[15px] rounded-xl border-2 border-border bg-pink-pale/80 font-body text-sm text-foreground outline-none focus:border-pink focus:bg-white transition-colors resize-none min-h-[95px]"
          />
        </div>
        <button
          onClick={() => setSent(true)}
          className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-body text-xs font-medium tracking-[.12em] uppercase cursor-pointer border-none transition-all ${
            sent
              ? "bg-[#4cca82] text-primary-foreground"
              : "bg-gradient-to-r from-pink to-pink-deep text-primary-foreground shadow-[0_8px_28px_hsla(342,45%,55%,0.35)] hover:shadow-[0_12px_36px_hsla(342,45%,55%,0.5)] hover:scale-[1.04] active:scale-[0.97]"
          }`}
        >
          {sent ? "Enviado! ✓" : "Enviar Mensagem →"}
        </button>
      </div>
    </section>
  );
};

export default ContactSection;
