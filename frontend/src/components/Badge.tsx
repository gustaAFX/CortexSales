import type { PropsWithChildren } from "react";

type BadgeTone = "success" | "warning" | "danger" | "info";

const toneClasses: Record<BadgeTone, string> = {
  success: "bg-[rgba(34,197,94,0.15)] text-[#22C55E] border-[#22C55E]/30",
  warning: "bg-[rgba(250,204,21,0.15)] text-[#FACC15] border-[#FACC15]/30",
  danger: "bg-rose-500/20 text-rose-300 border-rose-400/30",
  info: "bg-violet-500/20 text-violet-300 border-violet-400/30"
};

export function Badge({
  tone = "info",
  children
}: PropsWithChildren<{ tone?: BadgeTone }>) {
  return (
    <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
