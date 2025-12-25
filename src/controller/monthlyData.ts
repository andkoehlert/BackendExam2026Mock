// composables/monthlyData.ts
import { Request, Response } from "express";
import { monthlyDataModel } from "../models/monthlyData";
import { connect } from "../repositroy/database";

/**
 * Create new monthly data
 */
export async function createMonthlyData(req: Request, res: Response) {
  try {
    await connect();
    const monthlyData = new monthlyDataModel(req.body);
    const result = await monthlyData.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating monthly data: " + err);
  }
}

/**
 * Get all monthly data
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
 * Get monthly data by ID
 */
export async function getMonthlyDataById(req: Request, res: Response) {
  try {
    await connect();
    const result = await monthlyDataModel.findById(req.params.id);
    if (!result) {
      return res.status(404).send("Monthly data not found with id: " + req.params.id);
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching monthly data: " + err);
  }
}

/**
 * Update monthly data by ID
 */
export async function updateMonthlyDataById(req: Request, res: Response) {
  try {
    await connect();
    const result = await monthlyDataModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).send("Cannot update monthly data with id: " + req.params.id);
    }
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating monthly data: " + err);
  }
}

/**
 * Delete monthly data by ID
 */
export async function deleteMonthlyDataById(req: Request, res: Response) {
  try {
    await connect();
    const result = await monthlyDataModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send("Cannot delete monthly data with id: " + req.params.id);
    }
    res.status(200).send("Monthly data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting monthly data: " + err);
  }
}
