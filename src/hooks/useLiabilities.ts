
import { useState } from "react";
import { Liability } from "@/types/assets";
import { toast } from "sonner";

interface UseLiabilitiesProps {
  mockLiabilities: Liability[];
  addTransaction: (liability: Liability, transactionType: 'add' | 'update' | 'delete') => number;
}

export function useLiabilities({ mockLiabilities, addTransaction }: UseLiabilitiesProps) {
  const [liabilities, setLiabilities] = useState<Liability[]>(mockLiabilities);
  const [editingLiability, setEditingLiability] = useState<Liability | undefined>();
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);

  const totalLiabilities = liabilities.reduce((sum, l) => sum + l.amount, 0);

  const handleAddLiability = (newLiability: Omit<Liability, "id">) => {
    const transactionId = addTransaction(newLiability as Liability, "add");
    setLiabilities(prev => [...prev, { ...newLiability, id: prev.length + 1, transactionId }]);
    toast.success("Liabilitas berhasil ditambahkan");
  };

  const handleEditLiability = (liability: Liability) => {
    setEditingLiability(liability);
    setShowLiabilityForm(true);
  };

  const handleUpdateLiability = (updatedLiability: Omit<Liability, "id">) => {
    setLiabilities(prev =>
      prev.map(liability =>
        liability.id === editingLiability?.id
          ? { ...updatedLiability, id: liability.id, transactionId: liability.transactionId }
          : liability
      )
    );
    setEditingLiability(undefined);
    toast.success("Liabilitas berhasil diperbarui");
  };

  const handleDeleteLiability = (id: number) => {
    setLiabilities(prev => prev.filter(liability => liability.id !== id));
    toast.success("Liabilitas berhasil dihapus");
  };

  return {
    liabilities,
    editingLiability,
    showLiabilityForm,
    setShowLiabilityForm,
    setEditingLiability,
    handleAddLiability,
    handleEditLiability,
    handleUpdateLiability,
    handleDeleteLiability,
    totalLiabilities
  };
}
