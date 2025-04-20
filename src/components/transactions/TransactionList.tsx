import React, { useState } from "react";
import { formatDate, formatRupiah } from "@/utils/formatters";
import { ArrowUpRight, ArrowDownLeft, Trash2, ChevronRight, ChevronDown } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Transaction } from "@/types";
import MonthlyFullSummaryButton from "./MonthlyFullSummaryButton";
import { cashFlowCategories } from "@/utils/transactionCategories";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: number) => void;
  showMonthlySummaryButton?: boolean;
}

// Function to group transactions by category and subcategory
const groupTransactionsByCategory = (transactions: Transaction[]) => {
  const grouped: Record<string, Record<string, Transaction[]>> = {};
  
  transactions.forEach(transaction => {
    if (!grouped[transaction.mainCategory]) {
      grouped[transaction.mainCategory] = {};
    }
    
    if (!grouped[transaction.mainCategory][transaction.subCategory]) {
      grouped[transaction.mainCategory][transaction.subCategory] = [];
    }
    
    grouped[transaction.mainCategory][transaction.subCategory].push(transaction);
  });
  
  return grouped;
};

// Function to check if a transaction's category matches Need/Want/Save groupings
const getCategoryGroup = (mainCategory: string, subCategory: string): "Need" | "Want" | "Save" | null => {
  // Check Need categories
  const needPrefix = ["Need - Tetap", "Need - Tidak Tetap"];
  if (needPrefix.some(prefix => mainCategory.startsWith(prefix))) {
    return "Need";
  }
  
  // Check Want categories
  const wantPrefix = ["Want", "Want - Hiburan", "Want - Sosial"];
  if (wantPrefix.some(prefix => mainCategory.startsWith(prefix))) {
    return "Want";
  }
  
  // Check Save categories
  const savePrefix = ["Save", "Save - Investasi"];
  if (savePrefix.some(prefix => mainCategory.startsWith(prefix))) {
    return "Save";
  }
  
  return null;
};

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

  // Group transactions by month then by category
  const groupTransactionsByMonth = (transactions: Transaction[]) => {
    const monthMap: Record<string, Transaction[]> = {};
    transactions.forEach((t) => {
      const monthKey = t.date.slice(0, 7); // yyyy-mm
      if (!monthMap[monthKey]) monthMap[monthKey] = [];
      monthMap[monthKey].push(t);
    });
    // Sort months descending (most recent first)
    return Object.entries(monthMap).sort((a, b) => b[0].localeCompare(a[0]));
  };

  const monthsGrouped = groupTransactionsByMonth(transactions);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="font-semibold text-base">Riwayat Arus Kas</div>
        {/* Show the monthly summary button */}
        <MonthlyFullSummaryButton transactions={transactions} />
      </div>
      {/* Wrap table in a scroll area, set a max-height */}
      <div className="rounded-md border max-h-[400px] overflow-auto">
        <ScrollArea className="h-full w-full">
          <div>
            {monthsGrouped.length === 0 && (
              <div className="text-center py-8 text-gray-400">Belum ada transaksi</div>
            )}
            {monthsGrouped.map(([month, monthTransactions]) => {
              // Get formatted month name (e.g., "April 2025")
              const monthDate = new Date(month + "-01T00:00:00");
              const formattedMonth = monthDate.toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
              });

              // Group for this month
              const groupedByCategory = groupTransactionsByCategory(monthTransactions);

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
                      {Object.entries(groupedByCategory).map(([mainCategory, subCategories]) => {
                        // Calculate total for this main category
                        const categoryTotal = Object.values(subCategories)
                          .flat()
                          .reduce((sum, t) => sum + t.amount, 0);
                        
                        const isExpanded = expandedCategories[mainCategory + month] || false;
                        const categoryGroup = getCategoryGroup(mainCategory, "");
                        
                        return (
                          <React.Fragment key={mainCategory}>
                            <TableRow 
                              className={
                                categoryGroup === "Need" 
                                  ? "bg-red-50" 
                                  : categoryGroup === "Want" 
                                    ? "bg-yellow-50" 
                                    : categoryGroup === "Save" 
                                      ? "bg-green-50" 
                                      : "bg-gray-50"
                              }
                            >
                              <TableCell colSpan={4}>
                                <button 
                                  onClick={() => toggleCategory(mainCategory + month)}
                                  className="flex items-center font-medium"
                                >
                                  {isExpanded ? <ChevronDown className="h-4 w-4 mr-1" /> : <ChevronRight className="h-4 w-4 mr-1" />}
                                  {mainCategory}
                                </button>
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {formatRupiah(categoryTotal)}
                              </TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                            
                            {isExpanded && Object.entries(subCategories).map(([subCategory, transactions]) => {
                              // Calculate subtotal for this subcategory
                              const subCategoryTotal = transactions.reduce((sum, t) => sum + t.amount, 0);
                              
                              return (
                                <React.Fragment key={`${mainCategory}-${subCategory}`}>
                                  <TableRow className="bg-muted/30">
                                    <TableCell className="pl-8" colSpan={3}></TableCell>
                                    <TableCell className="font-medium">{subCategory}</TableCell>
                                    <TableCell className="text-right font-medium">
                                      {formatRupiah(subCategoryTotal)}
                                    </TableCell>
                                    <TableCell></TableCell>
                                  </TableRow>
                                  
                                  {transactions.map((transaction) => (
                                    <TableRow key={transaction.id} className="hover:bg-muted/50">
                                      <TableCell className="pl-12">{formatDate(transaction.date)}</TableCell>
                                      <TableCell>{transaction.description}</TableCell>
                                      <TableCell></TableCell>
                                      <TableCell></TableCell>
                                      <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                          {transaction.type === "income" ? (
                                            <ArrowUpRight className="h-4 w-4 text-dsm-green" />
                                          ) : (
                                            <ArrowDownLeft className="h-4 w-4 text-destructive" />
                                          )}
                                          <span className={transaction.type === "income" ? "text-dsm-green" : "text-destructive"}>
                                            {formatRupiah(transaction.amount)}
                                          </span>
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-right">
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          onClick={() => handleDelete(transaction.id)}
                                          className="text-destructive hover:bg-destructive/10"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </React.Fragment>
                              );
                            })}
                          </React.Fragment>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TransactionList;
