export interface YearlySaldoItem {
  year: number;
  afregnet: number;
  maal: number;
  completionPercentage: number;
  currency?: string;
}

export interface AarligeSaldoResponse {
userId: { type: String, required: true, index: true },
  data: YearlySaldoItem[];
}
