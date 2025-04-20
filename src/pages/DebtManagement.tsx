import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Asset, Liability } from "@/types/assets";
import { DebtItem, ReceivableItem } from "@/types/index";
import { toast } from "sonner";
import AssetsList from "@/components/wealth/AssetsList";
import LiabilitiesList from "@/components/wealth/LiabilitiesList";
import AssetForm from "@/components/wealth/AssetForm";
import LiabilityForm from "@/components/wealth/LiabilityForm";
import WealthSummaryCards from "@/components/wealth/WealthSummaryCards";
import DebtsTable from "@/components/wealth/DebtsTable";
import ReceivablesTable from "@/components/wealth/ReceivablesTable";

const mockAssets: Asset[] = [
  {
    id: 1,
    name: "Tabungan",
    amount: 50000000,
    category: "liquid",
    subcategory: "Tabungan",
  },
  {
    id: 2,
    name: "Deposito BCA",
    amount: 100000000,
    category: "investment",
    subcategory: "Deposito",
  },
  {
    id: 3,
    name: "Rumah Tinggal",
    amount: 1500000000,
    category: "personal",
    subcategory: "Rumah",
  },
];

const mockLiabilities: Liability[] = [
  {
    id: 1,
    name: "Kartu Kredit BCA",
    amount: 15000000,
    category: "short-term",
    subcategory: "Kartu Kredit",
  },
  {
    id: 2,
    name: "KPR BTN",
    amount: 500000000,
    category: "long-term",
    subcategory: "Kredit Pemilikan Rumah",
  },
];

const mockDebts: DebtItem[] = [
  {
    id: 1,
    name: "KPR Rumah",
    total: 800000000,
    remaining: 650000000,
    monthlyPayment: 7500000,
    dueDate: "2033-05-15",
    interestRate: 9.5,
  },
  {
    id: 2,
    name: "Kredit Mobil",
    total: 300000000,
    remaining: 180000000,
    monthlyPayment: 5300000,
    dueDate: "2026-08-22",
    interestRate: 7.5,
  }
];

const mockReceivables: ReceivableItem[] = [
  {
    id: 1,
    name: "Pinjaman ke Teman",
    amount: 5000000,
    dueDate: "2023-07-30",
    notes: "Untuk biaya pendidikan anak"
  },
  {
    id: 2,
    name: "Investasi Bisnis",
    amount: 25000000,
    dueDate: "2023-12-15",
    notes: "Pengembalian modal usaha kuliner"
  }
];

const DebtManagement = () => {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [liabilities, setLiabilities] = useState<Liability[]>(mockLiabilities);
  const [debts] = useState<DebtItem[]>(mockDebts);
  const [receivables] = useState<ReceivableItem[]>(mockReceivables);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showLiabilityForm, setShowLiabilityForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | undefined>();
  const [editingLiability, setEditingLiability] = useState<Liability | undefined>();

  const totalAssets = assets.reduce((sum, asset) => sum + asset.amount, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const netWorth = totalAssets - totalLiabilities;

  const handleAddAsset = (newAsset: Omit<Asset, "id">) => {
    setAssets(prev => [...prev, { ...newAsset, id: prev.length + 1 }]);
    toast.success("Aset berhasil ditambahkan");
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Hutang & Piutang</h1>
        <div className="flex gap-2">
          <Button size="sm" onClick={() => setShowAssetForm(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Baru
          </Button>
        </div>
      </div>

      <WealthSummaryCards
        totalAssets={totalAssets}
        totalLiabilities={totalLiabilities}
        netWorth={netWorth}
      />

      <Tabs defaultValue="assets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assets">Aset</TabsTrigger>
          <TabsTrigger value="liabilities">Liabilitas</TabsTrigger>
          <TabsTrigger value="debts">Hutang</TabsTrigger>
          <TabsTrigger value="receivables">Piutang</TabsTrigger>
        </TabsList>

        <TabsContent value="assets">
          <Card>
            <CardContent className="p-6">
              <AssetsList
                assets={assets}
                onEdit={handleEditAsset}
                onDelete={handleDeleteAsset}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="liabilities">
          <Card>
            <CardContent className="p-6">
              <LiabilitiesList
                liabilities={liabilities}
                onEdit={handleEditLiability}
                onDelete={handleDeleteLiability}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="debts">
          <Card>
            <CardContent className="p-0">
              <DebtsTable debts={debts} onDelete={handleDeleteDebt} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receivables">
          <Card>
            <CardContent className="p-0">
              <ReceivablesTable receivables={receivables} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AssetForm
        isOpen={showAssetForm}
        onClose={() => {
          setShowAssetForm(false);
          setEditingAsset(undefined);
        }}
        onSubmit={editingAsset ? handleUpdateAsset : handleAddAsset}
        editingAsset={editingAsset}
      />

      <LiabilityForm
        isOpen={showLiabilityForm}
        onClose={() => {
          setShowLiabilityForm(false);
          setEditingLiability(undefined);
        }}
        onSubmit={editingLiability ? handleUpdateLiability : handleAddLiability}
        editingLiability={editingLiability}
      />
    </div>
  );
};

export default DebtManagement;
