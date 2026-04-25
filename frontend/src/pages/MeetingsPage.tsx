import { Badge } from "../components/Badge";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { mockMeetings } from "../features/meetings/mockData";

export function MeetingsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Reunioes</h2>
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
