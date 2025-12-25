import { Request, Response } from 'express';
import { segmentOverviewModel } from '../models/segmentOverview';
import { connect, disconnect } from '../repositroy/database';

/**
 * Create new segment overview data
 * @param req 
 * @param res 
 */
export async function createSegmentOverview(req: Request, res: Response): Promise<void> {
  const data = req.body;

  try {
    await connect();

    const segmentOverview = new segmentOverviewModel(data);
    const result = await segmentOverview.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating segment overview data: " + err);
  } 
}

/**
 * Get all segment overview data
 * @param req 
 * @param res 
 */
export async function getAllSegmentOverview(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const result = await segmentOverviewModel.find({});
    
    // Return just the data structure without MongoDB wrapper
    if (result.length > 0) {
      res.status(200).send(result[0]); // Send the first document directly
    } else {
      res.status(404).send({ error: "No segment overview data found" });
    }
  } catch (err) {
    res.status(500).send("Error fetching segment overview data: " + err);
  } 
}

/**
 * Get segment overview data by ID
 * @param req 
 * @param res 
 */
export async function getSegmentOverviewById(req: Request, res: Response): Promise<void> {
  try {
    await connect();
    
    const id = req.params.id;
    const result = await segmentOverviewModel.findById(id);

    if (!result) {
      res.status(404).send('Segment overview data not found with id: ' + id);
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching segment overview data: " + err);
  }
}

/**
 * Update segment overview data by ID
 * @param req 
 * @param res 
 */
export async function updateSegmentOverviewById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    await connect();

    const result = await segmentOverviewModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!result) {
      res.status(404).send('Cannot update segment overview data with id: ' + id);
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating segment overview data: " + err);
  } 
}

/**
 * Delete segment overview data by ID
 * @param req 
 * @param res 
 */
export async function deleteSegmentOverviewById(req: Request, res: Response): Promise<void> {
  const id = req.params.id;

  try {
    await connect();

    const result = await segmentOverviewModel.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send('Cannot delete segment overview data with id: ' + id);
      return;
    }

    res.status(200).send('Segment overview data deleted successfully.');
  } catch (err) {
    res.status(500).send("Error deleting segment overview data: " + err);
  }
}