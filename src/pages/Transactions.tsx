import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionForm from "@/components/forms/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionToolbar from "@/components/transactions/TransactionToolbar";
import MonthlyTransactionTable from "@/components/transactions/MonthlyTransactionTable";
import MonthlyTransactionChart from "@/components/transactions/MonthlyTransactionChart";
import { useTransactions } from "@/hooks/useTransactions";

const Transactions = () => {
  const { 
    showForm, 
    setShowForm, 
    filteredTransactions, 
    deleteTransaction 
  } = useTransactions();

  return (
    <div className="space-y-6">
      <TransactionToolbar onNewTransaction={() => setShowForm(true)} />

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Tambah Transaksi Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm onClose={() => setShowForm(false)} />
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
                    transactions={filteredTransactions()} 
                    onDeleteTransaction={deleteTransaction}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="income">
              <Card>
                <CardContent className="p-0">
                  <TransactionList 
                    transactions={filteredTransactions('income')} 
                    onDeleteTransaction={deleteTransaction}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="expense">
              <Card>
                <CardContent className="p-0">
                  <TransactionList 
                    transactions={filteredTransactions('expense')} 
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
                <MonthlyTransactionTable transactions={filteredTransactions()} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Grafik Transaksi</CardTitle>
              </CardHeader>
              <CardContent>
                <MonthlyTransactionChart transactions={filteredTransactions()} />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Transactions;
