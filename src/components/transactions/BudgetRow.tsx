
import { Pencil } from "lucide-react";
import { formatRupiah } from "@/utils/formatters";
import React from "react";

interface BudgetRowProps {
  group: "Need" | "Want" | "Save";
  label: string;
  main: string;
  sub: string;
  budget: number;
  realisasi: number;
  onEdit: (group: "Need" | "Want" | "Save", label: string) => void;
}

export default function BudgetRow({
  group,
  label,
  main,
  sub,
  budget,
  realisasi,
  onEdit,
}: BudgetRowProps) {
  const selisih = budget - realisasi;
  return (
    <tr>
      <td className="py-1 px-2 flex items-center justify-between">
        <span>{label}</span>
        <button 
          className="p-1 hover:bg-accent rounded ml-2"
          onClick={(e) => { e.preventDefault(); onEdit(group, label)}}
          aria-label="Edit budget"
          type="button"
        >
          <Pencil size={16} />
        </button>
      </td>
      <td className="py-1 px-2 text-right text-muted-foreground">{formatRupiah(budget)}</td>
      <td className="py-1 px-2 text-right">{formatRupiah(realisasi)}</td>
      <td className={`py-1 px-2 text-right ${selisih < 0 ? "text-destructive" : "text-dsm-green"}`}>
        {formatRupiah(selisih)}
      </td>
    </tr>
  );
}
