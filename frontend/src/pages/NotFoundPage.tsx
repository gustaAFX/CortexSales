import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pagina nao encontrada</h2>
      <p className="text-slate-300">A rota solicitada nao existe.</p>
      <Link to="/dashboard" className="text-indigo-300 hover:text-indigo-200">
        Voltar para dashboard
      </Link>
    </div>
  );
}
