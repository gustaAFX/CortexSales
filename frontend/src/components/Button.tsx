import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-[#8B7CFF] to-[#C3B7FF] text-[#11131D] shadow-[0_8px_24px_rgba(139,124,255,0.35)] hover:brightness-105",
  secondary:
    "border border-white/10 bg-[#0D1018] text-slate-200 hover:border-violet-400/40 hover:bg-[#131827]",
  danger: "bg-rose-600/90 text-white hover:bg-rose-500"
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={`rounded-[14px] px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
