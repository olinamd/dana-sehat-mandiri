
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, ArrowDown, ArrowUp } from "lucide-react";

const debts = [
  {
    id: 1,
    name: "KPR Rumah",
    total: 500000000,
    remaining: 320000000,
    monthlyPayment: 5500000,
    dueDate: "2023-04-15",
    interestRate: 6.5,
  },
  {
    id: 2,
    name: "Kredit Mobil",
    total: 200000000,
    remaining: 85000000,
    monthlyPayment: 3200000,
    dueDate: "2023-04-10",
    interestRate: 5.8,
  },
];

const receivables = [
  {
    id: 1,
    name: "Pinjaman ke Kolega",
    amount: 15000000,
    dueDate: "2023-05-20",
    notes: "Untuk keperluan medis",
  },
  {
    id: 2,
    name: "Piutang Jasa Konsultasi",
    amount: 3500000,
    dueDate: "2023-04-05",
    notes: "Dari RS Sejahtera",
  },
];

const formatRupiah = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const DebtManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Hutang & Piutang</h1>
        <div className="flex gap-2">
          <Button size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Baru
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hutang</CardTitle>
            <ArrowDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 405.000.000</div>
            <div className="text-xs text-muted-foreground">
              Pembayaran bulanan: Rp 8.700.000
            </div>
            <Progress value={55} className="h-2 mt-3" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Piutang</CardTitle>
            <ArrowUp className="h-4 w-4 text-dsm-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 18.500.000</div>
            <div className="text-xs text-muted-foreground">
              Estimasi penerimaan: April-Mei 2023
            </div>
            <Progress value={100} className="h-2 mt-3 bg-gradient-to-r from-dsm-green-light to-dsm-green" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="debts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="debts">Hutang</TabsTrigger>
          <TabsTrigger value="receivables">Piutang</TabsTrigger>
        </TabsList>
        <TabsContent value="debts">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Sisa</TableHead>
                    <TableHead>Angsuran Bulanan</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead>Bunga</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {debts.map((debt) => (
                    <TableRow key={debt.id}>
                      <TableCell className="font-medium">{debt.name}</TableCell>
                      <TableCell>{formatRupiah(debt.total)}</TableCell>
                      <TableCell>{formatRupiah(debt.remaining)}</TableCell>
                      <TableCell>{formatRupiah(debt.monthlyPayment)}</TableCell>
                      <TableCell>{formatDate(debt.dueDate)}</TableCell>
                      <TableCell>{debt.interestRate}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          <span className="text-xs">Aktif</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="receivables">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Jatuh Tempo</TableHead>
                    <TableHead>Catatan</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {receivables.map((receivable) => (
                    <TableRow key={receivable.id}>
                      <TableCell className="font-medium">{receivable.name}</TableCell>
                      <TableCell>{formatRupiah(receivable.amount)}</TableCell>
                      <TableCell>{formatDate(receivable.dueDate)}</TableCell>
                      <TableCell>{receivable.notes}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-dsm-green"></div>
                          <span className="text-xs">Belum Jatuh Tempo</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DebtManagement;
