
import { Button } from "@/components/ui/button";
import { Filter, Download, PlusCircle } from "lucide-react";

interface TransactionToolbarProps {
  onNewTransaction: () => void;
}

const TransactionToolbar = ({ onNewTransaction }: TransactionToolbarProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Transaksi</h1>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
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
