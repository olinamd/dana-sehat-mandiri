
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionForm from "@/components/forms/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import TransactionToolbar from "@/components/transactions/TransactionToolbar";
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
      )}
    </div>
  );
};

export default Transactions;
