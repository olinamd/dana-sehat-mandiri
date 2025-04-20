
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionForm from "@/components/forms/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionToolbar from "@/components/transactions/TransactionToolbar";
import MonthlyTransactionTable from "@/components/transactions/MonthlyTransactionTable";
import MonthlyTransactionChart from "@/components/transactions/MonthlyTransactionChart";
import MonthlyFullSummaryButton from "@/components/transactions/MonthlyFullSummaryButton";
import { useTransactions } from "@/hooks/useTransactions";
import { useState } from "react";

const Transactions = () => {
  // Semua state di sini saja (ONE source of truth!)
  const {
    showForm,
    setShowForm,
    filteredTransactions,
    deleteTransaction,
    addTransaction,
    setSortBy,
    setFilterBy,
    filterBy,
    filterValue,
    setFilterValue,
    getUniqueDates,
    getUniqueCategories,
    getUniqueSubCategories
  } = useTransactions();
  
  // Add state for selected month
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  // Get all transactions, then we'll filter by month as needed
  const allTransactions = filteredTransactions();
  
  // Helper function to filter transactions by month if a month is selected
  const getTransactionsByMonth = (type?: 'income' | 'expense') => {
    const transactions = filteredTransactions(type);
    if (!selectedMonth) return transactions;
    
    return transactions.filter(t => t.date.startsWith(selectedMonth));
  };

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

      <div className="flex flex-wrap gap-4 items-center mb-2">
        <MonthlyFullSummaryButton 
          transactions={allTransactions} 
          onMonthChange={(month) => setSelectedMonth(month)} 
        />
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Tambah Arus Kas Baru</CardTitle> {/* Ganti label */}
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
                    transactions={getTransactionsByMonth()} 
                    onDeleteTransaction={deleteTransaction}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="income">
              <Card>
                <CardContent className="p-0">
                  <TransactionList 
                    transactions={getTransactionsByMonth('income')} 
                    onDeleteTransaction={deleteTransaction}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="expense">
              <Card>
                <CardContent className="p-0">
                  <TransactionList 
                    transactions={getTransactionsByMonth('expense')} 
                    onDeleteTransaction={deleteTransaction}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Ringkasan Bulan Ini</CardTitle>
              </CardHeader>
              <CardContent>
                <MonthlyTransactionTable 
                  transactions={getTransactionsByMonth()} 
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Grafik Arus Kas</CardTitle> {/* Ganti label */}
              </CardHeader>
              <CardContent>
                <MonthlyTransactionChart 
                  transactions={getTransactionsByMonth()} 
                />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
