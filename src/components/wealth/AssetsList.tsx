
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatRupiah } from "@/utils/formatters";
import { Pencil, Trash2 } from "lucide-react";
import { Asset } from "@/types/assets";

interface AssetsListProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: number) => void;
}

const AssetsList = ({ assets, onEdit, onDelete }: AssetsListProps) => {
  const assetsByCategory = {
    liquid: assets.filter(a => a.category === 'liquid'),
    investment: assets.filter(a => a.category === 'investment'),
    personal: assets.filter(a => a.category === 'personal'),
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nama Aset</TableHead>
          <TableHead className="text-right">Nilai</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(assetsByCategory).map(([category, items]) => (
          items.length > 0 && (
            <>
              <TableRow key={category}>
                <TableCell colSpan={3} className="bg-muted/50 font-medium">
                  {category === 'liquid' && 'Aset Likuid'}
                  {category === 'investment' && 'Aset Investasi'}
                  {category === 'personal' && 'Aset Penggunaan Pribadi'}
                </TableCell>
              </TableRow>
              {items.map((asset) => (
                <TableRow key={asset.id}>
                  <TableCell>{asset.subcategory}</TableCell>
                  <TableCell className="text-right">{formatRupiah(asset.amount)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(asset)}
                        className="hover:bg-muted"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(asset.id)}
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

export default AssetsList;
