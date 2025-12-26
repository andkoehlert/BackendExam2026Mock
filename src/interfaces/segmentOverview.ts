export interface SegmentActual {
  name: string;
  count: number;        
  data: number[];       
  total: number;        
}

export interface ActualTotals {
  count: number;        
  data: number[];       
  grandTotal: number;   
}

export interface SegmentOverviewResponse {
  userId: string;
  year: number;         
  categories: string[]; 
  segments: SegmentActual[];
  totals: ActualTotals;
}