
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Download, PieChart, MessageSquare } from "lucide-react";
import { BudgetPieChart } from "@/components/charts/BudgetPieChart";
import BudgetChatbot from "@/components/chatbot/BudgetChatbot";

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const BudgetSuggestions = () => {
  const income = 12750000;
  
  const idealBudget = [
    { category: "Kebutuhan Pokok", percentage: 50, amount: income * 0.5 },
    { category: "Keinginan", percentage: 30, amount: income * 0.3 },
    { category: "Tabungan & Investasi", percentage: 20, amount: income * 0.2 },
  ];
  
  const detailedBudget = [
    { category: "Perumahan", percentage: 30, amount: income * 0.3, type: "Kebutuhan Pokok" },
    { category: "Transportasi", percentage: 10, amount: income * 0.1, type: "Kebutuhan Pokok" },
    { category: "Makanan", percentage: 10, amount: income * 0.1, type: "Kebutuhan Pokok" },
    { category: "Hiburan", percentage: 10, amount: income * 0.1, type: "Keinginan" },
    { category: "Belanja", percentage: 10, amount: income * 0.1, type: "Keinginan" },
    { category: "Lainnya", percentage: 10, amount: income * 0.1, type: "Keinginan" },
    { category: "Tabungan", percentage: 10, amount: income * 0.1, type: "Tabungan & Investasi" },
    { category: "Investasi", percentage: 10, amount: income * 0.1, type: "Tabungan & Investasi" },
  ];
  
  const financialAlerts = [
    "Pembayaran hutang KPR akan jatuh tempo dalam 5 hari",
    "Pengeluaran makanan bulan ini melebihi anggaran sebesar 12%",
    "Anda belum mencapai target investasi bulanan"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Saran Anggaran</h1>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Ekspor PDF
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pendapatan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(income)}</div>
            <p className="text-xs text-muted-foreground">
              Rata-rata 3 bulan terakhir
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pengeluaran Ideal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(income * 0.8)}</div>
            <p className="text-xs text-muted-foreground">
              80% dari pendapatan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Target Tabungan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatRupiah(income * 0.2)}</div>
            <p className="text-xs text-muted-foreground">
              20% dari pendapatan
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="budget" className="space-y-4">
        <TabsList>
          <TabsTrigger value="budget">Anggaran Ideal</TabsTrigger>
          <TabsTrigger value="detailed">Detail Anggaran</TabsTrigger>
          <TabsTrigger value="chatbot">Asisten Anggaran</TabsTrigger>
        </TabsList>
        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Proporsi Anggaran 50/30/20</CardTitle>
              <CardDescription>
                Metode umum yang direkomendasikan oleh perencana keuangan
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <BudgetPieChart />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                {idealBudget.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">{item.category} ({item.percentage}%)</div>
                      <div className="font-medium">{formatRupiah(item.amount)}</div>
                    </div>
                    <Progress 
                      value={item.percentage} 
                      className={`h-2 ${
                        item.category === "Kebutuhan Pokok" ? "bg-dsm-blue" : 
                        item.category === "Keinginan" ? "bg-dsm-teal" : "bg-dsm-green"
                      }`}
                    />
                    <p className="text-xs text-muted-foreground">
                      {item.category === "Kebutuhan Pokok" ? 
                        "Kebutuhan dasar seperti rumah, makanan, transportasi" : 
                        item.category === "Keinginan" ? 
                        "Belanja, hiburan, hobi, liburan" : 
                        "Tabungan darurat dan investasi jangka panjang"
                      }
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span>Peringatan Anggaran</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financialAlerts.map((alert, index) => (
                  <div 
                    key={index} 
                    className="p-3 rounded-lg border border-amber-200 bg-amber-50 flex items-start gap-3"
                  >
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <p className="text-sm text-amber-800">{alert}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Detail Anggaran Bulanan</CardTitle>
              <CardDescription>
                Berdasarkan pendapatan rata-rata Rp {formatRupiah(income)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Tipe</TableHead>
                    <TableHead>Persentase</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedBudget.map((item) => (
                    <TableRow key={item.category}>
                      <TableCell className="font-medium">{item.category}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.percentage}%</TableCell>
                      <TableCell className="text-right">{formatRupiah(item.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chatbot">
          <BudgetChatbot />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BudgetSuggestions;
