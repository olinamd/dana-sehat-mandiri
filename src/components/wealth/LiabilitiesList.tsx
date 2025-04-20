
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/utils/formatters";
import { formatDate } from "@/utils/formatters";
import { Pencil, Trash2 } from "lucide-react";
import { Liability } from "@/types/assets";

interface LiabilitiesListProps {
  liabilities: Liability[];
  onEdit: (liability: Liability) => void;
  onDelete: (id: number) => void;
}

const LiabilitiesList = ({ liabilities, onEdit, onDelete }: LiabilitiesListProps) => {
  const liabilitiesByCategory = {
    'short-term': liabilities.filter(l => l.category === 'short-term'),
    'long-term': liabilities.filter(l => l.category === 'long-term'),
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Liabilitas</TableHead>
          <TableHead>Jenis</TableHead>
          <TableHead>Tanggal Jatuh Tempo</TableHead>
          <TableHead>Cicilan Per Bulan</TableHead>
          <TableHead className="text-right">Nilai</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(liabilitiesByCategory).map(([category, items]) => (
          items.length > 0 && (
            <>
              <TableRow key={category}>
                <TableCell colSpan={6} className="bg-muted/50 font-medium">
                  {category === 'short-term' ? 'Liabilitas Jangka Pendek' : 'Liabilitas Jangka Panjang'}
                </TableCell>
              </TableRow>
              {items.map((liability) => (
                <TableRow key={liability.id}>
                  <TableCell>{liability.name}</TableCell>
                  <TableCell>{liability.subcategory}</TableCell>
                  <TableCell>
                    {liability.dueDate ? formatDate(liability.dueDate) : '-'}
                  </TableCell>
                  <TableCell>
                    {liability.monthlyPayment ? formatRupiah(liability.monthlyPayment) : '-'}
                  </TableCell>
                  <TableCell className="text-right">{formatRupiah(liability.amount)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(liability)}
                        className="hover:bg-muted"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(liability.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )
        ))}
      </TableBody>
    </Table>
  );
};

export default LiabilitiesList;
