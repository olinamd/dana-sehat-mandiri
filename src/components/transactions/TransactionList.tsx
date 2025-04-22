
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Transaction } from "@/types";
import { toast } from "sonner";
import MonthlyFullSummaryButton from "./MonthlyFullSummaryButton";
import MonthlyTransactions from "./MonthlyTransactions";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: number) => void;
  showMonthlySummaryButton?: boolean;
}

const TransactionList = ({ transactions, onDeleteTransaction, showMonthlySummaryButton }: TransactionListProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  
  const handleDelete = (id: number) => {
    onDeleteTransaction(id);
    toast.success("Arus Kas berhasil dihapus");
  };
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Group transactions by month
  const groupTransactionsByMonth = (transactions: Transaction[]) => {
    const monthMap: Record<string, Transaction[]> = {};
    transactions.forEach((t) => {
      const monthKey = t.date.slice(0, 7); // yyyy-mm
      if (!monthMap[monthKey]) monthMap[monthKey] = [];
      monthMap[monthKey].push(t);
    });
    return Object.entries(monthMap).sort((a, b) => b[0].localeCompare(a[0]));
  };

  const monthsGrouped = groupTransactionsByMonth(transactions);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-base">Riwayat Arus Kas</div>
        <MonthlyFullSummaryButton transactions={transactions} />
      </div>
      <div className="rounded-md border max-h-[400px] overflow-auto">
        <ScrollArea className="h-full w-full">
          <div>
            {monthsGrouped.length === 0 && (
              <div className="text-center py-8 text-gray-400">Belum ada transaksi</div>
            )}
            {monthsGrouped.map(([month, monthTransactions]) => {
              const monthDate = new Date(month + "-01T00:00:00");
              const formattedMonth = monthDate.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
              });

              return (
                <MonthlyTransactions
                  key={month}
                  month={month}
                  transactions={monthTransactions}
                  expandedCategories={expandedCategories}
                  onToggleCategory={toggleCategory}
                  onDeleteTransaction={handleDelete}
                  formattedMonth={formattedMonth}
                />
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TransactionList;
