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
    <div>
      <h2 className="mb-4 text-xl font-semibold">Pipeline Comercial</h2>
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
                    className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-left hover:border-indigo-500"
                  >
                    <p className="font-medium">{lead.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{lead.lastInteraction}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge tone={statusTone[lead.status]}>{lead.status}</Badge>
                      <span className="text-xs text-slate-400">{lead.ownerAgent}</span>
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
