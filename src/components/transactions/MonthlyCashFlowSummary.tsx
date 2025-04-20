
import { Transaction } from "@/types";
import { format } from "date-fns";
import { formatRupiah } from "@/utils/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonthlyTransactionTable from "./MonthlyTransactionTable";
import MonthlyTransactionChart from "./MonthlyTransactionChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MonthlyCashFlowSummaryProps {
  transactions: Transaction[];
}

// Helper function to group transactions by month (YYYY-MM)
const groupTransactionsByMonth = (transactions: Transaction[]) => {
  const monthMap: Record<string, Transaction[]> = {};
  
  transactions.forEach((transaction) => {
    const monthKey = transaction.date.slice(0, 7); // YYYY-MM format
    if (!monthMap[monthKey]) {
      monthMap[monthKey] = [];
    }
    monthMap[monthKey].push(transaction);
  });
  
  // Return months sorted in descending order (most recent first)
  return Object.entries(monthMap)
    .sort((a, b) => b[0].localeCompare(a[0]));
};

const MonthlyCashFlowSummary = ({ transactions }: MonthlyCashFlowSummaryProps) => {
  const monthlyGroups = groupTransactionsByMonth(transactions);
  
  if (transactions.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Ringkasan Arus Kas Bulanan</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">Belum ada transaksi untuk ditampilkan</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Ringkasan Arus Kas Bulanan</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="table" className="space-y-4">
          <TabsList>
            <TabsTrigger value="table">Tabel Ringkasan</TabsTrigger>
            <TabsTrigger value="chart">Grafik Perbandingan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="table" className="space-y-4">
            {monthlyGroups.map(([month, monthTransactions]) => {
              const monthDate = new Date(`${month}-01`);
              const monthName = format(monthDate, "MMMM yyyy");
              
              return (
                <div key={month} className="space-y-2">
                  <h3 className="font-medium text-md">{monthName}</h3>
                  <MonthlyTransactionTable transactions={monthTransactions} />
                </div>
              );
            })}
          </TabsContent>
          
          <TabsContent value="chart">
            <div className="h-[400px]">
              <MonthlyTransactionChart transactions={transactions} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MonthlyCashFlowSummary;
