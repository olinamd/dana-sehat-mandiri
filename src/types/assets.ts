export type AssetCategory = 'liquid' | 'investment' | 'personal';
export type LiabilityCategory = 'short-term' | 'long-term';

export interface Asset {
  id: number;
  name: string;
  amount: number;
  category: AssetCategory;
  subcategory: string;
  transactionId?: number; // To link with transaction history
}

export interface Liability {
  id: number;
  name: string;
  amount: number;
  category: LiabilityCategory;
  subcategory: string;
  dueDate?: string; // Added missing property
  monthlyPayment?: number; // Added missing property
  transactionId?: number; // To link with transaction history
}

// Define fixed category structures
export const FIXED_ASSET_CATEGORIES = {
  liquid: [
    "Tabungan",
    "Piutang",
    "Nilai Tunai Asuransi Jiwa",
    "Mata Uang Asing (dalam Rp)",
  ],
  investment: [
    "Trading Forex",
    "Deposito",
    "Emas",
    "Reksa Dana",
    "Saham",
    "Mitra Usaha",
    "Koleksi Seni",
    "Obligasi",
    "Properti",
    "Kendaraan",
    "Mata Uang Kripto",
    "Indeks",
  ],
  personal: [
    "Rumah",
    "Kendaraan",
    "Koleksi Seni",
    "Perhiasan",
    "Elektronik",
    "Aset Lainnya",
  ],
};

export const FIXED_LIABILITY_CATEGORIES = {
  "short-term": [
    "Kartu Kredit",
    "Pinjaman Teman",
    "Pinjaman Keluarga",
    "Pinjaman Lain - Lain",
  ],
  "long-term": [
    "Kredit Pemilikan Rumah",
    "Kredit Pemilikan Mobil",
    "Pinjaman Usaha",
    "Pinjaman Lain - Lain",
  ],
};

export const HUTANG_CATEGORIES = [
  "Kredit Pemilikan Rumah",
  "Kredit Pemilikan Mobil",
  "Pinjaman Teman",
  "Pinjaman Keluarga",
  "Pinjaman Usaha",
  "Pinjaman Lain - Lain",
  "Kartu Kredit",
];
