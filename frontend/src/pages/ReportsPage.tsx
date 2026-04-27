import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Table } from "../components/Table";
import { reportLeads, reportMetrics } from "../features/reports/mockData";

export function ReportsPage() {
  return (
    <div className="space-y-5">
      <div className="rounded-[24px] border border-white/5 bg-[rgba(17,19,29,0.95)] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <h2 className="text-2xl font-bold text-white">Relatorios</h2>
        <p className="mt-2 text-sm text-[#A1A1B5]">
          Monitore performance comercial com foco em conversao, velocidade e risco.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reportMetrics.map((metric) => (
          <Card key={metric.label} title={metric.label}>
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="mt-1 text-xs text-[#A1A1B5]">{metric.hint}</p>
          </Card>
        ))}
      </div>

      <Card title="Filtros">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            className="h-12 rounded-[14px] border border-white/10 bg-[#0D1018] px-3 py-2 text-sm text-white placeholder:text-[#6B7280] focus:border-violet-400/50 focus:outline-none"
            placeholder="Periodo"
          />
          <input
            className="h-12 rounded-[14px] border border-white/10 bg-[#0D1018] px-3 py-2 text-sm text-white placeholder:text-[#6B7280] focus:border-violet-400/50 focus:outline-none"
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
