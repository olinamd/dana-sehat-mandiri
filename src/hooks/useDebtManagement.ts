
import { mockAssets, mockDebts, mockLiabilities, mockReceivables } from "@/data/mockFinancialData";
import { useAssets } from "./useAssets";
import { useLiabilities } from "./useLiabilities";
import { useDebts } from "./useDebts";
import { useReceivables } from "./useReceivables";
import { useTransactionHistory } from "./useTransactionHistory";

// Compose the separate hooks
export const useDebtManagement = () => {
  const transaction = useTransactionHistory();

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

  const netWorth = assets.totalAssets - liabilities.totalLiabilities;

  return {
    ...assets,
    ...liabilities,
    ...debts,
    ...receivables,
    ...transaction,
    totalAssets: assets.totalAssets,
    totalLiabilities: liabilities.totalLiabilities,
    netWorth,
  };
};
