export type TransactionSubCategory = {
  id: string;
  name: string;
};

export type TransactionCategory = {
  id: string;
  name: string;
  subcategories: TransactionSubCategory[];
};

export const cashFlowCategories = {
  expense: [
    {
      id: 'need-fixed',
      name: 'Kebutuhan Tetap',
      subcategories: [
        { id: 'vehicle-credit', name: 'Mobil & Motor Kredit' },
        { id: 'vehicle-needs', name: 'Mobil & Motor Kebutuhan' },
        { id: 'house-electricity', name: 'Rumah - Listrik' },
        { id: 'house-water', name: 'Rumah - Air' },
        { id: 'house-gas', name: 'Rumah - Gas' },
        { id: 'house-garbage', name: 'Rumah - Sampah' },
        { id: 'house-drinking-water', name: 'Rumah - Air Minum' },
        { id: 'children-school', name: 'Sekolah Anak' },
        { id: 'extracurricular-1', name: 'Ekstrakulikuler Anak ke 1' },
        { id: 'extracurricular-2', name: 'Ekstrakulikuler Anak ke 2' },
        { id: 'extracurricular-3', name: 'Ekstrakulikuler Anak ke 3' },
        { id: 'maid-1', name: 'ART ke 1' },
        { id: 'maid-2', name: 'ART ke 2' },
        { id: 'maid-3', name: 'ART ke 3' },
        { id: 'life-insurance', name: 'Asuransi Jiwa' },
        { id: 'health-insurance-husband', name: 'Asuransi Kesehatan Suami' },
        { id: 'health-insurance-wife', name: 'Asuransi Kesehatan Istri' },
        { id: 'health-insurance-children', name: 'Asuransi Kesehatan Anak' },
        { id: 'zakat', name: 'Zakat' },
        { id: 'tax', name: 'Pajak' },
        { id: 'parents-husband', name: 'Orang Tua Suami' },
        { id: 'parents-wife', name: 'Orang Tua Istri' },
      ],
    },
    {
      id: 'need-variable',
      name: 'Kebutuhan Tidak Tetap',
      subcategories: [
        { id: 'fresh-groceries', name: 'Belanja Basah' },
        { id: 'dry-groceries', name: 'Belanja Kering' },
        { id: 'education-husband', name: 'Pendidikan Suami' },
        { id: 'education-wife', name: 'Pendidikan Istri' },
        { id: 'transportation', name: 'Transportasi' },
        { id: 'phone-internet', name: 'Telpon & Internet' },
        { id: 'health-medicine', name: 'Obat & Kesehatan' },
        { id: 'eating-out', name: 'Makan di Luar' },
        { id: 'others', name: 'Lain-lain' },
      ],
    },
    {
      id: 'want',
      name: 'Keinginan',
      subcategories: [
        { id: 'entertainment-moments', name: 'Hiburan - Momen' },
        { id: 'entertainment-gadget', name: 'Hiburan - Gadget' },
        { id: 'entertainment-fashion', name: 'Hiburan - Fashion' },
        { id: 'entertainment-self-care', name: 'Hiburan - Perawatan Diri' },
        { id: 'entertainment-food', name: 'Hiburan - Makanan' },
        { id: 'education', name: 'Pendidikan' },
        { id: 'credit-installment', name: 'Cicilan Kredit' },
        { id: 'social-friends', name: 'Sosial - Teman' },
        { id: 'social-family', name: 'Sosial - Keluarga' },
        { id: 'entertainment-others', name: 'Hiburan - Lain-lain' },
        { id: 'business', name: 'Bisnis' },
      ],
    },
    {
      id: 'save',
      name: 'Tabungan & Investasi',
      subcategories: [
        { id: 'investment-family', name: 'Investasi - Keluarga' },
        { id: 'investment-husband', name: 'Investasi - Suami' },
        { id: 'investment-wife', name: 'Investasi - Istri' },
        { id: 'investment-children', name: 'Investasi - Anak' },
      ],
    },
  ],
  income: [
    {
      id: 'salary',
      name: 'Gaji',
      subcategories: [
        { id: 'salary-husband', name: 'Gaji Kerja Suami' },
        { id: 'salary-wife', name: 'Gaji Kerja Istri' },
        { id: 'side-job', name: 'Gaji Kerja Sampingan' },
      ],
    },
    {
      id: 'business',
      name: 'Bisnis',
      subcategories: [
        { id: 'business-1', name: 'Pendapatan Bisnis Pertama' },
        { id: 'business-2', name: 'Pendapatan Bisnis Kedua' },
      ],
    },
    {
      id: 'other',
      name: 'Lainnya',
      subcategories: [
        { id: 'other-income', name: 'Pendapatan Lain-lain' },
        { id: 'debt', name: 'Utang' },
        { id: 'gift', name: 'Hadiah' },
      ],
    },
  ],
};

export const assetCategories = [
  {
    id: 'liquid',
    name: 'Aset Likuid',
    subcategories: [
      { id: 'savings', name: 'Tabungan' },
      { id: 'receivables', name: 'Piutang' },
      { id: 'insurance-cash-value', name: 'Nilai Tunai Asuransi Jiwa' },
      { id: 'foreign-currency', name: 'Mata Uang Asing' },
    ],
  },
  {
    id: 'investment',
    name: 'Aset Investasi',
    subcategories: [
      { id: 'forex-trading', name: 'Trading Forex' },
      { id: 'time-deposit', name: 'Deposito' },
      { id: 'gold', name: 'Emas' },
      { id: 'mutual-funds', name: 'Reksa Dana' },
      { id: 'stocks', name: 'Saham' },
      { id: 'business-partner', name: 'Mitra Usaha' },
      { id: 'art-collection', name: 'Koleksi Seni' },
      { id: 'bonds', name: 'Obligasi' },
      { id: 'property', name: 'Properti' },
      { id: 'vehicle', name: 'Kendaraan' },
      { id: 'crypto', name: 'Mata Uang Kripto' },
      { id: 'index', name: 'Indeks' },
    ],
  },
  {
    id: 'personal',
    name: 'Aset Penggunaan Pribadi',
    subcategories: [
      { id: 'house', name: 'Rumah' },
      { id: 'vehicle', name: 'Kendaraan' },
      { id: 'art', name: 'Koleksi Seni' },
      { id: 'jewelry', name: 'Perhiasan' },
      { id: 'electronics', name: 'Elektronik' },
      { id: 'other-assets', name: 'Aset Lainnya' },
    ],
  },
];

export const liabilityCategories = [
  {
    id: 'short-term',
    name: 'Jangka Pendek',
    subcategories: [
      { id: 'credit-card', name: 'Kartu Kredit' },
      { id: 'friend-loan', name: 'Pinjaman Teman' },
      { id: 'family-loan', name: 'Pinjaman Keluarga' },
      { id: 'other-loan', name: 'Pinjaman Lain-lain' },
    ],
  },
  {
    id: 'long-term',
    name: 'Jangka Panjang',
    subcategories: [
      { id: 'mortgage', name: 'Kredit Pemilikan Rumah' },
      { id: 'car-loan', name: 'Kredit Pemilikan Mobil' },
      { id: 'business-loan', name: 'Pinjaman Usaha' },
      { id: 'other-long-loan', name: 'Pinjaman Lain-lain' },
    ],
  },
];
