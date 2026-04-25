import { useEffect, type PropsWithChildren } from "react";

interface DrawerProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

export function Drawer({
  title,
  open,
  onClose,
  children
}: PropsWithChildren<DrawerProps>) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/50"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-full max-w-md border-l border-slate-700 bg-slate-900 p-5 transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200" aria-label="Fechar">
            Fechar
          </button>
        </div>
        {children}
      </aside>
    </>
  );
}
