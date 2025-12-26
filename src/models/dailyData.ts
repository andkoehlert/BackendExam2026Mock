import mongoose, { Schema } from "mongoose";
import { YearlyDailyData } from "../interfaces/dailyData";

const caseDetailsSchema = new Schema({
  meetings: { type: Number, required: true },
  hoursLogged: { type: Number, required: true },
  clientName: { type: String, required: true }
}, { _id: false });

const dailyDataSchema = new Schema({
  date: { type: String, required: true },
  settledAmount: { type: Number, required: true },
  caseValue: { type: Number, required: true },
  casesSettled: { type: Number, required: true },
  status: { type: String, required: true },
  workType: { type: String, required: true },
  industry: { type: String, required: true },
  caseIds: { type: [String], required: true },
  details: { type: caseDetailsSchema, required: true }
}, { _id: false });

const summarySchema = new Schema({
  totalSettled: { type: Number, required: true },
  totalCaseValue: { type: Number, required: true },
  totalCases: { type: Number, required: true },
  averagePerDay: { type: Number, required: true },
  activeByStatus: { type: Map, of: Number, required: true },
  byWorkType: { type: Map, of: Number, required: true },
  byIndustry: { type: Map, of: Number, required: true }
}, { _id: false });

const yearlyDailyDataSchema = new Schema<YearlyDailyData>({
userId: { type: String, required: true },
  year: { type: Number, required: true, unique: true },
  dailyData: { type: [dailyDataSchema], required: true },
  summary: { type: summarySchema, required: true }
});

export const dailyDataModel = mongoose.model<YearlyDailyData>("DailyData", yearlyDailyDataSchema);
