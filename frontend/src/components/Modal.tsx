import { useEffect, type PropsWithChildren } from "react";

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

export function Modal({
  title,
  open,
  onClose,
  children
}: PropsWithChildren<ModalProps>) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-xl rounded-xl border border-slate-700 bg-slate-900 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200" aria-label="Fechar">
            Fechar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
