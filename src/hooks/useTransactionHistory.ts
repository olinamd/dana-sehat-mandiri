
import { useState } from "react";
import { Transaction } from "@/types";

type AssetOrLiability =
  | { type: "asset"; data: any }
  | { type: "liability"; data: any };

export function useTransactionHistory() {
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);

  const generateTransactionId = () => Date.now() + Math.floor(Math.random() * 1000);

  const addAssetTransaction = (asset: any, transactionType: "add" | "update" | "delete") => {
    const transactionId = generateTransactionId();
    const newTransaction: Transaction = {
      id: transactionId,
      date: new Date().toISOString().split("T")[0],
      description:
        transactionType === "add"
          ? `Tambah Aset: ${asset.subcategory}`
          : transactionType === "update"
          ? `Update Aset: ${asset.subcategory}`
          : `Hapus Aset: ${asset.subcategory}`,
      amount: asset.amount,
      type: transactionType === "delete" ? "expense" : "income",
      mainCategory: `Aset ${asset.category}`,
      subCategory: asset.subcategory,
    };
    setTransactionHistory((prev) => [...prev, newTransaction]);
    return transactionId;
  };

  const addLiabilityTransaction = (liability: any, transactionType: "add" | "update" | "delete") => {
    const transactionId = generateTransactionId();
    const newTransaction: Transaction = {
      id: transactionId,
      date: new Date().toISOString().split("T")[0],
      description:
        transactionType === "add"
          ? `Tambah Liabilitas: ${liability.subcategory}`
          : transactionType === "update"
          ? `Update Liabilitas: ${liability.subcategory}`
          : `Hapus Liabilitas: ${liability.subcategory}`,
      amount: liability.amount,
      type: transactionType === "delete" ? "income" : "expense",
      mainCategory: `Liabilitas ${liability.category}`,
      subCategory: liability.subcategory,
    };
    setTransactionHistory((prev) => [...prev, newTransaction]);
    return transactionId;
  };

  return {
    transactionHistory,
    setTransactionHistory,
    addAssetTransaction,
    addLiabilityTransaction,
  };
}
