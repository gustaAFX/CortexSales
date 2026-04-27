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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-xl rounded-[24px] border border-white/10 bg-[rgba(17,19,29,0.96)] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-violet-200" aria-label="Fechar">
            Fechar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
