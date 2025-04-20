
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";

interface BudgetEditModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  value: number;
  onChange: (value: number) => void;
  onSave: () => void;
}

export default function BudgetEditModal({
  open,
  onClose,
  label,
  value,
  onChange,
  onSave,
}: BudgetEditModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[320px]">
        <DialogHeader>
          <DialogTitle>
            Edit Budget: {label}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <label className="text-sm">
            Budget untuk <span className="font-bold">{label}</span>
          </label>
          <input
            type="number"
            className="border rounded px-2 py-1"
            value={value}
            min={0}
            onChange={e => onChange(Number(e.target.value))}
          />
          <div className="flex flex-row-reverse gap-2 mt-2">
            <Button onClick={onSave} size="sm">Simpan</Button>
            <Button variant="outline" onClick={onClose} size="sm">Batal</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
