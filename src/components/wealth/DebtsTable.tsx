
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DebtItem } from "@/types/index";
import { formatRupiah, formatDate } from "@/utils/formatters";

interface DebtsTableProps {
  debts: DebtItem[];
}

export default function DebtsTable({ debts }: DebtsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Sisa</TableHead>
          <TableHead>Angsuran Bulanan</TableHead>
          <TableHead>Jatuh Tempo</TableHead>
          <TableHead>Bunga</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debts.map((debt) => (
          <TableRow key={debt.id}>
            <TableCell className="font-medium">{debt.name}</TableCell>
            <TableCell>{formatRupiah(debt.total)}</TableCell>
            <TableCell>{formatRupiah(debt.remaining)}</TableCell>
            <TableCell>{formatRupiah(debt.monthlyPayment)}</TableCell>
            <TableCell>{formatDate(debt.dueDate)}</TableCell>
            <TableCell>{debt.interestRate}%</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                <span className="text-xs">Aktif</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
