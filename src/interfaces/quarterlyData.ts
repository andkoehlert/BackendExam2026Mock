export interface QuarterlyData {
  userId: string;
  data: {
    year: number;
    quarters: {
      quarter: string;
      percentage: number;
      afregnetArbejde: number;
      udstaendeTidsreg: number;
    }[];
  }[];
}
