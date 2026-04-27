import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { mockMeetings } from "../features/meetings/mockData";

export function MeetingsPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/5 bg-[rgba(17,19,29,0.95)] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <h2 className="text-2xl font-bold text-white">Reunioes</h2>
        <p className="mt-2 text-sm text-[#A1A1B5]">
          Organize agendas, priorize contas críticas e acompanhe status de execução.
        </p>
      </div>
      <Card title="Agenda de reunioes">
        <Table
          rows={mockMeetings}
          columns={[
            { key: "lead", header: "Lead" },
            { key: "datetime", header: "Data/Hora" },
            { key: "agent", header: "Agente" },
            {
              key: "status",
              header: "Status",
              render: (meeting) => (
                <Badge
                  tone={
                    meeting.status === "Agendada"
                      ? "warning"
                      : meeting.status === "Concluida"
                        ? "success"
                        : "danger"
                  }
                >
                  {meeting.status}
                </Badge>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
}
