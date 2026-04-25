import { Avatar } from "../components/Avatar";
import { Card } from "../components/Card";
import { dashboardKpis, recentAgentActivities } from "../features/dashboard/mockData";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <Card key={kpi.label} title={kpi.label}>
            <p className="text-2xl font-bold">{kpi.value}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Performance (mock)">
          <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-slate-700 text-slate-400">
            Grafico em construcao
          </div>
        </Card>

        <Card title="Atividade recente dos agentes">
          <ul className="space-y-3">
            {recentAgentActivities.map((activity) => (
              <li key={activity.id} className="flex items-start gap-3">
                <Avatar name={activity.agent} />
                <div>
                  <p className="text-sm text-slate-100">{activity.message}</p>
                  <p className="text-xs text-slate-400">{activity.createdAt}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </div>
  );
}
