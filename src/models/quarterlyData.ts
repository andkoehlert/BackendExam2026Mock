import mongoose, { Schema } from "mongoose";
import { QuarterlyData } from "../interfaces/quarterlyData";

const quarterSchema = new Schema(
  {
    quarter: { type: String, required: true, enum: ["Q1", "Q2", "Q3", "Q4"] },
    percentage: { type: Number, required: true },
    afregnetArbejde: { type: Number, required: true },
    udstaendeTidsreg: { type: Number, required: true }
  },
  { _id: false }
);

const yearlyQuarterSchema = new Schema(
  {
    year: { type: Number, required: true },
    quarters: { type: [quarterSchema], required: true }
  },
  { _id: false }
);

const quarterlyDataSchema = new Schema<QuarterlyData>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    data: { type: [yearlyQuarterSchema], required: true }
  },
  { timestamps: true }
);

export const quarterlyDataModel = mongoose.model<QuarterlyData>(
  "QuarterlyData",
  quarterlyDataSchema
);
