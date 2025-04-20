
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Liability } from "@/types/assets";
import { toast } from "sonner";

interface LiabilityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (liability: Omit<Liability, "id">) => void;
  editingLiability?: Liability;
}

const LIABILITY_CATEGORIES = {
  "short-term": [
    "Kartu Kredit",
    "Pinjaman Teman",
    "Pinjaman Keluarga",
    "Pinjaman Lain - Lain",
  ],
  "long-term": [
    "Kredit Pemilikan Rumah",
    "Kredit Pemilikan Mobil",
    "Pinjaman Usaha",
    "Pinjaman Lain - Lain",
  ],
};

export default function LiabilityForm({ isOpen, onClose, onSubmit, editingLiability }: LiabilityFormProps) {
  const [category, setCategory] = useState<"short-term" | "long-term">(
    editingLiability?.category || "short-term"
  );
  const [subcategory, setSubcategory] = useState(editingLiability?.subcategory || "");
  const [amount, setAmount] = useState(editingLiability?.amount.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subcategory || !amount) {
      toast.error("Mohon lengkapi semua field");
      return;
    }

    onSubmit({
      category,
      subcategory,
      amount: Number(amount),
      name: `${category} - ${subcategory}`,
    });

    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{editingLiability ? "Edit Liabilitas" : "Tambah Liabilitas Baru"}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Kategori</label>
            <Select
              value={category}
              onValueChange={(value: "short-term" | "long-term") => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short-term">Jangka Pendek</SelectItem>
                <SelectItem value="long-term">Jangka Panjang</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Jenis</label>
            <Select value={subcategory} onValueChange={setSubcategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LIABILITY_CATEGORIES[category].map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nilai</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Masukkan nilai liabilitas"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {editingLiability ? "Simpan" : "Tambah"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
