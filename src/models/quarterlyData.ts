import mongoose, { Schema } from "mongoose";
import { QuarterlyData } from "../interfaces/quarterlyData";

const quarterSchema = new Schema({
  quarter: { type: String, required: true },
  percentage: { type: Number, required: true },
  afregnetArbejde: { type: Number, required: true },
  udstaendeTidsreg: { type: Number, required: true }
}, { _id: false });

const quarterlyDataSchema = new Schema<QuarterlyData>({
  year: { type: Number, required: true, unique: true },
  quarters: { type: [quarterSchema], required: true }
});

export const quarterlyDataModel = mongoose.model<QuarterlyData>("QuarterlyData", quarterlyDataSchema);
