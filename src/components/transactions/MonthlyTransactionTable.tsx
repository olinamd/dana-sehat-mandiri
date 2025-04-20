
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatRupiah } from "@/utils/formatters";
import { Transaction } from "@/types";

interface MonthlyTransactionTableProps {
  transactions: Transaction[];
}

const MonthlyTransactionTable = ({ transactions }: MonthlyTransactionTableProps) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Jenis</TableHead>
          <TableHead className="text-right">Jumlah</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Total Pemasukan</TableCell>
          <TableCell className="text-right text-dsm-green">
            {formatRupiah(totalIncome)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Pengeluaran</TableCell>
          <TableCell className="text-right text-destructive">
            {formatRupiah(totalExpense)}
          </TableCell>
        </TableRow>
        <TableRow className="font-medium">
          <TableCell>Saldo</TableCell>
          <TableCell className={`text-right ${balance >= 0 ? 'text-dsm-green' : 'text-destructive'}`}>
            {formatRupiah(balance)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default MonthlyTransactionTable;
