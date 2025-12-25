export interface summaryDataEntry {
  year: number;
  afregnetArbejde: number;
  udstaendeTidsregistrering: number;
  totalPotienale: number;
}

export interface SummaryData {
  data: summaryDataEntry[];
}
