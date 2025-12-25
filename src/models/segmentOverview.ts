// models/segmentOverview.ts
import mongoose, { Schema } from "mongoose";
import { SegmentOverviewResponse } from "../interfaces/segmentOverview";

const segmentItemSchema = new Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  amount: { type: Number, required: true }
}, { _id: false });

const segmentOverviewSchema = new Schema<SegmentOverviewResponse>({
  data: [{
    year: { type: Number, required: true },
    segments: { type: [segmentItemSchema], required: true }
  }]
});

export const segmentOverviewModel = mongoose.model<SegmentOverviewResponse>("SegmentOverview", segmentOverviewSchema);