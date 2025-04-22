
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/types";
import CategoryGroup from "./CategoryGroup";
import { groupTransactionsByCategory, getCategoryGroup } from "./transactionUtils";

interface MonthlyTransactionsProps {
  month: string;
  transactions: Transaction[];
  expandedCategories: Record<string, boolean>;
  onToggleCategory: (category: string) => void;
  onDeleteTransaction: (id: number) => void;
  formattedMonth: string;
}

const MonthlyTransactions = ({
  month,
  transactions,
  expandedCategories,
  onToggleCategory,
  onDeleteTransaction,
  formattedMonth
}: MonthlyTransactionsProps) => {
  const groupedByCategory = groupTransactionsByCategory(transactions);

  return (
    <div key={month} className="mb-6">
      <div className="font-bold text-lg py-2 px-2 bg-muted sticky top-0 z-10">
        {formattedMonth}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Deskripsi</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Sub Kategori</TableHead>
            <TableHead className="text-right">Jumlah</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(groupedByCategory).map(([mainCategory, subCategories]) => (
            <CategoryGroup
              key={mainCategory}
              mainCategory={mainCategory}
              subCategories={subCategories}
              isExpanded={expandedCategories[mainCategory + month] || false}
              onToggle={() => onToggleCategory(mainCategory + month)}
              onDeleteTransaction={onDeleteTransaction}
              categoryGroup={getCategoryGroup(mainCategory, "")}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MonthlyTransactions;
