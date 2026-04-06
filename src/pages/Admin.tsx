import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Tables, TablesInsert } from "@/integrations/supabase/types";

type Product = Tables<"products">;
type Campaign = Tables<"campaigns">;
type Setting = Tables<"settings">;

type Tab = "products" | "campaigns" | "settings";

export default function Admin() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("products");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-foreground font-display">Admin</h1>
        <div className="flex gap-2 items-center">
          <span className="text-xs text-muted-foreground hidden sm:inline">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>Loja</Button>
          <Button variant="ghost" size="sm" onClick={signOut}>Sair</Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["products", "campaigns", "settings"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === t
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "products" ? "Produtos" : t === "campaigns" ? "Campanhas" : "Settings"}
          </button>
        ))}
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {tab === "products" && <ProductsAdmin />}
        {tab === "campaigns" && <CampaignsAdmin />}
        {tab === "settings" && <SettingsAdmin />}
      </div>
    </div>
  );
}

/* ─── Products CRUD ─── */
function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState({ emoji: "🧴", name: "", description: "", price: "", category: "skincare" });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (editing) {
      await supabase.from("products").update(form).eq("id", editing.id);
    } else {
      await supabase.from("products").insert(form as TablesInsert<"products">);
    }
    setForm({ emoji: "🧴", name: "", description: "", price: "", category: "skincare" });
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    load();
  };

  const startEdit = (p: Product) => {
    setEditing(p);
    setForm({ emoji: p.emoji, name: p.name, description: p.description || "", price: p.price, category: p.category });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-4 border border-border space-y-3">
        <h2 className="font-semibold text-foreground">{editing ? "Editar Produto" : "Novo Produto"}</h2>
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Emoji" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
          <Input placeholder="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        </div>
        <Input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Textarea placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Input placeholder="Preço (ex: €14.90)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <div className="flex gap-2">
          <Button onClick={save} disabled={!form.name || !form.price}>{editing ? "Guardar" : "Adicionar"}</Button>
          {editing && <Button variant="outline" onClick={() => { setEditing(null); setForm({ emoji: "🧴", name: "", description: "", price: "", category: "skincare" }); }}>Cancelar</Button>}
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-center">A carregar...</p>
      ) : products.length === 0 ? (
        <p className="text-muted-foreground text-center">Sem produtos. Adicione o primeiro!</p>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p.id} className="bg-card rounded-lg p-3 border border-border flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">{p.emoji}</span>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.category} · {p.price}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => startEdit(p)}>✏️</Button>
                <Button variant="ghost" size="sm" onClick={() => remove(p.id)}>🗑️</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Campaigns CRUD ─── */
function CampaignsAdmin() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editing, setEditing] = useState<Campaign | null>(null);
  const [form, setForm] = useState({
    id: "", emoji: "💆", name: "", category: "", description: "",
    benefits: "", price_before: "", price_now: "", badge: "",
    volume: "", usage_info: "", skin_type: "",
  });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("campaigns").select("*").order("created_at", { ascending: false });
    setCampaigns(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const payload = {
      ...form,
      benefits: form.benefits.split("\n").filter(Boolean),
    };
    if (editing) {
      const { id, ...rest } = payload;
      await supabase.from("campaigns").update(rest).eq("id", editing.id);
    } else {
      await supabase.from("campaigns").insert(payload as TablesInsert<"campaigns">);
    }
    resetForm();
    load();
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ id: "", emoji: "💆", name: "", category: "", description: "", benefits: "", price_before: "", price_now: "", badge: "", volume: "", usage_info: "", skin_type: "" });
  };

  const remove = async (id: string) => {
    await supabase.from("campaigns").delete().eq("id", id);
    load();
  };

  const startEdit = (c: Campaign) => {
    setEditing(c);
    setForm({
      id: c.id, emoji: c.emoji, name: c.name, category: c.category,
      description: c.description || "", benefits: (c.benefits || []).join("\n"),
      price_before: c.price_before || "", price_now: c.price_now || "",
      badge: c.badge || "", volume: c.volume || "",
      usage_info: c.usage_info || "", skin_type: c.skin_type || "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-4 border border-border space-y-3">
        <h2 className="font-semibold text-foreground">{editing ? "Editar Campanha" : "Nova Campanha"}</h2>
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="ID (slug)" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} disabled={!!editing} />
          <Input placeholder="Emoji" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} />
        </div>
        <Input placeholder="Nome" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <Input placeholder="Categoria" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
        <Textarea placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <Textarea placeholder="Benefícios (1 por linha)" value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} rows={4} />
        <div className="grid grid-cols-3 gap-3">
          <Input placeholder="Preço antes" value={form.price_before} onChange={(e) => setForm({ ...form, price_before: e.target.value })} />
          <Input placeholder="Preço agora" value={form.price_now} onChange={(e) => setForm({ ...form, price_now: e.target.value })} />
          <Input placeholder="Badge (ex: −31%)" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Input placeholder="Volume" value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} />
          <Input placeholder="Uso" value={form.usage_info} onChange={(e) => setForm({ ...form, usage_info: e.target.value })} />
          <Input placeholder="Tipo de pele" value={form.skin_type} onChange={(e) => setForm({ ...form, skin_type: e.target.value })} />
        </div>
        <div className="flex gap-2">
          <Button onClick={save} disabled={!form.name || !form.id}>{editing ? "Guardar" : "Adicionar"}</Button>
          {editing && <Button variant="outline" onClick={resetForm}>Cancelar</Button>}
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-center">A carregar...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-muted-foreground text-center">Sem campanhas. Adicione a primeira!</p>
      ) : (
        <div className="space-y-2">
          {campaigns.map((c) => (
            <div key={c.id} className="bg-card rounded-lg p-3 border border-border flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl">{c.emoji}</span>
                <div className="min-w-0">
                  <p className="font-medium text-foreground truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.category} · {c.price_now} {c.badge}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => startEdit(c)}>✏️</Button>
                <Button variant="ghost" size="sm" onClick={() => remove(c.id)}>🗑️</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Settings ─── */
function SettingsAdmin() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [form, setForm] = useState({ key: "", value: "" });
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("settings").select("*").order("key");
    setSettings(data || []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    const existing = settings.find((s) => s.key === form.key);
    if (existing) {
      await supabase.from("settings").update({ value: form.value }).eq("id", existing.id);
    } else {
      await supabase.from("settings").insert({ key: form.key, value: form.value });
    }
    setForm({ key: "", value: "" });
    load();
  };

  const remove = async (id: string) => {
    await supabase.from("settings").delete().eq("id", id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-xl p-4 border border-border space-y-3">
        <h2 className="font-semibold text-foreground">Nova Configuração</h2>
        <Input placeholder="Chave (ex: store_name)" value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} />
        <Textarea placeholder="Valor" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
        <Button onClick={save} disabled={!form.key}>Guardar</Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-center">A carregar...</p>
      ) : settings.length === 0 ? (
        <p className="text-muted-foreground text-center">Sem configurações.</p>
      ) : (
        <div className="space-y-2">
          {settings.map((s) => (
            <div key={s.id} className="bg-card rounded-lg p-3 border border-border flex items-center justify-between">
              <div className="min-w-0">
                <p className="font-medium text-foreground text-sm">{s.key}</p>
                <p className="text-xs text-muted-foreground truncate">{s.value}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button variant="ghost" size="sm" onClick={() => setForm({ key: s.key, value: s.value || "" })}>✏️</Button>
                <Button variant="ghost" size="sm" onClick={() => remove(s.id)}>🗑️</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
