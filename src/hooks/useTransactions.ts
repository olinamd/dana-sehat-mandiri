
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
    mainCategory: "Need - Tetap",
    subCategory: "Rumah - Air",
  },
  {
    id: 3,
    date: "2023-03-05",
    description: "Belanja Bulanan",
    amount: 1200000,
    type: "expense" as const,
    mainCategory: "Need - Tidak Tetap",
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
    mainCategory: "Need - Tetap",
    subCategory: "Rumah - Listrik",
  },
  {
    id: 6,
    date: "2023-04-15",
    description: "Gaji Dokter Spesialis",
    amount: 15000000,
    type: "income" as const,
    mainCategory: "Pendapatan",
    subCategory: "Gaji Kerja",
  },
  {
    id: 7,
    date: "2023-04-05",
    description: "Belanja Bulanan",
    amount: 1500000,
    type: "expense" as const,
    mainCategory: "Need - Tidak Tetap",
    subCategory: "Belanja Basah",
  },
  {
    id: 8,
    date: "2023-04-20",
    description: "Biaya Pengembangan Diri",
    amount: 2000000,
    type: "expense" as const,
    mainCategory: "Want",
    subCategory: "Pendidikan",
  },
  {
    id: 9, 
    date: "2023-04-25",
    description: "Investasi Reksa Dana",
    amount: 5000000,
    type: "expense" as const,
    mainCategory: "Save - Investasi",
    subCategory: "Investasi - Keluarga",
  }
];

export const useTransactions = () => {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [sortBy, setSortBy] = useState<'date' | 'category' | 'amount'>('date');
  const [filterBy, setFilterBy] = useState<'all' | 'date' | 'category' | 'subCategory'>('all');
  const [filterValue, setFilterValue] = useState<string | null>(null);

  // Mendapatkan nilai unik untuk filter
  const getUniqueDates = (): string[] => {
    return Array.from(new Set(transactions.map(t => t.date)));
  };
  
  const getUniqueCategories = (): string[] => {
    return Array.from(new Set(transactions.map(t => t.mainCategory)));
  };
  
  const getUniqueSubCategories = (): string[] => {
    return Array.from(new Set(transactions.map(t => t.subCategory)));
  };

  // Function to group transactions by month
  const groupByMonth = (): Record<string, Transaction[]> => {
    const grouped: Record<string, Transaction[]> = {};
    
    transactions.forEach(transaction => {
      const month = transaction.date.substring(0, 7); // Get YYYY-MM
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(transaction);
    });
    
    return grouped;
  };

  // Function to get transactions for a specific month
  const getTransactionsByMonth = (month: string): Transaction[] => {
    return transactions.filter(t => t.date.startsWith(month));
  };

  // Function to group transactions by category for a specific month
  const groupByCategoryForMonth = (month: string): Record<string, Transaction[]> => {
    const monthTransactions = getTransactionsByMonth(month);
    const grouped: Record<string, Transaction[]> = {};
    
    monthTransactions.forEach(transaction => {
      if (!grouped[transaction.mainCategory]) {
        grouped[transaction.mainCategory] = [];
      }
      grouped[transaction.mainCategory].push(transaction);
    });
    
    return grouped;
  };

  // Function to group transactions by subcategory for a specific month
  const groupBySubCategoryForMonth = (month: string): Record<string, Record<string, Transaction[]>> => {
    const monthTransactions = getTransactionsByMonth(month);
    const grouped: Record<string, Record<string, Transaction[]>> = {};
    
    monthTransactions.forEach(transaction => {
      if (!grouped[transaction.mainCategory]) {
        grouped[transaction.mainCategory] = {};
      }
      
      if (!grouped[transaction.mainCategory][transaction.subCategory]) {
        grouped[transaction.mainCategory][transaction.subCategory] = [];
      }
      
      grouped[transaction.mainCategory][transaction.subCategory].push(transaction);
    });
    
    return grouped;
  };

  const filteredTransactions = (type?: 'income' | 'expense') => {
    let filtered = transactions;

    // Filter utama: jenis transaksi (income/expense)
    if (type) {
      filtered = filtered.filter(t => t.type === type);
    }

    // Filter lanjutan sesuai filterBy dan filterValue
    if (filterBy === "date" && filterValue) {
      filtered = filtered.filter(t => t.date === filterValue);
    }
    if (filterBy === "category" && filterValue) {
      filtered = filtered.filter(t => t.mainCategory === filterValue);
    }
    if (filterBy === "subCategory" && filterValue) {
      filtered = filtered.filter(t => t.subCategory === filterValue);
    }
    // 'all' => tidak perlu filterValue

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

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prevTransactions => [transaction, ...prevTransactions]);
  };

  return {
    transactions,
    showForm,
    setShowForm,
    filteredTransactions,
    deleteTransaction,
    addTransaction,
    setSortBy,
    setFilterBy,
    filterBy,
    filterValue,
    setFilterValue,
    getUniqueDates,
    getUniqueCategories,
    getUniqueSubCategories,
    groupByMonth,
    getTransactionsByMonth,
    groupByCategoryForMonth,
    groupBySubCategoryForMonth
  };
};
