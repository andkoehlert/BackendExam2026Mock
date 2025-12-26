import mongoose, { Schema } from "mongoose";
import { AarligeSaldoResponse } from "../interfaces/aarligeSaldo";

const yearlySaldoSchema = new Schema(
  {
    year: { type: Number, required: true },
    afregnet: { type: Number, required: true },
    maal: { type: Number, required: true },
    completionPercentage: { type: Number, required: true },
    currency: { type: String, required: false }
  },
  { _id: false }
);

const aarligeSaldoSchema = new Schema<AarligeSaldoResponse>({
    userId: { type: String, required: true, index: true },
  data: { type: [yearlySaldoSchema], required: true }
});

export const aarligeSaldoModel =
  mongoose.model<AarligeSaldoResponse>(
    "AarligeSaldo",
    aarligeSaldoSchema
  );
