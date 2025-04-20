
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    Pemasukan: 12500000,
    Pengeluaran: 8200000,
  },
  {
    name: 'Feb',
    Pemasukan: 12750000,
    Pengeluaran: 8150000,
  },
  {
    name: 'Mar',
    Pemasukan: 13000000,
    Pengeluaran: 8610000,
  },
];

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const IncomeExpenseChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `${value / 1000000}jt`} />
        <Tooltip formatter={(value) => formatRupiah(Number(value))} />
        <Legend />
        <Bar dataKey="Pemasukan" fill="#007BFF" />
        <Bar dataKey="Pengeluaran" fill="#DC3545" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeExpenseChart;
