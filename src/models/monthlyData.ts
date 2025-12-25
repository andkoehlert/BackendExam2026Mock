// models/monthlyData.ts
import mongoose, { Schema } from "mongoose";
import { MonthlyDataResponse } from "../interfaces/monthlyData";

const monthDataSchema = new Schema({
  month: { type: String, required: true },
  monthNumber: { type: Number, required: true },
  afregnet: { type: Number, required: true },
  ditMaal: { type: Number, required: true }
}, { _id: false });

const monthlyDataSchema = new Schema<MonthlyDataResponse>({
  data: [{
    year: { type: Number, required: true },
    months: { type: [monthDataSchema], required: true }
  }]
});

export const monthlyDataModel = mongoose.model<MonthlyDataResponse>("MonthlyData", monthlyDataSchema);