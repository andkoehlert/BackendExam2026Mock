export interface Quarter {
  quarter: string;
  percentage: number;
  afregnetArbejde: number;
  udstaendeTidsreg: number;
}

export interface QuarterlyData {
  year: number;
  quarters: Quarter[];
}
