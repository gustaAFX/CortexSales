import type { ReactNode } from "react";
import { ArrowUpRight, CircleDollarSign, Crown, Target, Trophy, UserCheck } from "lucide-react";
import { Card } from "../components/Card";
import { Demo } from "../components/ui/demo";
import { dashboardKpis, recentAgentActivities } from "../features/dashboard/mockData";
import { mockLeads } from "../features/kanban/mockData";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-violet-700/30 bg-gradient-to-r from-[#1b1a3b] via-[#0d1023] to-[#0c1329] p-5 shadow-xl shadow-violet-950/40">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-violet-300">Painel Executivo</p>
            <h2 className="mt-2 text-3xl font-semibold">Construa previsibilidade no funil comercial</h2>
            <p className="mt-3 max-w-xl text-sm text-slate-300">
              Acompanhe leads, conversao, riscos e atividades dos agentes em um painel unico, pensado para decisoes rapidas.
            </p>
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-violet-300 px-4 py-2 text-sm font-semibold text-[#111123] hover:bg-violet-200"
            >
              Abrir plano de acao
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div
              className="col-span-2 h-24 rounded-xl border border-white/10 bg-cover bg-center"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(9,11,23,0.85), rgba(9,11,23,0.35)), url('https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80')"
              }}
            >
              <div className="flex h-full items-end p-3">
                <p className="text-xs text-slate-200">Visao consolidada de performance e confianca operacional</p>
              </div>
            </div>
            <StatChip icon={<UserCheck className="h-4 w-4" />} label="Leads ativos" value="124" />
            <StatChip icon={<CircleDollarSign className="h-4 w-4" />} label="Receita prevista" value="R$ 96k" />
            <StatChip icon={<Target className="h-4 w-4" />} label="Conversao" value="30.6%" />
            <StatChip icon={<Crown className="h-4 w-4" />} label="NPS bot" value="89" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <Card key={kpi.label} title={kpi.label}>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <p className="mt-1 text-xs text-emerald-300">+12% vs ultima semana</p>
          </Card>
        ))}
      </section>

      <section className="grid items-stretch gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Card title="Leads em foco" className="h-full">
          <div className="space-y-3">
            <div className="grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs uppercase tracking-wide text-slate-400">
              <span>Lead</span>
              <span>Status</span>
              <span>Responsavel</span>
              <span>Ultimo contato</span>
            </div>
            {mockLeads.map((lead) => (
              <div
                key={lead.id}
                className="grid grid-cols-[1.3fr_1fr_1fr_1fr] gap-3 rounded-lg border border-violet-900/30 bg-[#0b0d1a] px-3 py-2 text-sm"
              >
                <span className="font-medium text-slate-100">{lead.name}</span>
                <span className="text-slate-300">{lead.status}</span>
                <span className="text-violet-300">{lead.ownerAgent}</span>
                <span className="text-slate-400">{lead.lastInteraction}</span>
              </div>
            ))}
          </div>
        </Card>

        <div className="h-full">
          <Demo />
        </div>
      </section>

      <section className="grid items-stretch gap-4 lg:grid-cols-2">
        <Card title="Atividade recente dos agentes" className="h-full">
          <ul className="space-y-3">
            {recentAgentActivities.map((activity) => (
              <li key={activity.id} className="rounded-lg border border-white/10 bg-black/20 px-3 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-100">{activity.agent}</p>
                  <p className="text-xs text-slate-400">{activity.createdAt}</p>
                </div>
                <p className="mt-1 text-sm text-slate-300">{activity.message}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Competicao do mes" className="h-full">
          <div className="rounded-xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-transparent p-4">
            <div className="flex items-center gap-2 text-yellow-300">
              <Trophy className="h-4 w-4" />
              <p className="text-sm font-semibold">Top closers - Abril</p>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              Time comercial com melhor taxa de fechamento recebe destaque e bonus interno.
            </p>
            <button type="button" className="mt-4 rounded-lg bg-yellow-300 px-3 py-2 text-sm font-semibold text-[#171212]">
              Ver ranking
            </button>
          </div>
        </Card>
      </section>
    </div>
  );
}

function StatChip({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-3">
      <div className="mb-2 inline-flex rounded-md bg-violet-400/20 p-2 text-violet-200">{icon}</div>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
