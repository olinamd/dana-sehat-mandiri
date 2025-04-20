
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Asset } from "@/types/assets";
import { toast } from "sonner";

interface AssetFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (asset: Omit<Asset, "id">) => void;
  editingAsset?: Asset;
}

const ASSET_CATEGORIES = {
  liquid: [
    "Tabungan",
    "Piutang",
    "Nilai Tunai Asuransi Jiwa",
    "Mata Uang Asing (dalam Rp)",
  ],
  investment: [
    "Trading Forex",
    "Deposito",
    "Emas",
    "Reksa Dana",
    "Saham",
    "Mitra Usaha",
    "Koleksi Seni",
    "Obligasi",
    "Properti",
    "Kendaraan",
    "Mata Uang Kripto",
    "Indeks",
  ],
  personal: [
    "Rumah",
    "Kendaraan",
    "Koleksi Seni",
    "Perhiasan",
    "Elektronik",
    "Aset Lainnya",
  ],
};

export default function AssetForm({ isOpen, onClose, onSubmit, editingAsset }: AssetFormProps) {
  const [category, setCategory] = useState<"liquid" | "investment" | "personal">(
    editingAsset?.category || "liquid"
  );
  const [subcategory, setSubcategory] = useState(editingAsset?.subcategory || "");
  const [amount, setAmount] = useState(editingAsset?.amount.toString() || "");

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
          <SheetTitle>{editingAsset ? "Edit Aset" : "Tambah Aset Baru"}</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Kategori</label>
            <Select
              value={category}
              onValueChange={(value: "liquid" | "investment" | "personal") => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="liquid">Aset Likuid</SelectItem>
                <SelectItem value="investment">Aset Investasi</SelectItem>
                <SelectItem value="personal">Aset Penggunaan Pribadi</SelectItem>
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
                {ASSET_CATEGORIES[category].map((item) => (
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
              placeholder="Masukkan nilai aset"
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" type="button" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">
              {editingAsset ? "Simpan" : "Tambah"}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
