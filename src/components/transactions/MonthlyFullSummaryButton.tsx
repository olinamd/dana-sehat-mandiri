import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Transaction } from "@/types";
import { formatRupiah } from "@/utils/formatters";
import { ChevronLeft, ChevronRight, Edit } from "lucide-react";

type Group = "Need" | "Want" | "Save";
type CategoryMap = Record<
  Group,
  {
    label: string;
    categories: {
      main: string;
      sub: string;
      label: string;
    }[];
  }
>;

// Mapping kategori dan subkategori sesuai dokumen referensi
const CATEGORY_MAP: CategoryMap = {
  Need: {
    label: "NEED",
    categories: [
      { main: "Need - Tetap", sub: "Mobil & Motor Kredit", label: "Mobil & Motor Kredit" },
      { main: "Need - Tetap", sub: "Mobil & Motor Kebutuhan", label: "Mobil & Motor Kebutuhan" },
      { main: "Need - Tetap", sub: "Rumah - Listrik", label: "Rumah - Listrik" },
      { main: "Need - Tetap", sub: "Rumah - Air", label: "Rumah - Air" },
      { main: "Need - Tetap", sub: "Rumah - Gas", label: "Rumah - Gas" },
      { main: "Need - Tetap", sub: "Rumah - Sampah", label: "Rumah - Sampah" },
      { main: "Need - Tetap", sub: "Rumah - Air Minum", label: "Rumah - Air Minum" },
      { main: "Need - Tetap", sub: "Sekolah Anak", label: "Sekolah Anak" },
      { main: "Need - Tetap", sub: "Ekstrakulikuler Anak ke 1", label: "Ekstrakulikuler Anak ke 1" },
      { main: "Need - Tetap", sub: "Ekstrakulikuler Anak ke 2", label: "Ekstrakulikuler Anak ke 2" },
      { main: "Need - Tetap", sub: "Ekstrakulikuler Anak ke 3", label: "Ekstrakulikuler Anak ke 3" },
      { main: "Need - Tetap", sub: "ART ke 1", label: "ART ke 1" },
      { main: "Need - Tetap", sub: "ART ke 2", label: "ART ke 2" },
      { main: "Need - Tetap", sub: "ART ke 3", label: "ART ke 3" },
      { main: "Need - Tetap", sub: "Asuransi Jiwa", label: "Asuransi Jiwa" },
      { main: "Need - Tetap", sub: "Asuransi Kesehatan Suami", label: "Asuransi Kesehatan Suami" },
      { main: "Need - Tetap", sub: "Asuransi Kesehatan Istri", label: "Asuransi Kesehatan Istri" },
      { main: "Need - Tetap", sub: "Asuransi Kesehatan Anak", label: "Asuransi Kesehatan Anak" },
      { main: "Need - Tidak Tetap", sub: "Belanja Basah", label: "Belanja Basah" },
      { main: "Need - Tidak Tetap", sub: "Belanja Kering", label: "Belanja Kering" },
      { main: "Need - Tidak Tetap", sub: "Pendidikan Anggri", label: "Pendidikan Anggri" },
      { main: "Need - Tidak Tetap", sub: "Pendidikan Arni", label: "Pendidikan Arni" },
      { main: "Need - Tidak Tetap", sub: "Transportasi", label: "Transportasi" },
      { main: "Need - Tidak Tetap", sub: "Telpon & Internet", label: "Telpon & Internet" },
      { main: "Need - Tidak Tetap", sub: "Obat & Kesehatan", label: "Obat & Kesehatan" },
      { main: "Need - Tidak Tetap", sub: "Makan di Luar", label: "Makan di Luar" },
      { main: "Need - Tidak Tetap", sub: "Lain - Lain", label: "Lain - Lain" },
      { main: "Need - Tetap", sub: "Zakat", label: "Zakat" },
      { main: "Need - Tetap", sub: "Pajak", label: "Pajak" },
      { main: "Need - Tetap", sub: "Orang Tua Suami", label: "Orang Tua Suami" },
      { main: "Need - Tetap", sub: "Orang Tua Istri", label: "Orang Tua Istri" },
    ]
  },
  Want: {
    label: "WANT",
    categories: [
      { main: "Want - Hiburan", sub: "Momen", label: "Hiburan - Momen" },
      { main: "Want - Hiburan", sub: "Gadget", label: "Hiburan - Gadget" },
      { main: "Want - Hiburan", sub: "Fashion", label: "Hiburan - Fashion" },
      { main: "Want - Hiburan", sub: "Perawatan Diri", label: "Hiburan - Perawatan Diri" },
      { main: "Want - Hiburan", sub: "Makanan", label: "Hiburan - Makanan" },
      { main: "Want", sub: "Pendidikan", label: "Pendidikan" },
      { main: "Want", sub: "Cicilan Kredit", label: "Cicilan Kredit" },
      { main: "Want - Sosial", sub: "Teman", label: "Sosial - Teman" },
      { main: "Want - Sosial", sub: "Keluarga", label: "Sosial - Keluarga" },
      { main: "Want - Hiburan", sub: "Lain Lain", label: "Hiburan - Lain Lain" },
      { main: "Want", sub: "Bisnis", label: "Bisnis" },
    ]
  },
  Save: {
    label: "SAVE",
    categories: [
      { main: "Save - Investasi", sub: "Keluarga", label: "Investasi - Keluarga" },
      { main: "Save - Investasi", sub: "Suami", label: "Investasi - Suami" },
      { main: "Save - Investasi", sub: "Istri", label: "Investasi - Istri" },
      { main: "Save - Investasi", sub: "Anak", label: "Investasi - Anak" },
    ]
  }
};

// Kategori untuk arus kas masuk
const INCOME_CATEGORIES = [
  { main: "Pendapatan", sub: "Gaji Kerja Suami", label: "Gaji Kerja Suami" },
  { main: "Pendapatan", sub: "Gaji Kerja Istri", label: "Gaji Kerja Istri" },
  { main: "Pendapatan", sub: "Gaji Kerja Sampingan keluarga", label: "Gaji Kerja Sampingan keluarga" },
  { main: "Pendapatan", sub: "Pendapatan Bisnis Pertama", label: "Pendapatan Bisnis Pertama" },
  { main: "Pendapatan", sub: "Pendapatan Bisnis Kedua", label: "Pendapatan Bisnis Kedua" },
  { main: "Pendapatan", sub: "Pendapatan Lain - Lain", label: "Pendapatan Lain - Lain" },
  { main: "Pendapatan", sub: "Utang", label: "Utang" },
  { main: "Pendapatan", sub: "Hadiah", label: "Hadiah" },
  { main: "Pendapatan", sub: "Penghasilan Lain lain", label: "Penghasilan Lain lain" },
];

function groupTransactionsByMonth(transactions: Transaction[]) {
  const monthMap: Record<string, Transaction[]> = {};
  transactions.forEach((t) => {
    const monthKey = t.date.slice(0, 7); // yyyy-mm
    if (!monthMap[monthKey]) monthMap[monthKey] = [];
    monthMap[monthKey].push(t);
  });
  // Urutkan bulan terbaru ke atas
  return Object.entries(monthMap).sort((a, b) => b[0].localeCompare(a[0]));
}

const defaultBudgets = {
  Need: 0,
  Want: 0,
  Save: 0,
};

const MonthlyFullSummaryButton = ({ transactions }: { transactions: Transaction[] }) => {
  const monthsSorted = groupTransactionsByMonth(transactions);
  const [open, setOpen] = useState(false);
  const [monthIndex, setMonthIndex] = useState(0);

  const [budgets, setBudgets] = useState<{ Need: number; Want: number; Save: number }>(defaultBudgets);
  const [editGroup, setEditGroup] = useState<null | "Need" | "Want" | "Save">(null);
  const [editBudgetValue, setEditBudgetValue] = useState<number>(0);

  const monthKeys = monthsSorted.map(([month]) => month);
  const currentMonth = monthsSorted[monthIndex]?.[0] || "";
  const currentMonthTransactions = monthsSorted[monthIndex]?.[1] || [];

  // Helper to calculate realisasi per kategori
  function getRealizationFor(mainCategory: string, subCategory: string) {
    return currentMonthTransactions
      .filter((t) => t.mainCategory === mainCategory && t.subCategory === subCategory)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // SUM income total
  function getIncomeFor(subCategory: string) {
    return currentMonthTransactions
      .filter(
        (t) => t.type === "income" && t.subCategory === subCategory
      )
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // SUM arus kas keluar total per group
  function getGroupTotal(categories: {main: string; sub: string; label: string}[]) {
    return categories.reduce((sum, k) => sum + getRealizationFor(k.main, k.sub), 0);
  }

  // SUM seluruh masuk/keluar/save total
  const totalNeed = getGroupTotal(CATEGORY_MAP.Need.categories);
  const totalWant = getGroupTotal(CATEGORY_MAP.Want.categories);
  const totalSave = getGroupTotal(CATEGORY_MAP.Save.categories);

  const subtotalOut = totalNeed + totalWant;
  const totalIncome = INCOME_CATEGORIES.reduce((sum, item) => sum + getIncomeFor(item.sub), 0);
  const sisaAkhirBulan = totalIncome - (totalNeed + totalWant + totalSave);

  // SUM total pengeluaran (need+want+save) untuk footer
  const totalOut = totalNeed + totalWant + totalSave;

  // Modal edit budget
  const handleOpenEditBudget = (group: "Need" | "Want" | "Save") => {
    setEditGroup(group);
    setEditBudgetValue(budgets[group]);
  };
  const handleSaveBudget = () => {
    if (editGroup) {
      setBudgets({...budgets, [editGroup]: editBudgetValue });
      setEditGroup(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs">
          Rangkuman Riwayat Arus Kas Bulanan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[96vw] min-w-[350px] md:min-w-[800px] lg:min-w-[1150px]">
        <DialogHeader>
          <DialogTitle>Rangkuman Riwayat Arus Kas {currentMonth ? (
            <>Bulan {format(new Date(currentMonth + "-01"), "MMMM yyyy", { locale: id })}</>
          ) : null}</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between mb-2">
          <Button 
            variant="secondary" size="sm" 
            onClick={() => setMonthIndex(i => Math.max(i-1, 0))}
            disabled={monthIndex <= 0}
          >
            <ChevronLeft className="w-4 h-4" /> Bulan Sebelumnya
          </Button>
          <span className="font-bold text-lg">{currentMonth ? format(new Date(currentMonth + "-01"), "MMMM yyyy", { locale: id }) : ""}</span>
          <Button 
            variant="secondary" size="sm" 
            onClick={() => setMonthIndex(i => Math.min(i+1, monthsSorted.length-1))}
            disabled={monthIndex >= monthsSorted.length-1}
          >
            Bulan Berikutnya <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="overflow-auto max-h-[70vh] pb-2">
          {/* PENDAPATAN */}
          <div className="mb-4">
            <div className="font-bold text-dsm-green mb-1">ARUS KAS MASUK</div>
            <table className="w-full text-xs border mb-3">
              <thead>
                <tr className="bg-muted">
                  <th className="py-1 px-2 text-left">Kategori</th>
                  <th className="py-1 px-2 text-right">Realisasi</th>
                </tr>
              </thead>
              <tbody>
                {INCOME_CATEGORIES.map((kat) => (
                  <tr key={kat.label}>
                    <td className="py-1 px-2">{kat.label}</td>
                    <td className="py-1 px-2 text-right">{formatRupiah(getIncomeFor(kat.sub))}</td>
                  </tr>
                ))}
                <tr className="bg-accent font-bold">
                  <td className="py-1 px-2">TOTAL</td>
                  <td className="py-1 px-2 text-right">{formatRupiah(totalIncome)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* ARUS KAS KELUAR */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {(["Need", "Want", "Save"] as ("Need" | "Want" | "Save")[]).map((group) => (
              <div key={group} className="mb-3 border rounded relative pb-8">
                <div className={
                  group === "Need" 
                    ? "bg-[#D8605B] text-white font-bold py-1 px-2 flex justify-between items-center"
                    : group === "Want"
                      ? "bg-[#FFC914] text-black font-bold py-1 px-2 flex justify-between items-center"
                      : "bg-[#56B870] text-white font-bold py-1 px-2 flex justify-between items-center"
                }>
                  <span>{CATEGORY_MAP[group].label}</span>
                  <Button variant="ghost" size="icon" className="ml-2" onClick={() => handleOpenEditBudget(group)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr>
                      <th className="py-1 px-2 text-left">Keterangan</th>
                      <th className="py-1 px-2 text-right">Budget</th>
                      <th className="py-1 px-2 text-right">Realisasi</th>
                      <th className="py-1 px-2 text-right">Selisih</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CATEGORY_MAP[group].categories.map((kat) => {
                      const realisasi = getRealizationFor(kat.main, kat.sub);
                      // Dummy budget per kategori: bagi budget group secara merata ke seluruh subkategori
                      const groupBudget = budgets[group];
                      const budgetEach = groupBudget > 0 ? Math.round(groupBudget / CATEGORY_MAP[group].categories.length) : 0;
                      const budget = budgetEach;
                      const selisih = budget - realisasi;
                      return (
                        <tr key={kat.label}>
                          <td className="py-1 px-2">{kat.label}</td>
                          <td className="py-1 px-2 text-right text-muted-foreground">{formatRupiah(budget)}</td>
                          <td className="py-1 px-2 text-right">{formatRupiah(realisasi)}</td>
                          <td className={`py-1 px-2 text-right ${selisih < 0 ? "text-destructive" : "text-dsm-green"}`}>
                            {formatRupiah(selisih)}
                          </td>
                        </tr>
                      );
                    })}
                    <tr className={`font-bold ${group === "Save" ? "bg-[#eaf7ef]" : group === "Want" ? "bg-[#fff7e2]" : "bg-[#faeaea]"}`}>
                      <td className="py-1 px-2">SUB-TOTAL</td>
                      <td className="py-1 px-2 text-right text-muted-foreground">{formatRupiah(budgets[group])}</td>
                      <td className="py-1 px-2 text-right">{formatRupiah(getGroupTotal(CATEGORY_MAP[group].categories))}</td>
                      <td className="py-1 px-2 text-right">
                        {formatRupiah(budgets[group] - getGroupTotal(CATEGORY_MAP[group].categories))}
                      </td>
                    </tr>
                    {group === "Want" && (
                      <tr className="font-bold bg-[#f3f3f3]">
                        <td colSpan={4} className="py-1 px-2 text-right">
                          {/* Total pengeluaran setelah sub-total Want */}
                          TOTAL PENGELUARAN: <span className="text-destructive">{formatRupiah(totalOut)}</span>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          {/* SISA AKHIR BULAN */}
          <div className="mt-2 grid grid-cols-3 gap-2 font-bold">
            <div className="col-span-2 flex items-center justify-end space-x-4">
              <span className="text-gray-700">Sisa Akhir Bulan:</span>
              <span className={`text-xl ${sisaAkhirBulan < 0 ? "text-destructive" : "text-dsm-green"}`}>{formatRupiah(sisaAkhirBulan)}</span>
            </div>
            <div />
          </div>
        </div>

        {/* Dialog Edit Budget Per Group */}
        {editGroup && (
          <Dialog open={true} onOpenChange={() => setEditGroup(null)}>
            <DialogContent className="max-w-[320px]">
              <DialogHeader>
                <DialogTitle>Edit Budget {CATEGORY_MAP[editGroup].label}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Budget untuk {CATEGORY_MAP[editGroup].label}</label>
                <input
                  type="number"
                  className="border rounded px-2 py-1"
                  value={editBudgetValue}
                  min={0}
                  onChange={e => setEditBudgetValue(Number(e.target.value))}
                />
                <div className="flex flex-row-reverse gap-2 mt-2">
                  <Button onClick={handleSaveBudget} size="sm">Simpan</Button>
                  <Button variant="outline" onClick={() => setEditGroup(null)} size="sm">Batal</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

      </DialogContent>
    </Dialog>
  );
};

export default MonthlyFullSummaryButton;
