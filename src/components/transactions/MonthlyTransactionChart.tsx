
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Transaction } from "@/types";
import { formatRupiah } from "@/utils/formatters";
import { format } from "date-fns";

interface MonthlyTransactionChartProps {
  transactions: Transaction[];
}

// Group transactions by month and calculate total income and expense
const groupTransactionsByMonth = (transactions: Transaction[]) => {
  const monthMap: Record<string, { income: number; expense: number }> = {};
  
  transactions.forEach((transaction) => {
    const monthKey = transaction.date.slice(0, 7); // YYYY-MM format
    
    if (!monthMap[monthKey]) {
      monthMap[monthKey] = { income: 0, expense: 0 };
    }
    
    if (transaction.type === 'income') {
      monthMap[monthKey].income += transaction.amount;
    } else {
      monthMap[monthKey].expense += transaction.amount;
    }
  });
  
  // Convert to array and sort by month
  return Object.entries(monthMap)
    .map(([month, data]) => ({
      month,
      name: format(new Date(`${month}-01`), "MMM yyyy"),
      Pemasukan: data.income,
      Pengeluaran: data.expense,
      Saldo: data.income - data.expense
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

const MonthlyTransactionChart = ({ transactions }: MonthlyTransactionChartProps) => {
  const chartData = groupTransactionsByMonth(transactions);
  
  return (
    <ChartContainer 
      className="h-full"
      config={{
        Pemasukan: { color: "#00A67E" },
        Pengeluaran: { color: "#FF4444" },
        Saldo: { color: "#3B82F6" }
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`} 
          />
          <Tooltip 
            formatter={(value: number) => formatRupiah(value)}
            labelFormatter={(label) => `Bulan: ${label}`}
          />
          <Legend />
          <Bar dataKey="Pemasukan" name="Pemasukan" fill="var(--color-Pemasukan)" />
          <Bar dataKey="Pengeluaran" name="Pengeluaran" fill="var(--color-Pengeluaran)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MonthlyTransactionChart;
