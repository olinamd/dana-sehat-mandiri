
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ReceivableItem } from "@/types/index";
import { formatRupiah, formatDate } from "@/utils/formatters";

interface ReceivablesTableProps {
  receivables: ReceivableItem[];
}

export default function ReceivablesTable({ receivables }: ReceivablesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Jatuh Tempo</TableHead>
          <TableHead>Catatan</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {receivables.map((receivable) => (
          <TableRow key={receivable.id}>
            <TableCell className="font-medium">{receivable.name}</TableCell>
            <TableCell>{formatRupiah(receivable.amount)}</TableCell>
            <TableCell>{formatDate(receivable.dueDate)}</TableCell>
            <TableCell>{receivable.notes}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-dsm-green"></div>
                <span className="text-xs">Belum Jatuh Tempo</span>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
