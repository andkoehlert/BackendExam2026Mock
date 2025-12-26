import { Request, Response } from "express";
import { quarterlyDataModel } from "../models/quarterlyData";
import { connect } from "../repositroy/database";

/**
 * Create quarterly data for authenticated user
 */
export async function createQuarterlyData(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const dataWithUserId = {
      ...req.body,
      userId: req.userId
    };

    const quarterlyData = new quarterlyDataModel(dataWithUserId);
    const result = await quarterlyData.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating quarterly data: " + err);
  }
}

/**
 * Get quarterly data for authenticated user
 */
export async function getQuarterlyDataByUser(req: Request, res: Response) {
  try {
    await connect();

    const result = await quarterlyDataModel.findOne({ userId: req.userId });

    if (!result) {
      return res.status(404).send({
        error: "No quarterly data found for this user",
        data: []
      });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching quarterly data: " + err);
  }
}

/**
 * Get all quarterly data (admin only)
 */
export async function getAllQuarterlyData(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const result = await quarterlyDataModel.find({}).sort({ createdAt: -1 });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching quarterly data: " + err);
  }
}

/**
 * Update quarterly data for authenticated user
 */
export async function updateQuarterlyDataByUser(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const result = await quarterlyDataModel.findOneAndUpdate(
      { userId: req.userId },
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating quarterly data: " + err);
  }
}

/**
 * Delete quarterly data for authenticated user
 */
export async function deleteQuarterlyDataByUser(req: Request, res: Response) {
  try {
    await connect();

    const result = await quarterlyDataModel.findOneAndDelete({ userId: req.userId });

    if (!result) {
      return res.status(404).send("No quarterly data found to delete");
    }

    res.status(200).send("Quarterly data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting quarterly data: " + err);
  }
}
