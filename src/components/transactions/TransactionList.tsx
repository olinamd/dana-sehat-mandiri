
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

  // Group transactions by type and category
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const { type, mainCategory, subCategory } = transaction;
    if (!acc[type]) acc[type] = {};
    if (!acc[type][mainCategory]) acc[type][mainCategory] = {};
    if (!acc[type][mainCategory][subCategory]) {
      acc[type][mainCategory][subCategory] = {
        transactions: [],
        total: 0,
      };
    }
    
    acc[type][mainCategory][subCategory].transactions.push(transaction);
    acc[type][mainCategory][subCategory].total += transaction.amount;
    return acc;
  }, {} as Record<string, Record<string, Record<string, { transactions: Transaction[], total: number }>>>);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead>Sub Kategori</TableHead>
          <TableHead className="text-right">Jumlah</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(groupedTransactions).map(([type, categories]) => (
          Object.entries(categories).map(([category, subCategories]) => (
            Object.entries(subCategories).map(([subCategory, data], index) => (
              <>
                {index === 0 && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={3} className="font-medium">
                      {category}
                    </TableCell>
                    <TableCell colSpan={3} className="text-right font-medium">
                      {formatRupiah(
                        Object.values(subCategories).reduce((sum, data) => sum + data.total, 0)
                      )}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={3} className="pl-6">
                    {subCategory}
                  </TableCell>
                  <TableCell colSpan={3} className="text-right">
                    {formatRupiah(data.total)}
                  </TableCell>
                </TableRow>
                {data.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.mainCategory}</TableCell>
                    <TableCell>{transaction.subCategory}</TableCell>
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
              </>
            ))
          ))
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionList;
