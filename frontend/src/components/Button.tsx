import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-indigo-600 hover:bg-indigo-500 text-white",
  secondary: "bg-slate-700 hover:bg-slate-600 text-slate-100",
  danger: "bg-rose-600 hover:bg-rose-500 text-white"
};

export function Button({
  children,
  variant = "primary",
  className = "",
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
