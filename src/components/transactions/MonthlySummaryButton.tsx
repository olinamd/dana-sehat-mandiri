
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Transaction } from "@/types";
import { formatRupiah } from "@/utils/formatters";

interface MonthlySummaryButtonProps {
  transactions: Transaction[];
}

function groupByMonth(transactions: Transaction[]) {
  const map: Record<string, { income: number; expense: number }> = {};
  transactions.forEach((t) => {
    // Extract only year and month (2023-03)
    const monthKey = t.date.slice(0, 7);
    if (!map[monthKey]) map[monthKey] = { income: 0, expense: 0 };
    if (t.type === "income") map[monthKey].income += t.amount;
    else map[monthKey].expense += t.amount;
  });
  return map;
}

const MonthlySummaryButton = ({ transactions }: MonthlySummaryButtonProps) => {
  const [open, setOpen] = useState(false);

  const monthlyData = groupByMonth(transactions);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          Lihat Ringkasan Penjumlahan Bulanan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Penjumlahan Arus Kas per Bulan</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto max-h-72">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-2 px-2">Bulan</th>
                <th className="text-right py-2 px-2">Pemasukan</th>
                <th className="text-right py-2 px-2">Pengeluaran</th>
                <th className="text-right py-2 px-2">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(monthlyData)
                .sort((a, b) => b[0].localeCompare(a[0]))
                .map(([month, { income, expense }]) => (
                  <tr key={month}>
                    <td className="py-1 px-2">{format(new Date(month + "-01"), "MMMM yyyy", { locale: id })}</td>
                    <td className="text-right py-1 px-2 text-dsm-green font-medium">{formatRupiah(income)}</td>
                    <td className="text-right py-1 px-2 text-destructive font-medium">{formatRupiah(expense)}</td>
                    <td className={`text-right py-1 px-2 font-semibold ${income - expense >= 0 ? "text-dsm-green" : "text-destructive"}`}>{formatRupiah(income - expense)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
};

export default MonthlySummaryButton;
