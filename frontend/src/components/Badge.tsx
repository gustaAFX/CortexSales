import type { PropsWithChildren } from "react";

type BadgeTone = "success" | "warning" | "danger" | "info";

const toneClasses: Record<BadgeTone, string> = {
  success: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
  warning: "bg-amber-500/20 text-amber-300 border-amber-400/30",
  danger: "bg-rose-500/20 text-rose-300 border-rose-400/30",
  info: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30"
};

export function Badge({
  tone = "info",
  children
}: PropsWithChildren<{ tone?: BadgeTone }>) {
  return (
    <span className={`rounded-full border px-2 py-1 text-xs font-medium ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
