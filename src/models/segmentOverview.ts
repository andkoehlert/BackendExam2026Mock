import mongoose, { Schema } from "mongoose";
import { SegmentOverviewResponse } from "../interfaces/segmentOverview";

const segmentActualSchema = new Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
  data: { type: [Number], required: true },
  total: { type: Number, required: true }
}, { _id: false });

const actualTotalsSchema = new Schema({
  count: { type: Number, required: true },
  data: { type: [Number], required: true },
  grandTotal: { type: Number, required: true }
}, { _id: false });

const segmentOverviewSchema = new Schema<SegmentOverviewResponse>({
  userId: { type: String, required: true, index: true },
  year: { type: Number, required: true },
  categories: { type: [String], required: true },
  segments: { type: [segmentActualSchema], required: true },
  totals: { type: actualTotalsSchema, required: true }
});

// Compound index to ensure unique year per user
segmentOverviewSchema.index({ userId: 1, year: 1 }, { unique: true });

export const segmentOverviewModel = mongoose.model<SegmentOverviewResponse>("SegmentOverview", segmentOverviewSchema);
