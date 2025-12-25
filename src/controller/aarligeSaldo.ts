import { Request, Response } from "express";
import { aarligeSaldoModel } from "../models/aaligeSaldo";
import { connect } from "../repositroy/database";

/**
 * Create yearly saldo overview
 */
export async function createAarligeSaldo(
  req: Request,
  res: Response
): Promise<void> {
  try {
    await connect();

    const saldo = new aarligeSaldoModel(req.body);
    const result = await saldo.save();

    res.status(201).send(result);
  } catch (err) {
    res.status(500).send("Error creating yearly saldo data: " + err);
  }
}

/**
 * Get yearly saldo overview
 */
export async function getAarligeSaldo(
  req: Request,
  res: Response
): Promise<void> {
  try {
    await connect();

    const result = await aarligeSaldoModel.find({});

    if (result.length > 0) {
      res.status(200).send(result[0]);
    } else {
      res.status(404).send({ error: "No yearly saldo data found" });
    }
  } catch (err) {
    res.status(500).send("Error fetching yearly saldo data: " + err);
  }
}

/**
 * Update yearly saldo by ID
 */
export async function updateAarligeSaldoById(
  req: Request,
  res: Response
): Promise<void> {
  const id = req.params.id;

  try {
    await connect();

    const result = await aarligeSaldoModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!result) {
      res.status(404).send("Cannot update yearly saldo with id: " + id);
      return;
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error updating yearly saldo data: " + err);
  }
}

/**
 * Delete yearly saldo by ID
 */
export async function deleteAarligeSaldoById(
  req: Request,
  res: Response
): Promise<void> {
  const id = req.params.id;

  try {
    await connect();

    const result = await aarligeSaldoModel.findByIdAndDelete(id);

    if (!result) {
      res.status(404).send("Cannot delete yearly saldo with id: " + id);
      return;
    }

    res.status(200).send("Yearly saldo data deleted successfully.");
  } catch (err) {
    res.status(500).send("Error deleting yearly saldo data: " + err);
  }
}
