import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface AppStoreState {
  companyName: string;
  setCompanyName: (value: string) => void;
}

const AppStoreContext = createContext<AppStoreState | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [companyName, setCompanyName] = useState("CortexSales");
  const value = useMemo(
    () => ({
      companyName,
      setCompanyName
    }),
    [companyName]
  );

  return (
    <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>
  );
}

export function useAppStore(): AppStoreState {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStore must be used within AppStoreProvider");
  }
  return context;
}
