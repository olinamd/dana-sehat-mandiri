
import { Transaction } from "@/types";

export const groupTransactionsByCategory = (transactions: Transaction[]) => {
  const grouped: Record<string, Record<string, Transaction[]>> = {};
  
  transactions.forEach(transaction => {
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

export const getCategoryGroup = (mainCategory: string, subCategory: string): "Need" | "Want" | "Save" | null => {
  const needPrefix = ["Need - Tetap", "Need - Tidak Tetap"];
  if (needPrefix.some(prefix => mainCategory.startsWith(prefix))) {
    return "Need";
  }
  
  const wantPrefix = ["Want", "Want - Hiburan", "Want - Sosial"];
  if (wantPrefix.some(prefix => mainCategory.startsWith(prefix))) {
    return "Want";
  }
  
  const savePrefix = ["Save", "Save - Investasi"];
  if (savePrefix.some(prefix => mainCategory.startsWith(prefix))) {
    return "Save";
  }
  
  return null;
};
