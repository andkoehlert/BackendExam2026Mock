import { Request, Response } from "express";
import { summaryDataModel } from "../models/summaryData";
import { connect } from "../repositroy/database";

/**
 * Create multiple daily data entries
 */
export async function createSummaryData(req: Request, res: Response) {
  try {
    await connect();
    const data = req.body.data; // expects { data: [...] }
    const result = await summaryDataModel.insertMany(data, { ordered: false });
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating daily data: " + err);
  }
}

/**
 * Get all daily data
 */
export async function getAllSummaryData(req: Request, res: Response) {
  try {
    await connect();
    const result = await summaryDataModel.find({}).sort({ year: -1 });

    // Wrap the array in an object
    res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send("Error fetching daily data: " + err);
  }
}


/**
 * Get daily data by year
 */
export async function getSummaryDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await summaryDataModel.findOne({ year });
    if (!result) {
      return res.status(404).send("Daily data not found for year: " + year);
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching daily data: " + err);
  }
}

/**
 * Update daily data by year
 */
export async function updateSummaryDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await summaryDataModel.findOneAndUpdate({ year }, req.body, { new: true });
    if (!result) {
      return res.status(404).send("Cannot update daily data for year: " + year);
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating daily data: " + err);
  }
}

/**
 * Delete daily data by year
 */
export async function deleteSummaryDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await summaryDataModel.findOneAndDelete({ year });
    if (!result) {
      return res.status(404).send("Cannot delete daily data for year: " + year);
    }
    res.status(200).send("Daily data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting daily data: " + err);
  }
}
