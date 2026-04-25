interface TabsProps {
  tabs: string[];
  activeTab: string;
  onSelect: (tab: string) => void;
}

export function Tabs({ tabs, activeTab, onSelect }: TabsProps) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`rounded-md px-3 py-2 text-sm ${
            activeTab === tab
              ? "bg-indigo-600 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
