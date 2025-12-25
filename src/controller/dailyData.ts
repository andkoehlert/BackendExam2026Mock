import { Request, Response } from "express";
import { dailyDataModel } from "../models/dailyData";
import { connect } from "../repositroy/database";

/**
 * Create daily data (single or bulk)
 */
export async function createDailyData(req: Request, res: Response) {
  try {
    await connect();
    const yearsArray = req.body.years;

    if (!Array.isArray(yearsArray)) {
      return res.status(400).send("Request body must have a 'years' array.");
    }

    const result = await dailyDataModel.insertMany(yearsArray);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating daily data: " + err);
  }
}

/**
 * Get all daily data
 */
export async function getAllDailyData(req: Request, res: Response) {
  try {
    await connect();
    const result = await dailyDataModel.find({}).sort({ year: -1 });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching daily data: " + err);
  }
}

/**
 * Get daily data by year
 */
export async function getDailyDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await dailyDataModel.findOne({ year });

    if (!result) {
      return res.status(404).send({ years: [] });
    }

    // Wrap in "years" array so frontend can consume it
    res.status(200).send({ years: [result] });
  } catch (err) {
    res.status(500).send("Error fetching daily data: " + err);
  }
}


/**
 * Update daily data by year
 */
export async function updateDailyDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await dailyDataModel.findOneAndUpdate({ year }, req.body, { new: true });
    if (!result) return res.status(404).send("Cannot update daily data for year: " + year);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating daily data: " + err);
  }
}

/**
 * Delete daily data by year
 */
export async function deleteDailyDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await dailyDataModel.findOneAndDelete({ year });
    if (!result) return res.status(404).send("Cannot delete daily data for year: " + year);
    res.status(200).send("Daily data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting daily data: " + err);
  }
}
