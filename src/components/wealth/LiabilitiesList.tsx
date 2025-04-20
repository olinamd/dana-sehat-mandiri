
import React from "react";
import { Trash2, Pencil } from "lucide-react";
import { Liability } from "@/types/assets";

interface LiabilitiesListProps {
  liabilities: Liability[];
  onEdit: (liability: Liability) => void;
  onDelete: (id: number) => void;
}

const LiabilitiesList: React.FC<LiabilitiesListProps> = ({
  liabilities,
  onEdit,
  onDelete,
}) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 text-left">Nama</th>
          <th className="px-4 py-2 text-left">Kategori</th>
          <th className="px-4 py-2 text-left">Subkategori</th>
          <th className="px-4 py-2 text-left">Jatuh Tempo</th>
          <th className="px-4 py-2 text-right">Cicilan/Bulan</th>
          <th className="px-4 py-2 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody>
        {liabilities.map((liability) => (
          <tr key={liability.id}>
            <td className="px-4 py-2">{liability.name}</td>
            <td className="px-4 py-2">{liability.category}</td>
            <td className="px-4 py-2">{liability.subcategory}</td>
            <td className="px-4 py-2">{liability.dueDate ? liability.dueDate : "-"}</td>
            <td className="px-4 py-2 text-right">
              {liability.monthlyPayment !== undefined
                ? `Rp ${liability.monthlyPayment.toLocaleString()}`
                : "-"}
            </td>
            <td className="px-4 py-2 text-right space-x-2">
              <button
                onClick={() => onEdit(liability)}
                className="text-blue-600 hover:text-blue-800"
                aria-label="Edit"
                type="button"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(liability.id)}
                className="text-destructive hover:text-red-700"
                aria-label="Delete"
                type="button"
              >
                <Trash2 size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LiabilitiesList;
