
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Transaction } from "@/types";

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

  return (
    <ChartContainer 
      className="h-[300px]"
      config={{
        income: { color: "#00A67E" },
        expense: { color: "#FF4444" },
      }}
    >
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis 
          tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
        />
        <ChartTooltip>
          <ChartTooltipContent />
        </ChartTooltip>
        <Bar 
          dataKey="amount" 
          fill="var(--color-income)" 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default MonthlyTransactionChart;
