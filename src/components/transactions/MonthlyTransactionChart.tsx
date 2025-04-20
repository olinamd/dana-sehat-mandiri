
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "@/types";
import { formatRupiah } from "@/utils/formatters";

interface MonthlyTransactionChartProps {
  transactions: Transaction[];
}

const MonthlyTransactionChart = ({ transactions }: MonthlyTransactionChartProps) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const data = [
    { name: 'Pemasukan', amount: totalIncome },
    { name: 'Pengeluaran', amount: totalExpense },
  ];

  // Custom tooltip content function
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
          <p className="text-sm font-medium">{payload[0].payload.name}</p>
          <p className="text-sm text-gray-700">{formatRupiah(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer 
      className="h-[300px]"
      config={{
        income: { color: "#00A67E" },
        expense: { color: "#FF4444" },
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="amount" 
            fill="var(--color-income)" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MonthlyTransactionChart;
