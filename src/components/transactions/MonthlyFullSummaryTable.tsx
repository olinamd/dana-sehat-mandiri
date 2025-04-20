
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatRupiah } from "@/utils/formatters";
import BudgetRow from "./BudgetRow";
import { Transaction } from "@/types";

// Types used
type Group = "Need" | "Want" | "Save";

// Props for table, konsisten dengan summary requirements
interface Category {
  main: string;
  sub: string;
  label: string;
}
interface CategoryMapType {
  [key: string]: {
    label: string;
    categories: Category[];
  };
}
interface IncomeCategory {
  main: string;
  sub: string;
  label: string;
}
interface MonthlyFullSummaryTableProps {
  CATEGORY_MAP: CategoryMapType;
  INCOME_CATEGORIES: IncomeCategory[];
  totalIncome: number;
  getIncomeFor: (subCategory: string) => number;
  totalNeed: number;
  totalWant: number;
  totalSave: number;
  getGroupTotal: (categories: Category[]) => number;
  getGroupBudget: (group: Group) => number;
  getRealizationFor: (mainCategory: string, subCategory: string) => number;
  budgets: Record<string, number>;
  onEdit: (group: Group, label: string) => void;
  currentMonth?: string | null;
  sisaAkhirBulan: number;
  // === Tambahan: data transaksi bulan berjalan
  transactions?: Transaction[];
}

const MonthlyFullSummaryTable = ({
  CATEGORY_MAP,
  INCOME_CATEGORIES,
  totalIncome,
  getIncomeFor,
  totalNeed,
  totalWant,
  totalSave,
  getGroupTotal,
  getGroupBudget,
  getRealizationFor,
  budgets,
  onEdit,
  currentMonth,
  sisaAkhirBulan,
  transactions,
}: MonthlyFullSummaryTableProps) => {
  // Helper realisasi sub kategori by transaksi month berjalan (hanya EXPENSE)
  function getRealisasiSubCategory(main: string, sub: string) {
    if (!transactions) return 0;
    return transactions
      .filter(
        t =>
          t.type === "expense" &&
          t.mainCategory === main &&
          t.subCategory === sub &&
          (!currentMonth || t.date.startsWith(currentMonth))
      )
      .reduce((sum, t) => sum + t.amount, 0);
  }
  // Untuk group total by kategori (Need, Want, Save)
  function getTotalByGroup(categories: Category[]) {
    if (!transactions) return 0;
    return categories.reduce(
      (sum, cat) => sum + getRealisasiSubCategory(cat.main, cat.sub),
      0
    );
  }

  return (
    <div className="overflow-auto max-h-[70vh] pb-2 bg-white">
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
                <td className="py-1 px-2 text-right">
                  {formatRupiah(getIncomeFor(kat.sub))}
                </td>
              </tr>
            ))}
            <tr className="bg-accent font-bold">
              <td className="py-1 px-2">TOTAL</td>
              <td className="py-1 px-2 text-right">
                {formatRupiah(totalIncome)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {(["Need", "Want", "Save"] as Group[]).map((group) => (
          <div
            key={group}
            className="mb-3 border rounded relative pb-8 bg-white shadow-sm"
          >
            <div
              className={
                group === "Need"
                  ? "bg-[#D8605B] text-white font-bold py-1 px-2 flex justify-between items-center"
                  : group === "Want"
                  ? "bg-[#FFC914] text-black font-bold py-1 px-2 flex justify-between items-center"
                  : "bg-[#56B870] text-white font-bold py-1 px-2 flex justify-between items-center"
              }
            >
              <span>{CATEGORY_MAP[group].label}</span>
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
                {CATEGORY_MAP[group].categories.map((kat) => (
                  <BudgetRow
                    key={kat.label}
                    group={group}
                    label={kat.label}
                    main={kat.main}
                    sub={kat.sub}
                    budget={budgets[`${group}|${kat.label}`] || 0}
                    // Ambil realisasi asli dari transaksi sesuai bulan & subkategori
                    realisasi={getRealisasiSubCategory(kat.main, kat.sub)}
                    onEdit={onEdit}
                  />
                ))}
                <tr
                  className={`font-bold ${
                    group === "Save"
                      ? "bg-[#eaf7ef]"
                      : group === "Want"
                      ? "bg-[#fff7e2]"
                      : "bg-[#faeaea]"
                  }`}
                >
                  <td className="py-1 px-2">SUB-TOTAL</td>
                  <td className="py-1 px-2 text-right text-muted-foreground">
                    {formatRupiah(getGroupBudget(group))}
                  </td>
                  <td className="py-1 px-2 text-right">
                    {formatRupiah(
                      getTotalByGroup(CATEGORY_MAP[group].categories)
                    )}
                  </td>
                  <td className="py-1 px-2 text-right">
                    {formatRupiah(
                      getGroupBudget(group) -
                        getTotalByGroup(CATEGORY_MAP[group].categories)
                    )}
                  </td>
                </tr>
                {group === "Want" && (
                  <tr className="font-bold bg-[#f3f3f3]">
                    <td colSpan={4} className="py-1 px-2 text-right">
                      TOTAL PENGELUARAN:{" "}
                      <span className="text-destructive">
                        {formatRupiah(
                          getTotalByGroup(CATEGORY_MAP.Need.categories) +
                            getTotalByGroup(CATEGORY_MAP.Want.categories)
                        )}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2 font-bold">
        <div className="col-span-2 flex items-center justify-end space-x-4">
          <span className="text-gray-700">Sisa Akhir Bulan:</span>
          <span
            className={`text-xl ${
              sisaAkhirBulan < 0 ? "text-destructive" : "text-dsm-green"
            }`}
          >
            {formatRupiah(sisaAkhirBulan)}
          </span>
        </div>
        <div />
      </div>
    </div>
  );
};

export default MonthlyFullSummaryTable;

