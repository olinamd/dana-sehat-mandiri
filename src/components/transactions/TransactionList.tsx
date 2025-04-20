
import { formatDate, formatRupiah } from "@/utils/formatters";
import { ArrowUpRight, ArrowDownLeft, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Transaction } from "@/types";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: number) => void;
}

const TransactionList = ({ transactions, onDeleteTransaction }: TransactionListProps) => {
  const handleDelete = (id: number) => {
    onDeleteTransaction(id);
    toast.success("Transaksi berhasil dihapus");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead className="text-right">Jumlah</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{formatDate(transaction.date)}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.mainCategory}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                {transaction.type === "income" ? (
                  <ArrowUpRight className="h-4 w-4 text-dsm-green" />
                ) : (
                  <ArrowDownLeft className="h-4 w-4 text-destructive" />
                )}
                <span className={transaction.type === "income" ? "text-dsm-green" : "text-destructive"}>
                  {formatRupiah(transaction.amount)}
                </span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleDelete(transaction.id)}
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionList;
