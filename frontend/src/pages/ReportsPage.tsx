import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { reportLeads, reportMetrics } from "../features/reports/mockData";

export function ReportsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Reports</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {reportMetrics.map((metric) => (
          <Card key={metric.label} title={metric.label}>
            <p className="text-2xl font-bold">{metric.value}</p>
          </Card>
        ))}
      </div>

      <Card title="Filtros">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Periodo"
          />
          <input
            className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
            placeholder="Status"
          />
          <Button>Exportar dados (mock)</Button>
        </div>
      </Card>

      <Card title="Tabela de leads">
        <Table
          rows={reportLeads}
          columns={[
            { key: "lead", header: "Lead" },
            { key: "status", header: "Status" },
            { key: "period", header: "Periodo" }
          ]}
        />
      </Card>
    </div>
  );
}
