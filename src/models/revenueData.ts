// models/revenueData.ts
import mongoose, { Schema } from "mongoose";
import { RevenueData } from "../interfaces/revenueData";

const segmentSchema = new Schema({
  name: { type: String, required: true },
  count: { type: Number, required: true },
  data: { type: [Number], required: true },
  total: { type: Number, required: true }
}, { _id: false });

const totalsSchema = new Schema({
  count: { type: Number, required: true },
  data: { type: [Number], required: true },
  grandTotal: { type: Number, required: true }
}, { _id: false });

const revenueDataSchema = new Schema<RevenueData>({
    userId: { type: String, required: true, index: true },
  year: { type: Number, required: true, unique: true },
  categories: { type: [String], required: true },
  segments: { type: [segmentSchema], required: true },
  totals: { type: totalsSchema, required: true }
});

export const revenueDataModel = mongoose.model<RevenueData>("RevenueData", revenueDataSchema);