import { Request, Response } from "express";
import { summaryDataModel } from "../models/summaryData";
import { connect } from "../repositroy/database";

/**
 * Create summary data for authenticated user
 */
export async function createSummaryData(req: Request, res: Response) {
  try {
    await connect();
    
    const dataWithUserId = {
      userId: req.userId,
      data: req.body.data
    };
    
    const summaryData = new summaryDataModel(dataWithUserId);
    const result = await summaryData.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating summary data: " + err);
  }
}

/**
 * Get summary data for authenticated user
 */
export async function getSummaryDataByUser(req: Request, res: Response) {
  try {
    await connect();
    
    const result = await summaryDataModel.findOne({ userId: req.userId });
    
    if (!result) {
      return res.status(404).send({ 
        error: "No summary data found for this user",
        data: [] 
      });
    }
    
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching summary data: " + err);
  }
}

/**
 * Get summary data by year for authenticated user
 */
export async function getSummaryDataByYear(req: Request, res: Response) {
  try {
    await connect();
    
    const year = parseInt(req.params.year);
    const result = await summaryDataModel.findOne({ userId: req.userId });
    
    if (!result) {
      return res.status(404).send("Summary data not found for user");
    }
    
    const yearData = result.data.find(entry => entry.year === year);
    
    if (!yearData) {
      return res.status(404).send("Summary data not found for year: " + year);
    }
    
    res.status(200).send(yearData);
  } catch (err) {
    res.status(500).send("Error fetching summary data: " + err);
  }
}

/**
 * Get all summary data (admin only)
 */
export async function getAllSummaryData(req: Request, res: Response) {
  try {
    await connect();
    const result = await summaryDataModel.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching summary data: " + err);
  }
}

/**
 * Update summary data for authenticated user
 */
export async function updateSummaryDataByUser(req: Request, res: Response) {
  try {
    await connect();
    
    const result = await summaryDataModel.findOneAndUpdate(
      { userId: req.userId },
      { data: req.body.data },
      { new: true, upsert: true }
    );
    
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating summary data: " + err);
  }
}

/**
 * Update summary data by year for authenticated user
 */
export async function updateSummaryDataByYear(req: Request, res: Response) {
  try {
    await connect();
    
    const year = parseInt(req.params.year);
    const result = await summaryDataModel.findOne({ userId: req.userId });
    
    if (!result) {
      return res.status(404).send("Summary data not found for user");
    }
    
    // Find and update the specific year
    const yearIndex = result.data.findIndex(entry => entry.year === year);
    
    if (yearIndex === -1) {
      // Year doesn't exist, add it
      result.data.push({
        year,
        ...req.body
      });
    } else {
      // Year exists, update it
      result.data[yearIndex] = {
        year,
        ...req.body
      };
    }
    
    await result.save();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating summary data: " + err);
  }
}

/**
 * Delete summary data for authenticated user
 */
export async function deleteSummaryDataByUser(req: Request, res: Response) {
  try {
    await connect();
    
    const result = await summaryDataModel.findOneAndDelete({ userId: req.userId });
    
    if (!result) {
      return res.status(404).send("No summary data found to delete");
    }
    
    res.status(200).send("Summary data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting summary data: " + err);
  }
}

/**
 * Delete summary data by year for authenticated user
 */
export async function deleteSummaryDataByYear(req: Request, res: Response) {
  try {
    await connect();
    
    const year = parseInt(req.params.year);
    const result = await summaryDataModel.findOne({ userId: req.userId });
    
    if (!result) {
      return res.status(404).send("Summary data not found for user");
    }
    
    // Filter out the specific year
    result.data = result.data.filter(entry => entry.year !== year);
    await result.save();
    
    res.status(200).send("Summary data for year " + year + " deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting summary data: " + err);
  }
}