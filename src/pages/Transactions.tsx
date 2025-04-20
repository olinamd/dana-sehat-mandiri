
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Download, ArrowUpRight, ArrowDownLeft, Filter } from "lucide-react";
import TransactionForm from "@/components/forms/TransactionForm";
import { useState } from "react";

const transactions = [
  {
    id: 1,
    date: "2023-03-15",
    description: "Gaji Dokter Spesialis",
    amount: 15000000,
    category: "Pendapatan",
    type: "income",
  },
  {
    id: 2,
    date: "2023-03-02",
    description: "Pembayaran Sewa Apartemen",
    amount: 3500000,
    category: "Perumahan",
    type: "expense",
  },
  {
    id: 3,
    date: "2023-03-05",
    description: "Belanja Bulanan",
    amount: 1200000,
    category: "Makanan",
    type: "expense",
  },
  {
    id: 4,
    date: "2023-03-10",
    description: "Praktek Tambahan",
    amount: 2500000,
    category: "Pendapatan",
    type: "income",
  },
  {
    id: 5,
    date: "2023-03-12",
    description: "Tagihan Listrik",
    amount: 750000,
    category: "Utilitas",
    type: "expense",
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

const Transactions = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 hidden md:block">Transaksi</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Ekspor
          </Button>
          <Button size="sm" onClick={() => setShowForm(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Transaksi Baru
          </Button>
        </div>
      </div>

      {showForm ? (
        <Card>
          <CardHeader>
            <CardTitle>Tambah Transaksi Baru</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm onClose={() => setShowForm(false)} />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="income">Pemasukan</TabsTrigger>
            <TabsTrigger value="expense">Pengeluaran</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead className="text-right">Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {transaction.type === "income" ? (
                              <ArrowUpRight className="h-4 w-4 text-dsm-green" />
                            ) : (
                              <ArrowDownLeft className="h-4 w-4 text-destructive" />
                            )}
                            <span className={transaction.type === "income" ? "text-dsm-green" : "text-destructive"}>
                              {formatRupiah(transaction.amount)}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="income">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead className="text-right">Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter(t => t.type === 'income')
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <ArrowUpRight className="h-4 w-4 text-dsm-green" />
                              <span className="text-dsm-green">
                                {formatRupiah(transaction.amount)}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expense">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Deskripsi</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead className="text-right">Jumlah</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions
                      .filter(t => t.type === 'expense')
                      .map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{formatDate(transaction.date)}</TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <ArrowDownLeft className="h-4 w-4 text-destructive" />
                              <span className="text-destructive">
                                {formatRupiah(transaction.amount)}
                              </span>
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
      )}
    </div>
  );
};

export default Transactions;
