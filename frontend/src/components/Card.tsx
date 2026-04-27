import type { PropsWithChildren } from "react";

interface CardProps {
  title?: string;
  className?: string;
}

export function Card({
  title,
  className = "",
  children
}: PropsWithChildren<CardProps>) {
  return (
    <section
      className={`rounded-[24px] border border-white/5 bg-[rgba(17,19,29,0.95)] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm ${className}`}
    >
      {title ? <h3 className="mb-4 text-base font-semibold text-white">{title}</h3> : null}
      {children}
    </section>
  );
}
