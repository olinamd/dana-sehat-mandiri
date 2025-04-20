
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/utils/formatters";
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
          <Input
            type="number"
            value={value}
            min={0}
            onChange={e => onChange(Number(e.target.value))}
          />
          <p className="text-xs text-muted-foreground">
            {formatRupiah(value)}
          </p>
          <div className="flex flex-row-reverse gap-2 mt-2">
            <Button onClick={onSave} size="sm">Simpan</Button>
            <Button variant="outline" onClick={onClose} size="sm">Batal</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
