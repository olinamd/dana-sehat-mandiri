
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, PiggyBank, TrendingUp, AlertTriangle } from "lucide-react";
import IncomeExpenseChart from "@/components/charts/IncomeExpenseChart";
import FinancialHealthCard from "@/components/cards/FinancialHealthCard";
import FinancialAlertsCard from "@/components/cards/FinancialAlertsCard";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Ekuitas</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 23.500.000</div>
            <p className="text-xs text-muted-foreground">
              +10% dari bulan lalu
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pemasukan Rata-Rata</CardTitle>
            <ArrowUp className="h-4 w-4 text-dsm-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 12.750.000</div>
            <p className="text-xs text-muted-foreground">
              3 bulan terakhir
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pengeluaran Rata-Rata</CardTitle>
            <ArrowDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 8.320.000</div>
            <p className="text-xs text-muted-foreground">
              3 bulan terakhir
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rasio Tabungan</CardTitle>
            <TrendingUp className="h-4 w-4 text-dsm-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.7%</div>
            <Progress value={34.7} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Ringkasan</TabsTrigger>
          <TabsTrigger value="trends">Tren</TabsTrigger>
          <TabsTrigger value="health">Kesehatan Finansial</TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pemasukan & Pengeluaran</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <IncomeExpenseChart />
            </CardContent>
          </Card>
          <FinancialAlertsCard />
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tren Finansial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center h-40">
                <TrendingUp className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-center">
                  Analisis Tren akan tersedia setelah minimal 3 bulan data
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="health" className="space-y-4">
          <FinancialHealthCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
