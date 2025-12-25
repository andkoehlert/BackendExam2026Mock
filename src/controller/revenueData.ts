// composables/revenueData.ts
import { Request, Response } from "express";
import { revenueDataModel } from "../models/revenueData";
import { connect } from "../repositroy/database";

/**
 * Create new revenue data
 */
export async function createRevenueData(req: Request, res: Response) {
  try {
    await connect();
    const revenueData = new revenueDataModel(req.body);
    const result = await revenueData.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating revenue data: " + err);
  }
}

/**
 * Get all revenue data
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
 * Get revenue data by year
 */
export async function getRevenueDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await revenueDataModel.findOne({ year });
    if (!result) {
      return res.status(404).send("Revenue data not found for year: " + year);
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching revenue data: " + err);
  }
}

/**
 * Update revenue data by year
 */
export async function updateRevenueDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await revenueDataModel.findOneAndUpdate({ year }, req.body, { new: true });
    if (!result) {
      return res.status(404).send("Cannot update revenue data for year: " + year);
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating revenue data: " + err);
  }
}

/**
 * Delete revenue data by year
 */
export async function deleteRevenueDataByYear(req: Request, res: Response) {
  try {
    await connect();
    const year = parseInt(req.params.year);
    const result = await revenueDataModel.findOneAndDelete({ year });
    if (!result) {
      return res.status(404).send("Cannot delete revenue data for year: " + year);
    }
    res.status(200).send("Revenue data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting revenue data: " + err);
  }
}
