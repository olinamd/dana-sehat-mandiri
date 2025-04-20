
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface TransactionFormProps {
  onClose: () => void;
}

const incomeCategories = [
  "Gaji", 
  "Bonus", 
  "Praktek", 
  "Investasi", 
  "Lainnya"
];

const expenseCategories = [
  "Perumahan", 
  "Transportasi", 
  "Makanan", 
  "Kesehatan", 
  "Pendidikan", 
  "Hiburan", 
  "Utilitas", 
  "Tabungan", 
  "Investasi", 
  "Lainnya"
];

const TransactionForm = ({ onClose }: TransactionFormProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [type, setType] = useState<string>("expense");
  
  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="transaction-type">Jenis Transaksi</Label>
        <RadioGroup 
          id="transaction-type" 
          defaultValue="expense" 
          className="flex"
          onValueChange={setType}
        >
          <div className="flex items-center space-x-2 mr-6">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense" className="cursor-pointer">Pengeluaran</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income" className="cursor-pointer">Pemasukan</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Tanggal</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
              id="date"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Deskripsi</Label>
        <Input id="description" placeholder="Masukkan deskripsi transaksi" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Jumlah (Rp)</Label>
        <Input id="amount" type="number" placeholder="0" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Kategori</Label>
        <Select>
          <SelectTrigger id="category">
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            {(type === 'income' ? incomeCategories : expenseCategories).map((category) => (
              <SelectItem key={category} value={category.toLowerCase()}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button>
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
