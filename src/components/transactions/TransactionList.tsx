
import { formatDate, formatRupiah } from "@/utils/formatters";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tanggal</TableHead>
          <TableHead>Deskripsi</TableHead>
          <TableHead>Kategori</TableHead>
          <TableHead className="text-right">Jumlah</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>{formatDate(transaction.date)}</TableCell>
            <TableCell>{transaction.description}</TableCell>
            <TableCell>{transaction.category}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionList;
