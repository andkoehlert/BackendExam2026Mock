import mongoose, { Schema } from "mongoose";
import { LargestPeriodOverviewResponse } from "../interfaces/largestPeriodOverview";

const stoersteMaanedSchema = new Schema({
  month: { type: String, required: true },
  monthNumber: { type: Number, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true }
}, { _id: false });

const stoersteAarSchema = new Schema({
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true }
}, { _id: false });

const stoersteKvartalSchema = new Schema({
  quarter: { type: String, required: true },
  quarterNumber: { type: Number, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true }
}, { _id: false });

const yearLargestPeriodSchema = new Schema({
  year: { type: Number, required: true },
  stoersteMaaned: { type: stoersteMaanedSchema, required: true },
  stoersteAar: { type: stoersteAarSchema, required: true },
  stoersteKvartal: { type: stoersteKvartalSchema, required: true }
}, { _id: false });

const largestPeriodOverviewSchema = new Schema<LargestPeriodOverviewResponse>({
  data: { type: [yearLargestPeriodSchema], required: true }
});

export const largestPeriodOverviewModel =
  mongoose.model<LargestPeriodOverviewResponse>(
    "LargestPeriodOverview",
    largestPeriodOverviewSchema
  );
