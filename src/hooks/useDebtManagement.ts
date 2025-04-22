
import { useState } from "react";
import { mockAssets, mockDebts, mockLiabilities, mockReceivables } from "@/data/mockFinancialData";
import { useAssets } from "./useAssets";
import { useLiabilities } from "./useLiabilities";
import { useDebts } from "./useDebts";
import { useReceivables } from "./useReceivables";
import { useTransactionHistory } from "./useTransactionHistory";
import { Asset } from "@/types/assets";
import { Liability } from "@/types/assets";
import { useTransactions } from "./useTransactions";

export const useDebtManagement = () => {
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | undefined>(undefined);
  const [editingLiability, setEditingLiability] = useState<Liability | undefined>(undefined);

  const transaction = useTransactionHistory();
  const { transactions } = useTransactions(); // Add this to get all transactions

  // Calculate total income and expenses from transactions
  const transactionTotals = transactions.reduce(
    (acc, curr) => {
      if (curr.type === 'income') {
        acc.income += curr.amount;
      } else {
        acc.expenses += curr.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const assets = useAssets({
    mockAssets,
    addTransaction: transaction.addAssetTransaction,
  });

  const liabilities = useLiabilities({
    mockLiabilities,
    addTransaction: transaction.addLiabilityTransaction,
  });

  const debts = useDebts({ mockDebts });
  const receivables = useReceivables({ mockReceivables });

  // Calculate net worth considering both assets/liabilities and transaction history
  const netWorth = assets.totalAssets - liabilities.totalLiabilities;
  
  // Calculate total equity from transaction history
  const totalEquity = transactionTotals.income - transactionTotals.expenses;

  // Add percentage change calculation
  const getPercentageChange = () => {
    const previousMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const currentDate = new Date();
      const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
      return transactionDate.getMonth() === previousMonth.getMonth() &&
             transactionDate.getFullYear() === previousMonth.getFullYear();
    });

    const previousMonthTotal = previousMonthTransactions.reduce((acc, curr) => {
      return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
    }, 0);

    if (previousMonthTotal === 0) return 0;
    return ((totalEquity - previousMonthTotal) / Math.abs(previousMonthTotal)) * 100;
  };

  return {
    ...assets,
    ...liabilities,
    ...debts,
    ...receivables,
    ...transaction,
    totalAssets: assets.totalAssets,
    totalLiabilities: liabilities.totalLiabilities,
    netWorth,
    totalEquity,
    equityChangePercentage: getPercentageChange(),
    showAssetForm,
    setShowAssetForm,
    showLiabilityForm,
    setShowLiabilityForm,
    editingAsset,
    setEditingAsset,
    editingLiability,
    setEditingLiability,
  };
};
