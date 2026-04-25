import { NavLink, Outlet } from "react-router-dom";
import { useAppStore } from "../store/appStore";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/kanban", label: "Kanban" },
  { to: "/reports", label: "Reports" },
  { to: "/meetings", label: "Meetings" },
  { to: "/products", label: "Products" },
  { to: "/branding", label: "Branding" }
];

export function AppLayout() {
  const { companyName } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="border-b border-slate-800 bg-slate-900 p-4 md:border-b-0 md:border-r">
          <h1 className="mb-6 text-xl font-bold">CortexSales</h1>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm ${
                    isActive ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-slate-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/60 px-6 py-4">
            <div>
              <p className="text-sm text-slate-400">Empresa</p>
              <p className="font-semibold">{companyName}</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-300">
                Status: Online
              </span>
              <span className="text-slate-300">Usuario: Gestor Comercial</span>
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
