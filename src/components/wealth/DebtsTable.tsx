
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DebtItem } from "@/types/index";
import { formatRupiah, formatDate } from "@/utils/formatters";
import { Trash2 } from "lucide-react";

interface DebtsTableProps {
  debts: DebtItem[];
  onDelete: (id: number) => void;
}

export default function DebtsTable({ debts, onDelete }: DebtsTableProps) {
  const debtsByCategory = {
    'short-term': debts.filter(debt => debt.category === 'short-term'),
    'long-term': debts.filter(debt => debt.category === 'long-term'),
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Jenis</TableHead>
          <TableHead>Nama</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Sisa</TableHead>
          <TableHead>Angsuran Bulanan</TableHead>
          <TableHead>Jatuh Tempo</TableHead>
          <TableHead>Bunga</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(debtsByCategory).map(([category, items]) => (
          items.length > 0 && (
            <>
              <TableRow key={category}>
                <TableCell colSpan={9} className="bg-muted/50 font-medium">
                  {category === 'short-term' ? 'Hutang Jangka Pendek' : 'Hutang Jangka Panjang'}
                </TableCell>
              </TableRow>
              {items.map((debt) => (
                <TableRow key={debt.id}>
                  <TableCell>{debt.subcategory}</TableCell>
                  <TableCell className="font-medium">{debt.name}</TableCell>
                  <TableCell>{formatRupiah(debt.total)}</TableCell>
                  <TableCell>{formatRupiah(debt.remaining)}</TableCell>
                  <TableCell>{formatRupiah(debt.monthlyPayment)}</TableCell>
                  <TableCell>{formatDate(debt.dueDate)}</TableCell>
                  <TableCell>{debt.interestRate}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${debt.remaining > 0 ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                      <span className="text-xs">{debt.remaining > 0 ? 'Aktif' : 'Lunas'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(debt.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )
        ))}
      </TableBody>
    </Table>
  );
}
