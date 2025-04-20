
import { useState } from "react";
import { Asset, Liability, HUTANG_CATEGORIES } from "@/types/assets";
import { DebtItem, ReceivableItem, Transaction } from "@/types";
import { toast } from "sonner";
import { mockAssets, mockLiabilities, mockDebts, mockReceivables } from "@/data/mockFinancialData";

export const useDebtManagement = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [liabilities, setLiabilities] = useState<Liability[]>(mockLiabilities);
  const [debts, setDebts] = useState<DebtItem[]>(mockDebts);
  const [receivables, setReceivables] = useState<ReceivableItem[]>(mockReceivables);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>([]);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset>();
  const [editingLiability, setEditingLiability] = useState<Liability>();

  const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const netWorth = totalAssets - totalLiabilities;

  // Helper function to generate a unique transaction ID
  const generateTransactionId = () => {
    return Date.now() + Math.floor(Math.random() * 1000);
  };

  // Add an asset transaction to history
  const addAssetTransaction = (asset: Asset, transactionType: 'add' | 'update' | 'delete') => {
    const transactionId = generateTransactionId();
    const newTransaction: Transaction = {
      id: transactionId,
      date: new Date().toISOString().split('T')[0],
      description: `${transactionType === 'add' ? 'Tambah' : transactionType === 'update' ? 'Update' : 'Hapus'} Aset: ${asset.subcategory}`,
      amount: asset.amount,
      type: transactionType === 'delete' ? 'expense' : 'income',
      mainCategory: `Aset ${asset.category}`,
      subCategory: asset.subcategory,
    };
    
    setTransactionHistory(prev => [...prev, newTransaction]);
    return transactionId;
  };

  // Add a liability transaction to history
  const addLiabilityTransaction = (liability: Liability, transactionType: 'add' | 'update' | 'delete') => {
    const transactionId = generateTransactionId();
    const newTransaction: Transaction = {
      id: transactionId,
      date: new Date().toISOString().split('T')[0],
      description: `${transactionType === 'add' ? 'Tambah' : transactionType === 'update' ? 'Update' : 'Hapus'} Liabilitas: ${liability.subcategory}`,
      amount: liability.amount,
      type: transactionType === 'delete' ? 'income' : 'expense',
      mainCategory: `Liabilitas ${liability.category}`,
      subCategory: liability.subcategory,
    };
    
    setTransactionHistory(prev => [...prev, newTransaction]);
    return transactionId;
  };

  const handleAddAsset = (newAsset: Omit<Asset, "id">) => {
    const transactionId = addAssetTransaction(newAsset as Asset, 'add');
    setAssets(prev => [...prev, { ...newAsset, id: prev.length + 1, transactionId }]);
    toast.success("Aset berhasil ditambahkan");
  };

  const handleAddReceivable = (receivable: Omit<ReceivableItem, "id">) => {
    const transactionId = generateTransactionId();
    setReceivables(prev => [
      ...prev,
      {
        ...receivable,
        id: prev.length + 1,
        transactionId,
      },
    ]);
    toast.success("Piutang berhasil ditambahkan dari aset");
  };

  const handleDeleteReceivable = (id: number) => {
    const toDelete = receivables.find(r => r.id === id);
    
    if (toDelete) {
      // Add a transaction for the deletion
      if (toDelete.transactionId) {
        // Update related transaction or create a new one
        setTransactionHistory(prev => prev.filter(t => t.id !== toDelete.transactionId));
      }
      
      setReceivables(prev => prev.filter(r => r.id !== id));
      
      // Optionally add to cash assets when a receivable is paid
      const cashTransaction: Transaction = {
        id: generateTransactionId(),
        date: new Date().toISOString().split('T')[0],
        description: `Piutang atas nama ${toDelete.name} telah dibayar`,
        amount: toDelete.amount,
        type: 'income',
        mainCategory: 'Aset liquid',
        subCategory: 'Tabungan',
      };
      
      setTransactionHistory(prev => [...prev, cashTransaction]);
      
      // Update related asset if it exists
      const relatedAsset = assets.find(a => a.transactionId === toDelete.transactionId);
      if (relatedAsset) {
        setAssets(prev => prev.filter(a => a.id !== relatedAsset.id));
      }
      
      toast.success(`Piutang atas nama ${toDelete.name} telah dibayar dan dihapus`);
    }
  };

  const handleAddLiability = (newLiability: Omit<Liability, "id">) => {
    const transactionId = addLiabilityTransaction(newLiability as Liability, 'add');
    setLiabilities(prev => [...prev, { ...newLiability, id: prev.length + 1, transactionId }]);
    toast.success("Liabilitas berhasil ditambahkan");
  };

  const handleAddDebt = (debt: Omit<DebtItem, "id">) => {
    const transactionId = generateTransactionId();
    setDebts(prev => [
      ...prev,
      {
        ...debt,
        id: prev.length + 1,
        transactionId,
      },
    ]);
    toast.success("Hutang berhasil ditambahkan dari liabilitas");
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setShowAssetForm(true);
  };

  const handleUpdateAsset = (updatedAsset: Omit<Asset, "id">) => {
    const assetToUpdate = assets.find(a => a.id === editingAsset?.id);
    
    if (assetToUpdate) {
      // Update transaction history
      const transactionId = assetToUpdate.transactionId || addAssetTransaction(updatedAsset as Asset, 'update');
      
      if (assetToUpdate.transactionId) {
        // Update existing transaction
        setTransactionHistory(prev => prev.map(t => 
          t.id === assetToUpdate.transactionId 
            ? {
                ...t,
                description: `Update Aset: ${updatedAsset.subcategory}`,
                amount: updatedAsset.amount,
                mainCategory: `Aset ${updatedAsset.category}`,
                subCategory: updatedAsset.subcategory,
              }
            : t
        ));
      }
      
      // Update the asset
      setAssets(prev => prev.map(asset => 
        asset.id === editingAsset?.id 
          ? { ...updatedAsset, id: asset.id, transactionId }
          : asset
      ));
      
      // Update related receivable if it's a receivable
      if (assetToUpdate.category === 'liquid' && assetToUpdate.subcategory === 'Piutang') {
        const relatedReceivable = receivables.find(r => r.transactionId === assetToUpdate.transactionId);
        if (relatedReceivable) {
          setReceivables(prev => prev.map(r => 
            r.id === relatedReceivable.id
              ? { 
                  ...r, 
                  amount: updatedAsset.amount,
                  // Update other fields if they were passed
                }
              : r
          ));
        }
      }
    }
    
    setEditingAsset(undefined);
    toast.success("Aset berhasil diperbarui");
  };

  const handleDeleteAsset = (id: number) => {
    const assetToDelete = assets.find(a => a.id === id);
    
    if (assetToDelete) {
      // Add transaction for deletion
      if (assetToDelete.transactionId) {
        setTransactionHistory(prev => prev.filter(t => t.id !== assetToDelete.transactionId));
      }
      
      // Delete the asset
      setAssets(prev => prev.filter(asset => asset.id !== id));
      
      // Delete related receivable if it's a receivable
      if (assetToDelete.category === 'liquid' && assetToDelete.subcategory === 'Piutang') {
        const relatedReceivable = receivables.find(r => r.transactionId === assetToDelete.transactionId);
        if (relatedReceivable) {
          setReceivables(prev => prev.filter(r => r.id !== relatedReceivable.id));
        }
      }
    }
    
    toast.success("Aset berhasil dihapus");
  };

  const handleEditLiability = (liability: Liability) => {
    setEditingLiability(liability);
    setShowLiabilityForm(true);
  };

  const handleUpdateLiability = (updatedLiability: Omit<Liability, "id">) => {
    const liabilityToUpdate = liabilities.find(l => l.id === editingLiability?.id);
    
    if (liabilityToUpdate) {
      // Update transaction history
      const transactionId = liabilityToUpdate.transactionId || addLiabilityTransaction(updatedLiability as Liability, 'update');
      
      if (liabilityToUpdate.transactionId) {
        // Update existing transaction
        setTransactionHistory(prev => prev.map(t => 
          t.id === liabilityToUpdate.transactionId 
            ? {
                ...t,
                description: `Update Liabilitas: ${updatedLiability.subcategory}`,
                amount: updatedLiability.amount,
                mainCategory: `Liabilitas ${updatedLiability.category}`,
                subCategory: updatedLiability.subcategory,
              }
            : t
        ));
      }
      
      // Update the liability
      setLiabilities(prev => prev.map(liability => 
        liability.id === editingLiability?.id 
          ? { ...updatedLiability, id: liability.id, transactionId }
          : liability
      ));
      
      // Update related debt if it's a debt type
      if (HUTANG_CATEGORIES.includes(liabilityToUpdate.subcategory)) {
        const relatedDebt = debts.find(d => d.transactionId === liabilityToUpdate.transactionId);
        if (relatedDebt) {
          setDebts(prev => prev.map(d => 
            d.id === relatedDebt.id
              ? { 
                  ...d, 
                  total: updatedLiability.amount,
                  remaining: updatedLiability.amount,
                  // Update other fields if they were passed
                }
              : d
          ));
        }
      }
    }
    
    setEditingLiability(undefined);
    toast.success("Liabilitas berhasil diperbarui");
  };

  const handleDeleteLiability = (id: number) => {
    const liabilityToDelete = liabilities.find(l => l.id === id);
    
    if (liabilityToDelete) {
      // Add transaction for deletion
      if (liabilityToDelete.transactionId) {
        setTransactionHistory(prev => prev.filter(t => t.id !== liabilityToDelete.transactionId));
      }
      
      // Delete the liability
      setLiabilities(prev => prev.filter(liability => liability.id !== id));
      
      // Delete related debt if it's a debt type
      if (HUTANG_CATEGORIES.includes(liabilityToDelete.subcategory)) {
        const relatedDebt = debts.find(d => d.transactionId === liabilityToDelete.transactionId);
        if (relatedDebt) {
          setDebts(prev => prev.filter(d => d.id !== relatedDebt.id));
        }
      }
    }
    
    toast.success("Liabilitas berhasil dihapus");
  };

  const handleDeleteDebt = (id: number) => {
    const debtToDelete = debts.find(d => d.id === id);
    
    if (debtToDelete) {
      // Delete transaction if it exists
      if (debtToDelete.transactionId) {
        setTransactionHistory(prev => prev.filter(t => t.id !== debtToDelete.transactionId));
      }
      
      // Delete the debt
      setDebts(prev => prev.filter(debt => debt.id !== id));
      
      // Delete related liability if it exists
      const relatedLiability = liabilities.find(l => l.transactionId === debtToDelete.transactionId);
      if (relatedLiability) {
        setLiabilities(prev => prev.filter(l => l.id !== relatedLiability.id));
      }
    }
    
    toast.success("Hutang berhasil dihapus");
  };

  return {
    assets,
    liabilities,
    debts,
    receivables,
    transactionHistory,
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
    handleAddReceivable,
    handleAddDebt,
    handleDeleteReceivable,
  };
};
