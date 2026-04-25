import { useState } from "react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { brandingDefaults } from "../features/branding/mockData";
import { useAppStore } from "../store/appStore";

export function BrandingPage() {
  const { setCompanyName } = useAppStore();
  const [name, setName] = useState(brandingDefaults.companyName);
  const [tone, setTone] = useState(brandingDefaults.voiceTone);
  const [color, setColor] = useState(brandingDefaults.primaryColor);

  function applyBranding() {
    setCompanyName(name);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Branding</h2>
      <Card title="Configuracao de identidade">
        <div className="space-y-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Nome da empresa"
          />
          <input
            value={tone}
            onChange={(event) => setTone(event.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Tom de voz"
          />
          <input
            value={color}
            onChange={(event) => setColor(event.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Cor primaria"
          />
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">Preview:</span>
            <span className="h-6 w-6 rounded-full border border-slate-700" style={{ background: color }} />
          </div>
          <p className="text-sm text-slate-400">
            Contexto para agentes IA: use tom "{tone}" e identidade visual alinhada.
          </p>
          <Button onClick={applyBranding}>Salvar branding</Button>
        </div>
      </Card>
    </div>
  );
}
