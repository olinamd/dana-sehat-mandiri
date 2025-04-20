
import { Asset, Liability } from "@/types/assets";
import { DebtItem, ReceivableItem } from "@/types";

export const mockAssets: Asset[] = [
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

export const mockLiabilities: Liability[] = [
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

export const mockDebts: DebtItem[] = [
  {
    id: 1,
    name: "KPR Rumah",
    category: "long-term",
    subcategory: "Kredit Pemilikan Rumah",
    total: 800000000,
    remaining: 650000000,
    monthlyPayment: 7500000,
    dueDate: "2033-05-15",
    interestRate: 9.5,
  },
  {
    id: 2,
    name: "Kredit Mobil",
    category: "long-term",
    subcategory: "Kredit Pemilikan Mobil",
    total: 300000000,
    remaining: 180000000,
    monthlyPayment: 5300000,
    dueDate: "2026-08-22",
    interestRate: 7.5,
  }
];

export const mockReceivables: ReceivableItem[] = [
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
