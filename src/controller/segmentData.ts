import { Request, Response } from 'express';
import { segmentOverviewModel } from '../models/segmentOverview';
import { connect } from '../repositroy/database';

/**
 * Create segment overview data for authenticated user
 */
export async function createSegmentOverview(req: Request, res: Response): Promise<void> {
  try {
    await connect();
    
    const dataWithUserId = {
      ...req.body,
      userId: req.userId
    };
    
    const segmentOverview = new segmentOverviewModel(dataWithUserId);
    const result = await segmentOverview.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating segment overview data: " + err);
  } 
}

/**
 * Get segment overview data for authenticated user
 */
export async function getSegmentOverviewByUser(req: Request, res: Response) {
  try {
    await connect();

    const result = await segmentOverviewModel.findOne({ userId: req.userId });
    
   if (!result) {
      return res.status(404).send({ 
        error: "No monthly data found for this user",
        data: [] 
      });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching segment overview data: " + err);
  } 
}

/**
 * Get all segment overview data (admin only)
 */
export async function getAllSegmentOverview(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const result = await segmentOverviewModel.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching segment overview data: " + err);
  } 
}

/**
 * Update segment overview data for authenticated user
 */
export async function updateSegmentOverviewByUser(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const result = await segmentOverviewModel.findOneAndUpdate(
      { userId: req.userId },
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating segment overview data: " + err);
  } 
}

/**
 * Delete segment overview data for authenticated user
 */
export async function deleteSegmentOverviewByUser(req: Request, res: Response) {
  try {
    await connect();

    const result = await segmentOverviewModel.findOneAndDelete({ userId: req.userId });

    if (!result) {
      return res.status(404).send("No segment overview data found to delete");
    }

    res.status(200).send('Segment overview data deleted successfully.');
  } catch (err) {
    res.status(500).send("Error deleting segment overview data: " + err);
  }
}