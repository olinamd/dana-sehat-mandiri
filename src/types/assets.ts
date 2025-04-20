
export type AssetCategory = 'liquid' | 'investment' | 'personal';
export type LiabilityCategory = 'short-term' | 'long-term';

export interface Asset {
  id: number;
  name: string;
  amount: number;
  category: AssetCategory;
  subcategory: string;
}

export interface Liability {
  id: number;
  name: string;
  amount: number;
  category: LiabilityCategory;
  subcategory: string;
}
