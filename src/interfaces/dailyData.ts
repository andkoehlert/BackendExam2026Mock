export interface CaseDetails {
  meetings: number;
  hoursLogged: number;
  clientName: string;
}

export interface DailyData {
  date: string; // ISO date string
  settledAmount: number;
  caseValue: number;
  casesSettled: number;
  status: string;
  workType: string;
  industry: string;
  caseIds: string[];
  details: CaseDetails;
}

export interface Summary {
  totalSettled: number;
  totalCaseValue: number;
  totalCases: number;
  averagePerDay: number;
  activeByStatus: Record<string, number>;
  byWorkType: Record<string, number>;
  byIndustry: Record<string, number>;
}

export interface YearlyDailyData {
  year: number;
  dailyData: DailyData[];
  summary: Summary;
}

export interface DailyDataCollection {
  years: YearlyDailyData[];
}
