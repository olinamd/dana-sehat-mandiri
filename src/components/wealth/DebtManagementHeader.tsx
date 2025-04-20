
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface DebtManagementHeaderProps {
  onAddNew: () => void;
}

export const DebtManagementHeader = ({ onAddNew }: DebtManagementHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Neraca Keuangan</h1> {/* Ubah Hutang & Piutang */}
      <div className="flex gap-2">
        <Button size="sm" onClick={onAddNew}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Baru
        </Button>
      </div>
    </div>
  );
};
