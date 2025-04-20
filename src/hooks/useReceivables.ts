
import { useState } from "react";
import { ReceivableItem } from "@/types";
import { toast } from "sonner";

interface UseReceivablesProps {
  mockReceivables: ReceivableItem[];
}

export function useReceivables({ mockReceivables }: UseReceivablesProps) {
  const [receivables, setReceivables] = useState<ReceivableItem[]>(mockReceivables);

  const handleAddReceivable = (receivable: Omit<ReceivableItem, "id">) => {
    setReceivables(prev => [
      ...prev,
      {
        ...receivable,
        id: prev.length + 1,
        transactionId: receivable.transactionId,
      },
    ]);
    toast.success("Piutang berhasil ditambahkan dari aset");
  };

  const handleDeleteReceivable = (id: number) => {
    setReceivables(prev => prev.filter(r => r.id !== id));
    toast.success("Piutang telah dihapus");
  };

  return {
    receivables,
    handleAddReceivable,
    handleDeleteReceivable,
  };
}
