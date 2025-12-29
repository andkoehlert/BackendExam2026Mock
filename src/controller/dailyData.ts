import { Request, Response } from "express";
import { dailyDataModel } from "../models/dailyData";
import { connect } from "../repositroy/database";

/**
 * Create daily data for authenticated user
 */
export async function createDailyData(req: Request, res: Response) {
  try {
    await connect();
    const yearsArray = req.body.years;

    if (!Array.isArray(yearsArray)) {
      return res.status(400).send("Request body must have a 'years' array.");
    }

    const yearsWithUserId = yearsArray.map(year => ({
      ...year,
      userId: req.userId
    }));

    const result = await dailyDataModel.insertMany(yearsWithUserId);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating daily data: " + err);
  }
}

/**
 * Get daily data for authenticated user
 */
export async function getDailyDataByUser(req: Request, res: Response) {
  try {
    await connect();
    const result = await dailyDataModel.find({ userId: req.userId }).sort({ year: -1 });
    
    if (!result || result.length === 0) {
      return res.status(404).send({ 
        error: "No daily data found for this user",
        years: [] 
      });
    }
    
    res.status(200).send({ years: result });
  } catch (err) {
    res.status(500).send("Error fetching daily data: " + err);
  }
}

/**
 * Get all daily data (admin only)
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
 * Get daily data by year for authenticated user
 */
export async function getDailyDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await dailyDataModel.findOne({ 
      year,
      userId: req.userId 
    });

    if (!result) {
      return res.status(404).send({ 
        error: "No daily data found for this year",
        years: [] 
      });
    }

    res.status(200).send({ years: [result] });
  } catch (err) {
    res.status(500).send("Error fetching daily data: " + err);
  }
}

/**
 * Update daily data by year for authenticated user
 */
export async function updateDailyDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    
    const result = await dailyDataModel.findOneAndUpdate(
      { year, userId: req.userId },
      { ...req.body, userId: req.userId },
      { new: true, upsert: true }
    );
    
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating daily data: " + err);
  }
}

/**
 * Delete daily data by year for authenticated user
 */
export async function deleteDailyDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await dailyDataModel.findOneAndDelete({ 
      year,
      userId: req.userId 
    });
    
    if (!result) {
      return res.status(404).send("Cannot delete daily data for year: " + year);
    }
    
    res.status(200).send("Daily data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting daily data: " + err);
  }
}