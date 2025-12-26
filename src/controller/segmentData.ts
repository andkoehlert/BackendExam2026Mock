import { Request, Response } from 'express';
import { segmentOverviewModel } from '../models/segmentOverview';
import { revenueDataModel } from '../models/revenueData';
import { connect } from '../repositroy/database';

/**
 * Create segment overview (actual) data for authenticated user
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
 * Get all segment overview data for authenticated user
 */
export async function getSegmentOverviewByUser(req: Request, res: Response) {
  try {
    await connect();

    const result = await segmentOverviewModel.find({ userId: req.userId }).sort({ year: -1 });
    
    if (!result || result.length === 0) {
      return res.status(404).send({ 
        error: "No segment overview data found for this user",
        data: [] 
      });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching segment overview data: " + err);
  } 
}

/**
 * Get segment overview by year for authenticated user
 */
export async function getSegmentOverviewByYear(req: Request, res: Response) {
  try {
    await connect();
    
    const year = parseInt(req.params.year);
    const result = await segmentOverviewModel.findOne({ 
      userId: req.userId, 
      year 
    });

    if (!result) {
      return res.status(404).send("Segment overview data not found for year: " + year);
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching segment overview data: " + err);
  }
}

/**
 * Get comparison of goals vs actuals for a specific year
 * This combines revenueData (goals) with segmentOverview (actuals)
 */
export async function getSegmentComparison(req: Request, res: Response) {
  try {
    await connect();
    
    const year = parseInt(req.params.year);
    
    // Fetch both goals and actuals
    const [goals, actuals] = await Promise.all([
      revenueDataModel.findOne({ userId: req.userId, year }),
      segmentOverviewModel.findOne({ userId: req.userId, year })
    ]);

    if (!goals && !actuals) {
      return res.status(404).send("No data found for year: " + year);
    }

    res.status(200).send({
      year,
      goals: goals || null,
      actuals: actuals || null
    });
  } catch (err) {
    res.status(500).send("Error fetching comparison data: " + err);
  }
}

/**
 * Get all segment overview data (admin only)
 */
export async function getAllSegmentOverview(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const result = await segmentOverviewModel.find({}).sort({ year: -1 });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching segment overview data: " + err);
  } 
}

/**
 * Update segment overview by year for authenticated user
 */
export async function updateSegmentOverviewByYear(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const year = parseInt(req.params.year);
    const result = await segmentOverviewModel.findOneAndUpdate(
      { userId: req.userId, year },
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating segment overview data: " + err);
  } 
}

/**
 * Delete segment overview by year for authenticated user
 */
export async function deleteSegmentOverviewByYear(req: Request, res: Response) {
  try {
    await connect();

    const year = parseInt(req.params.year);
    const result = await segmentOverviewModel.findOneAndDelete({ 
      userId: req.userId, 
      year 
    });

    if (!result) {
      return res.status(404).send("Cannot delete segment overview data for year: " + year);
    }

    res.status(200).send("Segment overview data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting segment overview data: " + err);
  }
}
