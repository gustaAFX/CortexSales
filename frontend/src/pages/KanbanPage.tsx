import { useMemo, useState } from "react";
import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { Drawer } from "../components/Drawer";
import { ChatControlPanel } from "../features/chat-control/ChatControlPanel";
import { kanbanColumns, mockLeads } from "../features/kanban/mockData";
import type { Lead } from "../types/domain";

const statusTone: Record<Lead["status"], "success" | "warning" | "danger" | "info"> = {
  "Novo Lead": "info",
  "Qualificacao (SDR)": "warning",
  "Proposta (Closer)": "info",
  Fechado: "success",
  Perdido: "danger"
};

export function KanbanPage() {
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const selectedLead = useMemo(
    () => mockLeads.find((lead) => lead.id === selectedLeadId) ?? null,
    [selectedLeadId]
  );

  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/5 bg-[rgba(17,19,29,0.95)] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <h2 className="text-2xl font-bold text-white">Pipeline Comercial</h2>
        <p className="mt-2 text-sm text-[#A1A1B5]">
          Visualize o funil completo, identifique gargalos e acompanhe o dono de cada oportunidade.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        {kanbanColumns.map((column) => (
          <Card key={column} title={column}>
            <div className="space-y-3">
              {mockLeads
                .filter((lead) => lead.status === column)
                .map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className="w-full rounded-2xl border border-white/10 bg-[#0E111A] p-3 text-left transition hover:border-violet-400/50 hover:shadow-[0_0_25px_rgba(123,97,255,0.15)]"
                  >
                    <p className="font-medium text-white">{lead.name}</p>
                    <p className="mt-1 text-xs text-[#A1A1B5]">{lead.lastInteraction}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge tone={statusTone[lead.status]}>{lead.status}</Badge>
                      <span className="text-xs text-violet-300">{lead.ownerAgent}</span>
                    </div>
                  </button>
                ))}
            </div>
          </Card>
        ))}
      </div>

      <Drawer
        title={selectedLead ? `Lead: ${selectedLead.name}` : "Detalhes do lead"}
        open={Boolean(selectedLead)}
        onClose={() => setSelectedLeadId(null)}
      >
        {selectedLead ? (
          <ChatControlPanel leadName={selectedLead.name} activeAgent={selectedLead.ownerAgent} />
        ) : null}
      </Drawer>
    </div>
  );
}
