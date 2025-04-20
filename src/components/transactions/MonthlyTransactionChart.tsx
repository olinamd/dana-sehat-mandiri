
import { ChartContainer } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "@/types";
import { formatRupiah } from "@/utils/formatters";

interface MonthlyTransactionChartProps {
  transactions: Transaction[];
}

const MonthlyTransactionChart = ({ transactions }: MonthlyTransactionChartProps) => {
  // Group transactions by category and subcategory
  const categoryData = transactions.reduce((acc, t) => {
    const key = `${t.mainCategory} - ${t.subCategory}`;
    if (!acc[key]) {
      acc[key] = {
        name: key,
        income: 0,
        expense: 0,
      };
    }
    if (t.type === 'income') {
      acc[key].income += t.amount;
    } else {
      acc[key].expense += t.amount;
    }
    return acc;
  }, {} as Record<string, { name: string; income: number; expense: number; }>);

  const data = Object.values(categoryData);

  return (
    <ChartContainer 
      className="h-[300px] mt-8" // Added mt-8 to push the graph lower and reduced height
      config={{
        income: { color: "#00A67E" },
        expense: { color: "#FF4444" },
      }}
    >
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={100}
            interval={0}
          />
          <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`} />
          <Tooltip
            formatter={(value: number) => formatRupiah(value)}
            labelFormatter={(label) => {
              const [mainCategory, subCategory] = label.split(' - ');
              return (
                <div>
                  <div><strong>Kategori:</strong> {mainCategory}</div>
                  <div><strong>Subkategori:</strong> {subCategory}</div>
                </div>
              );
            }}
          />
          <Bar dataKey="income" name="Pemasukan" fill="var(--color-income)" />
          <Bar dataKey="expense" name="Pengeluaran" fill="var(--color-expense)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MonthlyTransactionChart;
