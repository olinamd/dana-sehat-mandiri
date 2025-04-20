
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { cashFlowCategories } from "@/utils/transactionCategories";
import { toast } from "sonner";

interface TransactionFormProps {
  onClose: () => void;
  addTransaction: (transaction: {
    id: number;
    date: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    mainCategory: string;
    subCategory: string;
  }) => void;
}

const TransactionForm = ({ onClose, addTransaction }: TransactionFormProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [mainCategory, setMainCategory] = useState<string>('');
  const [subCategory, setSubCategory] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !description || !amount || !mainCategory || !subCategory) {
      toast.error("Semua field harus diisi");
      return;
    }
    
    // Format the date as YYYY-MM-DD
    const formattedDate = date ? format(date, "yyyy-MM-dd") : '';
    
    // Find the category name from the ID
    const categoryObj = cashFlowCategories[type].find(cat => cat.id === mainCategory);
    const mainCategoryName = categoryObj ? categoryObj.name : '';
    
    // Find the subcategory name from the ID
    const subCategoryObj = categoryObj?.subcategories.find(sub => sub.id === subCategory);
    const subCategoryName = subCategoryObj ? subCategoryObj.name : '';
    
    const newTransaction = {
      id: Date.now(),
      date: formattedDate,
      description,
      amount: parseFloat(amount),
      type,
      mainCategory: mainCategoryName,
      subCategory: subCategoryName,
    };
    
    addTransaction(newTransaction);
    toast.success("Arus Kas berhasil disimpan"); // Ubah Transaksi berhasil disimpan
    onClose();
  };
  
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="transaction-type">Jenis Arus Kas</Label> {/* Ganti label */}
        <RadioGroup 
          id="transaction-type" 
          defaultValue="expense" 
          className="flex"
          onValueChange={(value) => setType(value as 'expense' | 'income')}
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
              type="button"
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
        <Input 
          id="description" 
          placeholder="Masukkan deskripsi arus kas" // Ubah placeholder
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Jumlah (Rp)</Label>
        <Input 
          id="amount" 
          type="number" 
          placeholder="0" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="main-category">Kategori Utama</Label>
        <Select 
          value={mainCategory} 
          onValueChange={(value) => {
            setMainCategory(value);
            setSubCategory(''); // Reset subcategory when main category changes
          }}
        >
          <SelectTrigger id="main-category">
            <SelectValue placeholder="Pilih kategori utama" />
          </SelectTrigger>
          <SelectContent>
            {cashFlowCategories[type].map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {mainCategory && (
        <div className="space-y-2">
          <Label htmlFor="sub-category">Sub Kategori</Label>
          <Select value={subCategory} onValueChange={setSubCategory}>
            <SelectTrigger id="sub-category">
              <SelectValue placeholder="Pilih sub kategori" />
            </SelectTrigger>
            <SelectContent>
              {cashFlowCategories[type]
                .find(cat => cat.id === mainCategory)
                ?.subcategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id}>
                    {subCategory.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose} type="button">
          Batal
        </Button>
        <Button type="submit">
          Simpan
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;
