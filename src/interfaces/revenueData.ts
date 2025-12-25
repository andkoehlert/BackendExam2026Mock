// interfaces/revenueData.ts
export interface Segment {
  name: string;
  count: number;
  data: number[];
  total: number;
}

export interface Totals {
  count: number;
  data: number[];
  grandTotal: number;
}

export interface RevenueData {
  year: number;
  categories: string[];
  segments: Segment[];
  totals: Totals;
}