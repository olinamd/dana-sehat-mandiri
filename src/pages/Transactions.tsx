
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionForm from "@/components/forms/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionToolbar from "@/components/transactions/TransactionToolbar";
import { useTransactions } from "@/hooks/useTransactions";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import MonthlyCashFlowSummary from "@/components/transactions/MonthlyCashFlowSummary";

export default function Transactions() {
  const {
    showForm,
    setShowForm,
    filteredTransactions,
    transactions,
    deleteTransaction,
    addTransaction,
    setSortBy,
    setFilterBy,
    filterBy,
    filterValue,
    setFilterValue,
    getUniqueDates,
    getUniqueCategories,
    getUniqueSubCategories,
  } = useTransactions();

  // Month selection state
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Helper to get transactions for selected month
  const getTransactionsBySelectedMonth = (type?: "income" | "expense") => {
    const transactions = filteredTransactions(type);
    if (!selectedDate) return transactions;
    const ym = format(selectedDate, "yyyy-MM");
    return transactions.filter((t) => t.date.startsWith(ym));
  };

  // Render month as "MMMM yyyy" in Indonesian
  const monthLabel =
    selectedDate &&
    format(selectedDate, "MMMM yyyy", { locale: undefined /* id if installed */ });

  return (
    <div className="space-y-6">
      <TransactionToolbar
        onNewTransaction={() => setShowForm(true)}
        setSortBy={setSortBy}
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        getUniqueDates={getUniqueDates}
        getUniqueCategories={getUniqueCategories}
        getUniqueSubCategories={getUniqueSubCategories}
      />

      <div className="flex items-center gap-2 mb-2">
        <span className="font-medium">Bulan Penginputan:</span>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[175px] pl-3 text-left font-normal"
            >
              {selectedDate ? (
                <span>
                  <CalendarIcon className="h-4 w-4 mr-2 inline" />
                  {format(selectedDate, "MMMM yyyy", { locale: undefined /* id if installed */ })}
                </span>
              ) : (
                <span>
                  <CalendarIcon className="h-4 w-4 mr-2 inline" />
                  Pilih Bulan
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate || undefined}
              onSelect={(date) => date && setSelectedDate(date)}
              initialFocus
              className="p-3 pointer-events-auto"
              // Enable only to pick the month
              captionLayout="dropdown-buttons"
              fromYear={2022}
              toYear={2050}
              // Render only month and year pickers, days not needed
              showOutsideDays={false}
              // Style for month-only picker: may require custom
            />
          </PopoverContent>
        </Popover>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Tambah Arus Kas Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm onClose={() => setShowForm(false)} addTransaction={addTransaction} />
          </CardContent>
        </Card>
      ) : (
        <>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="income">Pemasukan</TabsTrigger>
              <TabsTrigger value="expense">Pengeluaran</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Card>
                <CardContent className="p-0">
                  <TransactionList
                    transactions={getTransactionsBySelectedMonth()}
                    onDeleteTransaction={deleteTransaction}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="income">
              <Card>
                <CardContent className="p-0">
                  <TransactionList
                    transactions={getTransactionsBySelectedMonth("income")}
                    onDeleteTransaction={deleteTransaction}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="expense">
              <Card>
                <CardContent className="p-0">
                  <TransactionList
                    transactions={getTransactionsBySelectedMonth("expense")}
                    onDeleteTransaction={deleteTransaction}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Add the monthly cash flow summary component */}
          <MonthlyCashFlowSummary transactions={transactions} />
        </>
      )}
    </div>
  );
}
