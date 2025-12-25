import { Request, Response } from "express";
import { quarterlyDataModel } from "../models/quarterlyData";
import { connect } from "../repositroy/database";

/**
 * Create new quarterly data
 */
export async function createQuarterlyData(req: Request, res: Response) {
  try {
    await connect();
    const quarterlyData = new quarterlyDataModel(req.body);
    const result = await quarterlyData.save();
    res.status(201).send({ data: result });
  } catch (err) {
    res.status(500).send("Error creating quarterly data: " + err);
  }
}

/**
 * Get all quarterly data
 */
export async function getAllQuarterlyData(req: Request, res: Response) {
  try {
    await connect();
    const result = await quarterlyDataModel.find({}).sort({ year: -1 });
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send("Error fetching quarterly data: " + err);
  }
}

/**
 * Get quarterly data by year
 */
export async function getQuarterlyDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await quarterlyDataModel.findOne({ year });
    if (!result) return res.status(404).send("Quarterly data not found for year: " + year);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching quarterly data: " + err);
  }
}

/**
 * Update quarterly data by year
 */
export async function updateQuarterlyDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await quarterlyDataModel.findOneAndUpdate({ year }, req.body, { new: true });
    if (!result) return res.status(404).send("Cannot update quarterly data for year: " + year);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating quarterly data: " + err);
  }
}

/**
 * Delete quarterly data by year
 */
export async function deleteQuarterlyDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await quarterlyDataModel.findOneAndDelete({ year });
    if (!result) return res.status(404).send("Cannot delete quarterly data for year: " + year);
    res.status(200).send("Quarterly data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting quarterly data: " + err);
  }
}
