import { Request, Response } from "express";
import { aarligeSaldoModel } from "../models/aaligeSaldo";
import { connect } from "../repositroy/database";

/**
 * Create yearly saldo overview for authenticated user
 */
export async function createAarligeSaldo(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const dataWithUserId = {
      ...req.body,
      userId: req.userId
    };

    const saldo = new aarligeSaldoModel(dataWithUserId);
    const result = await saldo.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating yearly saldo data: " + err);
  }
}

/**
 * Get yearly saldo overview for authenticated user
 */
export async function getAarligeSaldoByUser(req: Request, res: Response) {
  try {
    await connect();

    const result = await aarligeSaldoModel.findOne({ userId: req.userId });

    if (!result) {
      return res.status(404).send({
        error: "No yearly saldo data found for this user",
        data: []
      });
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching yearly saldo data: " + err);
  }
}

/**
 * Get all yearly saldo data (admin only)
 */
export async function getAllAarligeSaldo(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const result = await aarligeSaldoModel.find({});
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error fetching yearly saldo data: " + err);
  }
}

/**
 * Update yearly saldo overview for authenticated user
 */
export async function updateAarligeSaldoByUser(req: Request, res: Response): Promise<void> {
  try {
    await connect();

    const result = await aarligeSaldoModel.findOneAndUpdate(
      { userId: req.userId },
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating yearly saldo data: " + err);
  }
}

/**
 * Delete yearly saldo overview for authenticated user
 */
export async function deleteAarligeSaldoByUser(req: Request, res: Response) {
  try {
    await connect();

    const result = await aarligeSaldoModel.findOneAndDelete({ userId: req.userId });

    if (!result) {
      return res.status(404).send("No yearly saldo data found to delete");
    }

    res.status(200).send("Yearly saldo data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting yearly saldo data: " + err);
  }
}
