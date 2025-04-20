
import { useState } from "react";
import { Asset, Liability } from "@/types/assets";
import { DebtItem, ReceivableItem } from "@/types";
import { toast } from "sonner";
import { mockAssets, mockLiabilities, mockDebts, mockReceivables } from "@/data/mockFinancialData";

export const useDebtManagement = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [liabilities, setLiabilities] = useState<Liability[]>(mockLiabilities);
  const [debts, setDebts] = useState<DebtItem[]>(mockDebts);
  const [receivables, setReceivables] = useState<ReceivableItem[]>(mockReceivables);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset>();
  const [editingLiability, setEditingLiability] = useState<Liability>();

  const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const netWorth = totalAssets - totalLiabilities;

  const handleAddAsset = (newAsset: Omit<Asset, "id">) => {
    setAssets(prev => [...prev, { ...newAsset, id: prev.length + 1 }]);
    toast.success("Aset berhasil ditambahkan");
  };

  // Handler baru menambah Receivable (Piutang)
  const handleAddReceivable = (receivable: Omit<ReceivableItem, "id">) => {
    setReceivables(prev => [
      ...prev,
      {
        ...receivable,
        id: prev.length + 1,
      },
    ]);
    toast.success("Piutang berhasil ditambahkan dari aset");
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setShowAssetForm(true);
  };

  const handleUpdateAsset = (updatedAsset: Omit<Asset, "id">) => {
    setAssets(prev => prev.map(asset => 
      asset.id === editingAsset?.id 
        ? { ...updatedAsset, id: asset.id }
        : asset
    ));
    setEditingAsset(undefined);
    toast.success("Aset berhasil diperbarui");
  };

  const handleDeleteAsset = (id: number) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
    toast.success("Aset berhasil dihapus");
  };

  const handleAddLiability = (newLiability: Omit<Liability, "id">) => {
    setLiabilities(prev => [...prev, { ...newLiability, id: prev.length + 1 }]);
    toast.success("Liabilitas berhasil ditambahkan");
  };

  // Handler baru menambah Debt (Hutang)
  const handleAddDebt = (debt: Omit<DebtItem, "id">) => {
    setDebts(prev => [
      ...prev,
      {
        ...debt,
        id: prev.length + 1,
      },
    ]);
    toast.success("Hutang berhasil ditambahkan dari liabilitas");
  };

  const handleEditLiability = (liability: Liability) => {
    setEditingLiability(liability);
    setShowLiabilityForm(true);
  };

  const handleUpdateLiability = (updatedLiability: Omit<Liability, "id">) => {
    setLiabilities(prev => prev.map(liability => 
      liability.id === editingLiability?.id 
        ? { ...updatedLiability, id: liability.id }
        : liability
    ));
    setEditingLiability(undefined);
    toast.success("Liabilitas berhasil diperbarui");
  };

  const handleDeleteLiability = (id: number) => {
    setLiabilities(prev => prev.filter(liability => liability.id !== id));
    toast.success("Liabilitas berhasil dihapus");
  };

  const handleDeleteDebt = (id: number) => {
    setDebts(prev => prev.filter(debt => debt.id !== id));
    toast.success("Hutang berhasil dihapus");
  };

  return {
    assets,
    liabilities,
    debts,
    receivables,
    totalAssets,
    totalLiabilities,
    netWorth,
    showAssetForm,
    showLiabilityForm,
    editingAsset,
    editingLiability,
    setShowAssetForm,
    setShowLiabilityForm,
    setEditingAsset,
    setEditingLiability,
    handleAddAsset,
    handleEditAsset,
    handleUpdateAsset,
    handleDeleteAsset,
    handleAddLiability,
    handleEditLiability,
    handleUpdateLiability,
    handleDeleteLiability,
    handleDeleteDebt,
    // handler baru untuk integrasi
    handleAddReceivable,
    handleAddDebt,
  };
};
