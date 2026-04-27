import {
  BarChart3,
  BriefcaseBusiness,
  CalendarClock,
  LayoutDashboard,
  Palette,
  Search,
  Settings,
  Users
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppStore } from "../store/appStore";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/kanban", label: "Kanban", icon: BriefcaseBusiness },
  { to: "/reports", label: "Relatorios", icon: BarChart3 },
  { to: "/meetings", label: "Reunioes", icon: CalendarClock },
  { to: "/products", label: "Produtos", icon: Users },
  { to: "/branding", label: "Branding", icon: Palette }
];

export function AppLayout() {
  const { companyName } = useAppStore();

  return (
    <div className="min-h-screen bg-[#060711] text-slate-100">
      <div className="min-h-screen">
        <aside className="border-b border-violet-900/40 bg-[#08090F] p-4 lg:fixed lg:inset-y-0 lg:left-0 lg:w-[260px] lg:border-b-0 lg:border-r lg:border-r-violet-900/30">
          <h1 className="mb-6 bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-xl font-bold text-transparent">
            {companyName}
          </h1>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `group flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600/90 to-indigo-600/80 text-white shadow-lg shadow-violet-950/40"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-8 rounded-xl border border-violet-700/30 bg-gradient-to-br from-violet-500/20 to-indigo-500/10 p-3">
            <p className="text-sm font-medium">Modo IA ativo</p>
            <p className="mt-1 text-xs text-slate-300">
              Receba alertas de risco e sugestoes automaticas no funil.
            </p>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col lg:ml-[260px]">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-900/30 bg-[#090b17]/90 px-5 py-4 backdrop-blur">
            <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-300">
              <Search className="h-4 w-4 text-slate-400" />
              <span>Buscar lead, reuniao ou produto...</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-emerald-300">
                Online
              </span>
              <span className="rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-slate-200">
                Gestor Comercial
              </span>
              <button type="button" className="rounded-lg border border-white/10 bg-black/20 p-2 text-slate-300 hover:text-white">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </header>
          <main className="flex-1 p-5 lg:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
