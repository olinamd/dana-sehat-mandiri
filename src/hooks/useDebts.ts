
import { useState } from "react";
import { DebtItem } from "@/types";
import { toast } from "sonner";

interface UseDebtsProps {
  mockDebts: DebtItem[];
}

export function useDebts({ mockDebts }: UseDebtsProps) {
  const [debts, setDebts] = useState<DebtItem[]>(mockDebts);

  const handleAddDebt = (newDebt: Omit<DebtItem, "id">) => {
    setDebts(prev => [
      ...prev,
      {
        ...newDebt,
        id: prev.length + 1,
        transactionId: newDebt.transactionId,
      },
    ]);
    toast.success("Hutang berhasil ditambahkan dari liabilitas");
  };

  const handleDeleteDebt = (id: number) => {
    setDebts(prev => prev.filter(debt => debt.id !== id));
    toast.success("Hutang berhasil dihapus");
  };

  return {
    debts,
    handleAddDebt,
    handleDeleteDebt,
  };
}
