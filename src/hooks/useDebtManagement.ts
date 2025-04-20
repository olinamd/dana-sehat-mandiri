
import { useState } from "react";
import { mockAssets, mockDebts, mockLiabilities, mockReceivables } from "@/data/mockFinancialData";
import { useAssets } from "./useAssets";
import { useLiabilities } from "./useLiabilities";
import { useDebts } from "./useDebts";
import { useReceivables } from "./useReceivables";
import { useTransactionHistory } from "./useTransactionHistory";
import { Asset } from "@/types/assets";
import { Liability } from "@/types/assets";

// Compose the separate hooks
export const useDebtManagement = () => {
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | undefined>(undefined);
  const [editingLiability, setEditingLiability] = useState<Liability | undefined>(undefined);

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
