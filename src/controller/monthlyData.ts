// controller/monthlyData.ts
import { Request, Response } from "express";
import { monthlyDataModel } from "../models/monthlyData";
import { connect } from "../repositroy/database";


export async function createMonthlyData(req: Request, res: Response) {
  try {
    await connect();
    
    // Add userId from authenticated request
    const dataWithUserId = {
      ...req.body,
      userId: req.userId
    };
    
    const monthlyData = new monthlyDataModel(dataWithUserId);
    const result = await monthlyData.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating monthly data: " + err);
  }
}

/**
 * Get monthly data for authenticated user
 */
export async function getMonthlyDataByUser(req: Request, res: Response) {
  try {
    await connect();
    
    // Find data for this specific user
    const result = await monthlyDataModel.findOne({ userId: req.userId });
    
    if (!result) {
      return res.status(404).send({ 
        error: "No monthly data found for this user",
        data: [] 
      });
    }
    
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching monthly data: " + err);
  }
}

/**
 * Get all monthly data (admin only - optional)
 */
export async function getAllMonthlyData(req: Request, res: Response) {
  try {
    await connect();
    const result = await monthlyDataModel.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching monthly data: " + err);
  }
}

/**
 * Update monthly data for authenticated user
 */
export async function updateMonthlyDataByUser(req: Request, res: Response) {
  try {
    await connect();
    
    // Only update if it belongs to this user
    const result = await monthlyDataModel.findOneAndUpdate(
      { userId: req.userId },
      req.body,
      { new: true, upsert: true }  
    );
    
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating monthly data: " + err);
  }
}

/**
 * Delete monthly data for authenticated user
 */
export async function deleteMonthlyDataByUser(req: Request, res: Response) {
  try {
    await connect();
    
    const result = await monthlyDataModel.findOneAndDelete({ userId: req.userId });
    
    if (!result) {
      return res.status(404).send("No monthly data found to delete");
    }
    
    res.status(200).send("Monthly data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting monthly data: " + err);
  }
}