
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Liability } from "@/types/assets";
import { toast } from "sonner";
import { CalendarIcon, User, MapPin, Phone, Mail, FileText } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface LiabilityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (liability: Omit<Liability, "id"> & {
    dueDate?: string;
    contactName?: string;
    contactAddress?: string;
    contactPhone?: string;
    contactEmail?: string;
    notes?: string;
  }) => void;
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

const HUTANG_CATEGORIES = [
  "Kredit Pemilikan Rumah",
  "Kredit Pemilikan Mobil",
  "Pinjaman Teman",
  "Pinjaman Keluarga",
  "Pinjaman Usaha",
  "Pinjaman Lain - Lain",
  "Kartu Kredit",
];

export default function LiabilityForm({ isOpen, onClose, onSubmit, editingLiability }: LiabilityFormProps) {
  const [category, setCategory] = useState<"short-term" | "long-term">(
    editingLiability?.category || "short-term"
  );
  const [subcategory, setSubcategory] = useState(editingLiability?.subcategory || "");
  const [amount, setAmount] = useState(editingLiability?.amount.toString() || "");

  // Tambahan field untuk Hutang
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [contactName, setContactName] = useState<string>("");
  const [contactAddress, setContactAddress] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const isHutang = HUTANG_CATEGORIES.includes(subcategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subcategory || !amount) {
      toast.error("Mohon lengkapi semua field");
      return;
    }
    // Jika Hutang, field tambahan harus terisi!
    if (isHutang && (!contactName || !dueDate)) {
      toast.error("Mohon isi nama kontak dan tanggal jatuh tempo untuk Hutang");
      return;
    }

    onSubmit({
      category,
      subcategory,
      amount: Number(amount),
      name: `${category} - ${subcategory}`,
      ...(isHutang && {
        dueDate: dueDate ? format(dueDate, "yyyy-MM-dd") : undefined,
        contactName,
        contactAddress,
        contactPhone,
        contactEmail,
        notes,
      }),
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
              onValueChange={(value: "short-term" | "long-term") => {
                setCategory(value);
                setSubcategory(""); // reset subkategori jika kategori berubah
              }}
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

          {/* Jika Hutang, tampilkan field tambahan */}
          {isHutang && (
            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <label className="text-sm">Nama Kontak</label>
              </div>
              <Input
                type="text"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                placeholder="Nama kontak/hutang"
              />

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <label className="text-sm">Alamat</label>
              </div>
              <Input
                type="text"
                value={contactAddress}
                onChange={e => setContactAddress(e.target.value)}
                placeholder="Alamat"
              />

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <label className="text-sm">No. Telepon</label>
              </div>
              <Input
                type="text"
                value={contactPhone}
                onChange={e => setContactPhone(e.target.value)}
                placeholder="No. Telepon"
              />

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <label className="text-sm">Email</label>
              </div>
              <Input
                type="email"
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                placeholder="Email"
              />

              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <label className="text-sm">Tanggal Jatuh Tempo</label>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full pl-3 text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    {dueDate ? format(dueDate, "PPP") : <span>Pilih tanggal</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start" side="bottom">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <label className="text-sm">Keterangan</label>
              </div>
              <Input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Keterangan tambahan"
              />
            </div>
          )}

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
