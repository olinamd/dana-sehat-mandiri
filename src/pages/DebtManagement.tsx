import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AssetsList from "@/components/wealth/AssetsList";
import LiabilitiesList from "@/components/wealth/LiabilitiesList";
import AssetForm from "@/components/wealth/AssetForm";
import LiabilityForm from "@/components/wealth/LiabilityForm";
import WealthSummaryCards from "@/components/wealth/WealthSummaryCards";
import DebtsTable from "@/components/wealth/DebtsTable";
import ReceivablesTable from "@/components/wealth/ReceivablesTable";
import { DebtManagementHeader } from "@/components/wealth/DebtManagementHeader";
import { Button } from "@/components/ui/button";
import { useDebtManagement } from "@/hooks/useDebtManagement";
import { Plus } from "lucide-react";

const DebtManagement = () => {
  const {
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
    handleAddReceivable,
    handleAddDebt,
  } = useDebtManagement();

  const onAssetSubmit = (asset) => {
    handleAddAsset(asset);

    if (
      asset.category === "liquid" &&
      asset.subcategory.toLowerCase() === "piutang"
    ) {
      handleAddReceivable({
        name: asset.contactName || asset.name,
        amount: asset.amount,
        dueDate: asset.dueDate || new Date().toISOString().split("T")[0],
        notes: asset.notes ?? "",
        address: asset.contactAddress ?? "",
        phone: asset.contactPhone ?? "",
        email: asset.contactEmail ?? "",
      });
    }
  };

  const onLiabilitySubmit = (liability) => {
    handleAddLiability(liability);

    if (
      [
        "Kredit Pemilikan Rumah",
        "Kredit Pemilikan Mobil",
        "Pinjaman Teman",
        "Pinjaman Keluarga",
        "Pinjaman Usaha",
        "Pinjaman Lain - Lain",
        "Kartu Kredit"
      ].includes(liability.subcategory)
    ) {
      handleAddDebt({
        name: liability.contactName || liability.name,
        category: liability.category,
        subcategory: liability.subcategory,
        total: liability.amount,
        remaining: liability.amount,
        monthlyPayment: 0,
        dueDate: liability.dueDate || new Date().toISOString().split("T")[0],
        interestRate: 0,
        notes: liability.notes ?? "",
        address: liability.contactAddress ?? "",
        phone: liability.contactPhone ?? "",
        email: liability.contactEmail ?? "",
      });
    }
  };

  return (
    <div className="space-y-6">
      <DebtManagementHeader onAddNew={() => setShowAssetForm(true)} />

      <div className="flex gap-2 pb-2">
        <Button onClick={() => setShowAssetForm(true)} variant="default" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Tambah Aset Baru
        </Button>
        <Button onClick={() => setShowLiabilityForm(true)} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" /> Tambah Liabilitas Baru
        </Button>
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
        onSubmit={editingAsset ? handleUpdateAsset : onAssetSubmit}
        editingAsset={editingAsset}
      />

      <LiabilityForm
        isOpen={showLiabilityForm}
        onClose={() => {
          setShowLiabilityForm(false);
          setEditingLiability(undefined);
        }}
        onSubmit={editingLiability ? handleUpdateLiability : onLiabilitySubmit}
        editingLiability={editingLiability}
      />
    </div>
  );
};

export default DebtManagement;
