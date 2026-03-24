export interface Campaign {
  id: string;
  emoji: string;
  name: string;
  cat: string;
  desc: string;
  benefits: string[];
  before: string;
  now: string;
  badge: string;
  volume: string;
  uso: string;
  tipo: string;
}

export interface Product {
  emoji: string;
  name: string;
  desc: string;
  price: string;
  cat: string;
}

export const campaigns: Campaign[] = [
  { id: "serum-vitamina-c", emoji: "💆", name: "Sérum Vitamina C", cat: "Skincare", desc: "O nosso Sérum Vitamina C é a solução perfeita para uma pele radiante e uniforme. Formulado com 15% de vitamina C estabilizada, ácido hialurónico e extrato de rosa mosqueta.", benefits: ["Ilumina e unifica o tom de pele", "Reduz manchas e hiperpigmentação", "Estimula a produção de colagénio", "Hidratação profunda 24h", "Proteção antioxidante"], before: "€42.00", now: "€28.90", badge: "−31%", volume: "30ml", uso: "Manhã e noite", tipo: "Todos os tipos de pele" },
  { id: "batom-matte", emoji: "💋", name: "Batom Matte Veludo", cat: "Maquilhagem", desc: "Este batom matte de longa duração oferece uma cobertura intensa com acabamento aveludado. Fórmula enriquecida com óleo de argão.", benefits: ["12h de duração sem transferência", "Acabamento aveludado e confortável", "Hidratação com óleo de argão", "Cores intensas e vibrantes", "Fórmula não ressecante"], before: "€24.00", now: "€16.50", badge: "−31%", volume: "3.5g", uso: "Aplicar nos lábios", tipo: "Todos os tipos de lábios" },
  { id: "creme-hidratante", emoji: "🌿", name: "Creme Hidratante Bio", cat: "Hidratação", desc: "Formulado com ingredientes 100% naturais e certificados bio, combina aloe vera orgânico com óleo de argão marroquino.", benefits: ["Fórmula 100% natural e bio", "Hidratação intensa por 48h", "Acalma pele sensível e irritada", "Não comedogénico", "Sem parabenos, sulfatos ou corantes"], before: "€35.00", now: "€22.00", badge: "−37%", volume: "50ml", uso: "Manhã e noite no rosto limpo", tipo: "Pele seca e sensível" },
  { id: "mascara-cilios", emoji: "✨", name: "Máscara Cílios Volume", cat: "Maquilhagem", desc: "Máscara de cílios com escova de volume máximo. Fórmula com vitamina E nutre os cílios enquanto os alonga e volumiza.", benefits: ["Efeito mega volume imediato", "Resistente à água e ao calor", "Nutre cílios com vitamina E", "Escova de cerdas duplas", "Fácil remoção com água micelar"], before: "€19.00", now: "€13.90", badge: "−26%", volume: "10ml", uso: "Aplicar nos cílios", tipo: "Todas as maquilhagens" },
  { id: "blush-rosado", emoji: "🌸", name: "Blush Rosado Natural", cat: "Maquilhagem", desc: "Blush de cor suave e natural para um rubor fresco e saudável. Fórmula micropigmentada funde-se com todos os tons de pele.", benefits: ["Cor natural e luminosa", "Longa duração até 10h", "Funde com todos os tons de pele", "Textura sedosa e suave", "Acabamento natural"], before: "€18.00", now: "€12.50", badge: "−31%", volume: "8g", uso: "Aplicar nas maçãs do rosto", tipo: "Todos os tons de pele" },
  { id: "esfoliante-corpo", emoji: "🧴", name: "Esfoliante Corpo Rosa", cat: "Hidratação", desc: "Esfoliante corporal com extrato de pétalas de rosa e açúcar de cana. Remove células mortas de forma suave.", benefits: ["Remove células mortas eficazmente", "Pele suave e luminosa após uso", "Nutre com óleo de rosa mosqueta", "Aroma floral relaxante", "Adequado para uso semanal"], before: "€28.00", now: "€19.90", badge: "−29%", volume: "200ml", uso: "2-3x por semana no duche", tipo: "Todos os tipos de pele" },
  { id: "bruma-fixadora", emoji: "🌺", name: "Bruma Fixadora SPF", cat: "Skincare", desc: "Bruma fixadora multifunções que fixa a maquilhagem, hidrata e protege do sol. Com SPF 30 e ácido hialurónico.", benefits: ["Fixa a maquilhagem por mais tempo", "Proteção solar SPF 30", "Hidratação instantânea", "Acabamento fresco e luminoso", "Extrato de chá verde antioxidante"], before: "€32.00", now: "€21.00", badge: "−34%", volume: "100ml", uso: "Após maquilhagem ou no rosto limpo", tipo: "Todos os tipos de pele" },
  { id: "verniz-gel", emoji: "💅", name: "Verniz Gel Nude", cat: "Maquilhagem", desc: "Acabamento profissional de salão em casa. Fórmula avançada com brilho intenso e durabilidade até 2 semanas.", benefits: ["Duração até 2 semanas sem lascar", "Brilho intenso como em salão", "Tom nude versátil e atemporal", "Fórmula endurecedora", "Aplicação fácil e uniforme"], before: "€14.00", now: "€9.90", badge: "−29%", volume: "12ml", uso: "Aplicar sobre base protetora", tipo: "Todos os tipos de unhas" },
];

export const allProducts: Product[] = [
  { emoji: "🧴", name: "Tónico Micelar", desc: "Limpeza suave para todos os tipos de pele", price: "€14.90", cat: "skincare" },
  { emoji: "💆", name: "Óleo Rosto Rosehip", desc: "Anti-envelhecimento e regenerador", price: "€31.50", cat: "skincare" },
  { emoji: "🌸", name: "Base SPF 30", desc: "Cobertura média de longa duração", price: "€28.00", cat: "maquilhagem" },
  { emoji: "🌊", name: "Shampoo Reparador", desc: "Com queratina e proteínas de seda", price: "€18.90", cat: "cabelo" },
  { emoji: "🌺", name: "Eau de Parfum Rose", desc: "Fragrância floral e amadeirada 50ml", price: "€62.00", cat: "perfumaria" },
  { emoji: "🧖", name: "Máscara Hidratante", desc: "Hidratação intensa em 10 minutos", price: "€11.90", cat: "hidratacao" },
  { emoji: "💅", name: "Base Unhas Fortalecedora", desc: "Previne quebra e esfoliação", price: "€9.90", cat: "maquilhagem" },
  { emoji: "🌿", name: "Contorno Olhos Cooling", desc: "Desincha e ilumina instantaneamente", price: "€24.50", cat: "skincare" },
  { emoji: "🫧", name: "Sérum Poros", desc: "Minimiza poros e controla brilho", price: "€29.90", cat: "skincare" },
  { emoji: "💄", name: "Gloss Espelho", desc: "Brilho intenso e hidratação", price: "€16.50", cat: "maquilhagem" },
  { emoji: "🌷", name: "Eau de Toilette Floral", desc: "Leveza e frescura para o dia a dia", price: "€44.00", cat: "perfumaria" },
  { emoji: "🧴", name: "Condicionador Nutritivo", desc: "Nutrição profunda para cabelo seco", price: "€15.90", cat: "cabelo" },
];

export const chatResponses: Record<string, string> = {
  seca: "Recomendo o <strong>Creme Hidratante Bio</strong> com aloe vera e argão — perfeito para pele seca! 🌿",
  oleosa: "O <strong>Tónico Micelar</strong> e o <strong>Sérum Poros</strong> controlam o brilho sem ressecar. ✨",
  base: "A nossa <strong>Base SPF 30</strong> tem cobertura média de longa duração. 💄",
  olheiras: "O <strong>Contorno Olhos Cooling</strong> desincha e ilumina instantaneamente. 👁️",
  perfume: "O <strong>Eau de Parfum Rose</strong> é irresistível para um aroma floral e sofisticado. 🌺",
  cabelo: "O <strong>Shampoo Reparador</strong> e o <strong>Condicionador Nutritivo</strong> são a combinação perfeita! 🌊",
  def: "Obrigada! Visite-nos em Vila Nova de Gaia ou contacte pelo WhatsApp. 💖",
};

export function getChatResponse(msg: string): string {
  const m = msg.toLowerCase();

  // Check if asking about a specific product
  const product = campaigns.find((p) => m.includes(p.name.toLowerCase()));
  if (product) {
    const benefitsList = product.benefits.slice(0, 3).map(b => `• ${b}`).join("<br/>");
    return `Claro! 😍 O <strong>${product.name}</strong> é fantástico!<br/><br/>${product.desc}<br/><br/>Alguns destaques:<br/>${benefitsList}<br/><br/>Está a <strong>${product.now}</strong> (antes ${product.before}) ${product.badge} 🎉<br/><br/>Quer saber mais detalhes ou adicionar ao carrinho? 💖`;
  }

  if (m.includes("seca")) return chatResponses.seca;
  if (m.includes("oleosa")) return chatResponses.oleosa;
  if (m.includes("base")) return chatResponses.base;
  if (m.includes("olheira")) return chatResponses.olheiras;
  if (m.includes("perfume")) return chatResponses.perfume;
  if (m.includes("cabelo")) return chatResponses.cabelo;
  return chatResponses.def;
}
