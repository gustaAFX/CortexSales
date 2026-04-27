import type { ReactNode } from "react";

interface Column<T> {
  key: keyof T;
  header: string;
  render?: (row: T) => ReactNode;
}

interface TableProps<T extends { id: string | number }> {
  columns: Column<T>[];
  rows: T[];
}

export function Table<T extends { id: string | number }>({
  columns,
  rows
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-[18px] border border-white/10 bg-[#0E111A]">
      <table className="min-w-full bg-transparent">
        <thead className="bg-[#171A24] text-left text-[13px] uppercase tracking-wide text-[#A1A1B5]">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} className="px-4 py-3.5 font-semibold">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-white/5">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3 text-sm text-slate-200">
                  {column.render ? column.render(row) : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
