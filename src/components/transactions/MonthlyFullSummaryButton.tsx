
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Transaction } from "@/types";
import BudgetEditModal from "./BudgetEditModal";
import MonthlyFullSummaryTable from "./MonthlyFullSummaryTable";
import { useBudgetEdit } from "./useBudgetEdit";

// GROUP/CATEGORY/SUBCATEGORY STRUCTURE
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

// (Copy from your provided summary and category/subcategory mapping)
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

// INCOME CATEGORY MAPPING (from your excel image)
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

// Group transactions by month helper
function groupTransactionsByMonth(transactions: Transaction[]) {
  const monthMap: Record<string, Transaction[]> = {};
  transactions.forEach((t) => {
    const monthKey = t.date.slice(0, 7); // yyyy-mm
    if (!monthMap[monthKey]) monthMap[monthKey] = [];
    monthMap[monthKey].push(t);
  });
  return Object.entries(monthMap).sort((a, b) => b[0].localeCompare(a[0]));
}

// The actual dialog/button component
interface MonthlyFullSummaryButtonProps {
  transactions: Transaction[];
  onMonthChange?: (month: string | null) => void;
}

const MonthlyFullSummaryButton = ({ transactions, onMonthChange }: MonthlyFullSummaryButtonProps) => {
  const monthsSorted = groupTransactionsByMonth(transactions);
  const [open, setOpen] = useState(false);
  const [monthIndex, setMonthIndex] = useState(0);

  // This could be loaded from an API or storage instead for real use
  const initialBudgets: Record<string, number> = {};
  (["Need", "Want", "Save"] as Group[]).forEach(group => {
    CATEGORY_MAP[group].categories.forEach(cat => {
      initialBudgets[`${group}|${cat.label}`] = 0;
    });
  });

  const {
    budgets,
    setBudgets,
    editTarget,
    editBudgetValue,
    setEditBudgetValue,
    openEdit,
    closeEdit,
    saveEdit,
  } = useBudgetEdit(initialBudgets);

  const monthKeys = monthsSorted.map(([month]) => month);
  const currentMonth = monthsSorted[monthIndex]?.[0] || "";
  const currentMonthTransactions = monthsSorted[monthIndex]?.[1] || [];

  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(currentMonth || null);
    }
  }, [currentMonth, onMonthChange]);

  useEffect(() => {
    if (!open && onMonthChange) {
      onMonthChange(null);
    }
  }, [open, onMonthChange]);

  function getRealizationFor(mainCategory: string, subCategory: string) {
    return currentMonthTransactions
      .filter((t) => t.mainCategory === mainCategory && t.subCategory === subCategory)
      .reduce((sum, t) => sum + t.amount, 0);
  }

  function getIncomeFor(subCategory: string) {
    return currentMonthTransactions
      .filter(
        (t) => t.type === "income" && t.subCategory === subCategory
      )
      .reduce((sum, t) => sum + t.amount, 0);
  }

  function getGroupTotal(categories: { main: string; sub: string; label: string }[]) {
    return categories.reduce((sum, k) => sum + getRealizationFor(k.main, k.sub), 0);
  }

  function getGroupBudget(group: Group) {
    return CATEGORY_MAP[group].categories.reduce(
      (tot, cat) => tot + (budgets[`${group}|${cat.label}`] || 0),
      0
    );
  }

  const totalNeed = getGroupTotal(CATEGORY_MAP.Need.categories);
  const totalWant = getGroupTotal(CATEGORY_MAP.Want.categories);
  const totalSave = getGroupTotal(CATEGORY_MAP.Save.categories);

  const subtotalOut = totalNeed + totalWant;
  const totalOut = totalNeed + totalWant + totalSave;

  const totalIncome = INCOME_CATEGORIES.reduce((sum, item) => sum + getIncomeFor(item.sub), 0);
  const sisaAkhirBulan = totalIncome - totalOut;

  const handleOpenEditBudget = (group: Group, label: string) => {
    openEdit(group, label, budgets[`${group}|${label}`] || 0);
  };

  const handleSaveBudget = () => {
    saveEdit();
  };

  const handleMonthChange = (newIndex: number) => {
    setMonthIndex(newIndex);
    if (onMonthChange) {
      const newMonth = monthsSorted[newIndex]?.[0] || null;
      onMonthChange(newMonth);
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
          <DialogTitle>
            Rangkuman Riwayat Arus Kas {currentMonth ? (
              <>Bulan {format(new Date(currentMonth + "-01"), "MMMM yyyy", { locale: id })}</>
            ) : null}
          </DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between mb-2">
          <Button
            variant="secondary" size="sm"
            onClick={() => handleMonthChange(Math.max(monthIndex - 1, 0))}
            disabled={monthIndex <= 0}
          >
            Sebelumnya
          </Button>
          <span className="font-bold text-lg">{currentMonth ? format(new Date(currentMonth + "-01"), "MMMM yyyy", { locale: id }) : ""}</span>
          <Button
            variant="secondary" size="sm"
            onClick={() => handleMonthChange(Math.min(monthIndex + 1, monthsSorted.length - 1))}
            disabled={monthIndex >= monthsSorted.length - 1}
          >
            Berikutnya
          </Button>
        </div>
        <MonthlyFullSummaryTable
          CATEGORY_MAP={CATEGORY_MAP}
          INCOME_CATEGORIES={INCOME_CATEGORIES}
          totalIncome={totalIncome}
          getIncomeFor={getIncomeFor}
          totalNeed={totalNeed}
          totalWant={totalWant}
          totalSave={totalSave}
          getGroupTotal={getGroupTotal}
          getGroupBudget={getGroupBudget}
          getRealizationFor={getRealizationFor}
          budgets={budgets}
          onEdit={handleOpenEditBudget}
          currentMonth={currentMonth}
          sisaAkhirBulan={sisaAkhirBulan}
        />
        <BudgetEditModal
          open={!!editTarget}
          onClose={closeEdit}
          label={editTarget?.label || ""}
          value={editBudgetValue}
          onChange={setEditBudgetValue}
          onSave={handleSaveBudget}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MonthlyFullSummaryButton;

