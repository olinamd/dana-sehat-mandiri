
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ReceivableItem } from "@/types/index";
import { formatRupiah, formatDate } from "@/utils/formatters";
import { Trash2 } from "lucide-react";

interface ReceivablesTableProps {
  receivables: ReceivableItem[];
  onDelete?: (id: number) => void;
  onNameClick?: (receivable: ReceivableItem) => void;
}

export default function ReceivablesTable({ receivables, onDelete, onNameClick }: ReceivablesTableProps) {
  // Track which info/detail is open
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama</TableHead>
          <TableHead>Jumlah</TableHead>
          <TableHead>Jatuh Tempo</TableHead>
          <TableHead>Catatan</TableHead>
          <TableHead>Status</TableHead>
          {onDelete && <TableHead>Aksi</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {receivables.map((receivable) => (
          <>
            <TableRow key={receivable.id}>
              <TableCell
                className="font-medium cursor-pointer text-primary underline"
                onClick={() => {
                  setOpenId(openId === receivable.id ? null : receivable.id);
                  if (onNameClick) onNameClick(receivable);
                }}
              >
                {receivable.name}
              </TableCell>
              <TableCell>{formatRupiah(receivable.amount)}</TableCell>
              <TableCell>{formatDate(receivable.dueDate)}</TableCell>
              <TableCell>{receivable.notes}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-dsm-green"></div>
                  <span className="text-xs">Belum Jatuh Tempo</span>
                </div>
              </TableCell>
              {onDelete && (
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(receivable.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
            {openId === receivable.id && (
              <TableRow>
                <TableCell colSpan={6} className="bg-muted/50">
                  <div className="flex flex-col md:flex-row md:gap-6 gap-2 p-2 text-sm">
                    <div><b>Alamat:</b> {receivable.address || '-'}</div>
                    <div><b>Telp:</b> {receivable.phone || '-'}</div>
                    <div><b>Email:</b> {receivable.email || '-'}</div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  );
}
