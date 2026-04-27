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
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/5 bg-[rgba(17,19,29,0.95)] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <h2 className="text-2xl font-bold text-white">Branding</h2>
        <p className="mt-2 text-sm text-[#A1A1B5]">
          Defina identidade visual e tom comercial para uma experiencia consistente entre time e IA.
        </p>
      </div>
      <Card title="Configuracao de identidade">
        <div className="space-y-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="h-12 w-full rounded-[14px] border border-white/10 bg-[#0D1018] px-3 py-2 text-sm text-white placeholder:text-[#6B7280] focus:border-violet-400/50 focus:outline-none"
            placeholder="Nome da empresa"
          />
          <input
            value={tone}
            onChange={(event) => setTone(event.target.value)}
            className="h-12 w-full rounded-[14px] border border-white/10 bg-[#0D1018] px-3 py-2 text-sm text-white placeholder:text-[#6B7280] focus:border-violet-400/50 focus:outline-none"
            placeholder="Tom de voz"
          />
          <input
            value={color}
            onChange={(event) => setColor(event.target.value)}
            className="h-12 w-full rounded-[14px] border border-white/10 bg-[#0D1018] px-3 py-2 text-sm text-white placeholder:text-[#6B7280] focus:border-violet-400/50 focus:outline-none"
            placeholder="Cor primaria"
          />
          <div className="flex items-center gap-3">
            <span className="text-sm text-[#A1A1B5]">Preview:</span>
            <span className="h-6 w-6 rounded-full border border-white/10" style={{ background: color }} />
          </div>
          <p className="text-sm text-[#A1A1B5]">
            Contexto para agentes IA: use tom "{tone}" e identidade visual alinhada.
          </p>
          <Button onClick={applyBranding}>Salvar branding</Button>
        </div>
      </Card>
    </div>
  );
}
