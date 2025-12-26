import mongoose, { Schema } from "mongoose";
import { summaryDataEntry, SummaryData } from "../interfaces/summaryData";

const summaryDataEntrySchema = new Schema({
  year: { type: Number, required: true },
  afregnetArbejde: { type: Number, required: true },
  udstaendeTidsregistrering: { type: Number, required: true },
  totalPotienale: { type: Number, required: true }
}, { _id: false });

const summaryDataSchema = new Schema<SummaryData>({
  userId: { type: String, required: true, index: true },
  data: { type: [summaryDataEntrySchema], required: true }
});

// Compound index to ensure unique userId
summaryDataSchema.index({ userId: 1 }, { unique: true });

export const summaryDataModel = mongoose.model<SummaryData>("SummaryData", summaryDataSchema);
