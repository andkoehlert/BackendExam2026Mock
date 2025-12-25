import mongoose, { Schema } from "mongoose";
import { summaryDataEntry } from "../interfaces/summaryData";

const summaryDataEntrySchema = new Schema<summaryDataEntry>({
  year: { type: Number, required: true, unique: true },
  afregnetArbejde: { type: Number, required: true },
  udstaendeTidsregistrering: { type: Number, required: true },
  totalPotienale: { type: Number, required: true }
});

export const summaryDataModel = mongoose.model<summaryDataEntry>("SummaryData", summaryDataEntrySchema);
