import { Request, Response } from "express";
import { largestPeriodOverviewModel } from "../models/largestPeriodOverview";
import { connect } from "../repositroy/database";

/**
 * Create largest period overview
 */
export async function createLargestPeriodOverview(
  req: Request,
  res: Response
): Promise<void> {
  try {
    await connect();

    const overview = new largestPeriodOverviewModel(req.body);
    const result = await overview.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating largest period overview: " + err);
  }
}

/**
 * Get all largest period overview data
 * (returns first document like your segment overview)
 */
export async function getLargestPeriodOverview(
  req: Request,
  res: Response
): Promise<void> {
  try {
    await connect();

    const result = await largestPeriodOverviewModel.find({});

    if (result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(404).send({ error: "No largest period overview data found" });
    }
  } catch (err) {
    res.status(500).send("Error fetching largest period overview: " + err);
  }
}

/**
 * Update largest period overview by ID
 */
export async function updateLargestPeriodOverviewById(
  req: Request,
  res: Response
): Promise<void> {
  const id = req.params.id;

  try {
    await connect();

    const result = await largestPeriodOverviewModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!result) {
      res.status(404).send("Cannot update overview with id: " + id);
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating largest period overview: " + err);
  }
}

/**
 * Delete largest period overview by ID
 */
export async function deleteLargestPeriodOverviewById(
  req: Request,
  res: Response
): Promise<void> {
  const id = req.params.id;

  try {
    await connect();

    const result = await largestPeriodOverviewModel.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Cannot delete overview with id: " + id);
      return;
    }

    res.status(200).send("Largest period overview deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting largest period overview: " + err);
  }
}
