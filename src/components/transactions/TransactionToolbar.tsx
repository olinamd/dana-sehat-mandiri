
import { Button } from "@/components/ui/button";
import { Filter, Download, PlusCircle, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransactions } from "@/hooks/useTransactions";

interface TransactionToolbarProps {
  onNewTransaction: () => void;
}

const TransactionToolbar = ({ onNewTransaction }: TransactionToolbarProps) => {
  const { setSortBy, setFilterBy } = useTransactions();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Transaksi</h1>
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setFilterBy('all')}>
              Semua
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilterBy('date')}>
              Tanggal
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilterBy('category')}>
              Kategori
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setFilterBy('subCategory')}>
              Sub Kategori
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
          Transaksi Baru
        </Button>
      </div>
    </div>
  );
};

export default TransactionToolbar;
