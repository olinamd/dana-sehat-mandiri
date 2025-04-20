
import { useState } from "react";

const mockTransactions = [
  {
    id: 1,
    date: "2023-03-15",
    description: "Gaji Dokter Spesialis",
    amount: 15000000,
    category: "Pendapatan",
    type: "income" as const,
  },
  {
    id: 2,
    date: "2023-03-02",
    description: "Pembayaran Sewa Apartemen",
    amount: 3500000,
    category: "Perumahan",
    type: "expense" as const,
  },
  {
    id: 3,
    date: "2023-03-05",
    description: "Belanja Bulanan",
    amount: 1200000,
    category: "Makanan",
    type: "expense" as const,
  },
  {
    id: 4,
    date: "2023-03-10",
    description: "Praktek Tambahan",
    amount: 2500000,
    category: "Pendapatan",
    type: "income" as const,
  },
  {
    id: 5,
    date: "2023-03-12",
    description: "Tagihan Listrik",
    amount: 750000,
    category: "Utilitas",
    type: "expense" as const,
  },
];

export const useTransactions = () => {
  const [showForm, setShowForm] = useState(false);
  const [transactions] = useState(mockTransactions);

  const filteredTransactions = (type?: 'income' | 'expense') => {
    if (!type) return transactions;
    return transactions.filter(t => t.type === type);
  };

  return {
    transactions,
    showForm,
    setShowForm,
    filteredTransactions,
  };
};
