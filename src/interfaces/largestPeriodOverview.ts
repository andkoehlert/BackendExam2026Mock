export interface PeriodAmount {
  amount: number;
  currency: string;
}

export interface StoersteMaaned extends PeriodAmount {
  month: string;
  monthNumber: number;
}

export interface StoersteAar extends PeriodAmount {
  year: number;
}

export interface StoersteKvartal extends PeriodAmount {
  quarter: string;
  quarterNumber: number;
}

export interface YearLargestPeriodData {
  year: number;
  stoersteMaaned: StoersteMaaned;
  stoersteAar: StoersteAar;
  stoersteKvartal: StoersteKvartal;
}

export interface LargestPeriodOverviewResponse {
  data: YearLargestPeriodData[];
}
