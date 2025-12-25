// interfaces/monthlyData.ts
export interface MonthData {
  month: string;
  monthNumber: number;
  afregnet: number;
  ditMaal: number;
}

export interface YearMonthlyData {
  year: number;
  months: MonthData[];
}

export interface MonthlyDataResponse {
  data: YearMonthlyData[];
}