
import { useState } from "react";

export type EditTargetType = { group: "Need" | "Want" | "Save", label: string } | null;

export function useBudgetEdit(initialBudgets: Record<string, number>) {
  const [budgets, setBudgets] = useState<Record<string, number>>(initialBudgets);
  const [editTarget, setEditTarget] = useState<EditTargetType>(null);
  const [editBudgetValue, setEditBudgetValue] = useState<number>(0);

  const openEdit = (group: "Need" | "Want" | "Save", label: string, currentBudget: number) => {
    setEditTarget({ group, label });
    setEditBudgetValue(currentBudget || 0);
  };

  const closeEdit = () => setEditTarget(null);

  const saveEdit = () => {
    if (editTarget) {
      setBudgets({
        ...budgets,
        [`${editTarget.group}|${editTarget.label}`]: editBudgetValue,
      });
      setEditTarget(null);
    }
  };

  return {
    budgets,
    setBudgets,
    editTarget,
    editBudgetValue,
    setEditBudgetValue,
    openEdit,
    closeEdit,
    saveEdit
  };
}
