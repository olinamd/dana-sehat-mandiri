
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
import { useDebtManagement } from "@/hooks/useDebtManagement";

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
  } = useDebtManagement();

  return (
    <div className="space-y-6">
      <DebtManagementHeader onAddNew={() => setShowAssetForm(true)} />

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
