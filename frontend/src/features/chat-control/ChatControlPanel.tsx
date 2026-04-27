import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

interface ChatControlPanelProps {
  leadName: string;
  activeAgent: "Gerente" | "SDR" | "Closer";
}

const mockConversation = [
  { id: "1", from: "SDR", text: "Oi! Vi seu interesse na nossa solucao." },
  { id: "2", from: "Lead", text: "Quero entender preco e prazo." },
  { id: "3", from: "SDR", text: "Posso coletar alguns dados para te direcionar." }
];

export function ChatControlPanel({ leadName, activeAgent }: ChatControlPanelProps) {
  const [manualMode, setManualMode] = useState(false);

  return (
    <div className="space-y-4">
      <Card title={`Conversa com ${leadName}`}>
        <p className="mb-3 text-sm text-[#A1A1B5]">Agente ativo: {activeAgent}</p>
        <div className="space-y-2 rounded-2xl border border-white/10 bg-[#0B0E17] p-3">
          {mockConversation.map((item) => (
            <p key={item.id} className="text-sm text-slate-200">
              <span className="font-semibold">{item.from}:</span> {item.text}
            </p>
          ))}
        </div>
      </Card>

      <Button onClick={() => setManualMode((current) => !current)}>
        {manualMode ? "Devolver para IA" : "Assumir controle"}
      </Button>

      {manualMode ? (
        <Card title="Modo manual ativo">
          <textarea
            className="min-h-24 w-full rounded-[14px] border border-white/10 bg-[#0D1018] p-3 text-sm text-slate-100 focus:border-violet-400/50 focus:outline-none"
            placeholder="Digite a mensagem manual para o lead..."
          />
        </Card>
      ) : null}
    </div>
  );
}
