
import { useState } from "react";
import { Asset } from "@/types/assets";
import { Transaction } from "@/types";
import { toast } from "sonner";

interface UseAssetsProps {
  mockAssets: Asset[];
  addTransaction: (asset: Asset, transactionType: 'add' | 'update' | 'delete') => number;
}

export function useAssets({ mockAssets, addTransaction }: UseAssetsProps) {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [editingAsset, setEditingAsset] = useState<Asset | undefined>();
  const [showAssetForm, setShowAssetForm] = useState(false);

  const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);

  const handleAddAsset = (newAsset: Omit<Asset, "id">) => {
    const transactionId = addTransaction(newAsset as Asset, "add");
    setAssets(prev => [...prev, { ...newAsset, id: prev.length + 1, transactionId }]);
    toast.success("Aset berhasil ditambahkan");
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setShowAssetForm(true);
  };

  const handleUpdateAsset = (updatedAsset: Omit<Asset, "id">) => {
    setAssets(prev =>
      prev.map(asset =>
        asset.id === editingAsset?.id
          ? { ...updatedAsset, id: asset.id, transactionId: asset.transactionId }
          : asset
      )
    );
    setEditingAsset(undefined);
    toast.success("Aset berhasil diperbarui");
  };

  const handleDeleteAsset = (id: number) => {
    setAssets(prev => prev.filter(asset => asset.id !== id));
    toast.success("Aset berhasil dihapus");
  };

  return {
    assets,
    editingAsset,
    showAssetForm,
    setShowAssetForm,
    setEditingAsset,
    handleAddAsset,
    handleEditAsset,
    handleUpdateAsset,
    handleDeleteAsset,
    totalAssets
  };
}
