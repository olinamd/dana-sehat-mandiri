
import { useState } from "react";
import { Transaction } from "@/types";

const mockTransactions: Transaction[] = [
  {
    id: 1,
    date: "2023-03-15",
    description: "Gaji Dokter Spesialis",
    amount: 15000000,
    type: "income" as const,
    mainCategory: "Pendapatan",
    subCategory: "Gaji Kerja",
  },
  {
    id: 2,
    date: "2023-03-02",
    description: "Pembayaran Sewa Apartemen",
    amount: 3500000,
    type: "expense" as const,
    mainCategory: "Perumahan",
    subCategory: "Sewa",
  },
  {
    id: 3,
    date: "2023-03-05",
    description: "Belanja Bulanan",
    amount: 1200000,
    type: "expense" as const,
    mainCategory: "Makanan",
    subCategory: "Belanja Basah",
  },
  {
    id: 4,
    date: "2023-03-10",
    description: "Praktek Tambahan",
    amount: 2500000,
    type: "income" as const,
    mainCategory: "Pendapatan",
    subCategory: "Kerja Sampingan",
  },
  {
    id: 5,
    date: "2023-03-12",
    description: "Tagihan Listrik",
    amount: 750000,
    type: "expense" as const,
    mainCategory: "Utilitas",
    subCategory: "Listrik",
  },
];

export const useTransactions = () => {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [sortBy, setSortBy] = useState<'date' | 'category' | 'amount'>('date');
  const [filterBy, setFilterBy] = useState<'all' | 'date' | 'category' | 'subCategory'>('all');

  const filteredTransactions = (type?: 'income' | 'expense') => {
    let filtered = transactions;
    
    if (type) {
      filtered = filtered.filter(t => t.type === type);
    }

    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'category':
          return a.mainCategory.localeCompare(b.mainCategory);
        case 'amount':
          return b.amount - a.amount;
        default:
          return 0;
      }
    });

    return filtered;
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prevTransactions => 
      prevTransactions.filter(transaction => transaction.id !== id)
    );
  };

  return {
    transactions,
    showForm,
    setShowForm,
    filteredTransactions,
    deleteTransaction,
    setSortBy,
    setFilterBy,
  };
};
