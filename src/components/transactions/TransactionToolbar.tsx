
import { Button } from "@/components/ui/button";
import { Filter, Download, PlusCircle, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

interface TransactionToolbarProps {
  onNewTransaction: () => void;
  setSortBy: (value: 'date' | 'category' | 'amount') => void;
  setFilterBy: (value: 'all' | 'date' | 'category' | 'subCategory') => void;
  filterBy: 'all' | 'date' | 'category' | 'subCategory';
  filterValue: string | null;
  setFilterValue: (value: string | null) => void;
  getUniqueDates: () => string[];
  getUniqueCategories: () => string[];
  getUniqueSubCategories: () => string[];
}

const TransactionToolbar = ({
  onNewTransaction,
  setSortBy,
  setFilterBy,
  filterBy,
  filterValue,
  setFilterValue,
  getUniqueDates,
  getUniqueCategories,
  getUniqueSubCategories
}: TransactionToolbarProps) => {
  // Tentukan options berdasarkan filterBy
  let filterOptions: string[] = [];
  if (filterBy === "date") {
    filterOptions = getUniqueDates();
  } else if (filterBy === "category") {
    filterOptions = getUniqueCategories();
  } else if (filterBy === "subCategory") {
    filterOptions = getUniqueSubCategories();
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
      <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Arus Kas</h1> {/* Ganti label Transaksi */}
      <div className="flex gap-2 flex-wrap">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => {
              setFilterBy("all");
              setFilterValue(null);
            }}>
              Semua
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {
              setFilterBy("date");
              setFilterValue(null);
            }}>
              Tanggal
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {
              setFilterBy("category");
              setFilterValue(null);
            }}>
              Kategori
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => {
              setFilterBy("subCategory");
              setFilterValue(null);
            }}>
              Sub Kategori
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dropdown filter value */}
        {filterBy !== "all" && filterOptions.length > 0 && (
          <Select
            value={filterValue ?? ""}
            onValueChange={v => setFilterValue(v)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={
                filterBy === "date"
                  ? "Pilih Tanggal"
                  : filterBy === "category"
                    ? "Pilih Kategori"
                    : "Pilih Subkategori"
              } />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Urutkan
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setSortBy('date')}>
              Tanggal
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy('category')}>
              Kategori
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setSortBy('amount')}>
              Jumlah
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Ekspor
        </Button>
        <Button size="sm" onClick={onNewTransaction}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Arus Kas Baru
        </Button>
      </div>
    </div>
  );
};

export default TransactionToolbar;
