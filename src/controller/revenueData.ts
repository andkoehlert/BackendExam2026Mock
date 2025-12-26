import { Request, Response } from "express";
import { revenueDataModel } from "../models/revenueData";
import { connect } from "../repositroy/database";

/**
 * Create revenue data for authenticated user
 */
export async function createRevenueData(req: Request, res: Response) {
  try {
    await connect();
    
    const dataWithUserId = {
      ...req.body,
      userId: req.userId
    };
    
    const revenueData = new revenueDataModel(dataWithUserId);
    const result = await revenueData.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating revenue data: " + err);
  }
}

/**
 * Get all revenue data for authenticated user
 */
export async function getRevenueDataByUser(req: Request, res: Response) {
  try {
    await connect();
    
    const result = await revenueDataModel.find({ userId: req.userId }).sort({ year: -1 });
    
    if (!result || result.length === 0) {
      return res.status(404).send({ 
        error: "No revenue data found for this user",
        data: [] 
      });
    }
    
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching revenue data: " + err);
  }
}

/**
 * Get revenue data by year for authenticated user
 */
export async function getRevenueDataByYear(req: Request, res: Response) {
  try {
    await connect();
    
    const year = parseInt(req.params.year);
    const result = await revenueDataModel.findOne({ 
      userId: req.userId, 
      year 
    });
    
    if (!result) {
      return res.status(404).send("Revenue data not found for year: " + year);
    }
    
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching revenue data: " + err);
  }
}

/**
 * Get all revenue data (admin only)
 */
export async function getAllRevenueData(req: Request, res: Response) {
  try {
    await connect();
    const result = await revenueDataModel.find({}).sort({ year: -1 });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching revenue data: " + err);
  }
}

/**
 * Update revenue data by year for authenticated user
 */
export async function updateRevenueDataByYear(req: Request, res: Response) {
  try {
    await connect();
    
    const year = parseInt(req.params.year);
    const result = await revenueDataModel.findOneAndUpdate(
      { userId: req.userId, year },
      req.body,
      { new: true, upsert: true }
    );
    
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating revenue data: " + err);
  }
}

/**
 * Delete revenue data by year for authenticated user
 */
export async function deleteRevenueDataByYear(req: Request, res: Response) {
  try {
    await connect();
    
    const year = parseInt(req.params.year);
    const result = await revenueDataModel.findOneAndDelete({ 
      userId: req.userId, 
      year 
    });
    
    if (!result) {
      return res.status(404).send("Cannot delete revenue data for year: " + year);
    }
    
    res.status(200).send("Revenue data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting revenue data: " + err);
  }
}
