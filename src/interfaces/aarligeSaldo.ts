export interface YearlySaldoItem {
  year: number;
  afregnet: number;
  maal: number;
  completionPercentage: number;
  currency?: string;
}

export interface AarligeSaldoResponse {
  data: YearlySaldoItem[];
}
