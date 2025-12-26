// interfaces/segmentOverview.ts
export interface SegmentItem {
  name: string;
  percentage: number;
  amount: number;
}

export interface YearSegmentData {
  year: number;
  segments: SegmentItem[];
}

export interface SegmentOverviewResponse {
     userId: string;
  data: YearSegmentData[];
}