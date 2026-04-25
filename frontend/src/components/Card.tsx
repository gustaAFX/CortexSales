import type { PropsWithChildren } from "react";

interface CardProps {
  title?: string;
}

export function Card({
  title,
  children
}: PropsWithChildren<CardProps>) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-lg shadow-slate-950/40">
      {title ? <h3 className="mb-3 text-sm font-semibold text-slate-300">{title}</h3> : null}
      {children}
    </section>
  );
}
