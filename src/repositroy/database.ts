// repository/database.ts
import mongoose from "mongoose";

let isConnected = false;

/**
 * Connects to MongoDB (idempotent)
 */
export async function connect() {
  if (isConnected) return;

  try {
    if (!process.env.DBHOST) {
      throw new Error("DBHOST environment variable not set");
    }

    await mongoose.connect(process.env.DBHOST);
    isConnected = true;

    // Optional: ping DB to verify connection
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("MongoDB connection check OK");
    }
  } catch (err) {
    console.log("Error Connecting to database. Error: " + err);
    throw err;
  }
}

/**
 * Disconnects MongoDB (used only by testConnection)
 */
export async function disconnect() {
  if (!isConnected) return;

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log("MongoDB disconnected");
  } catch (err) {
    console.log("Error closing database connection. Error: " + err);
  }
}

/**
 * Test DB connection
 */
export async function testConnection() {
  try {
    await connect();
    await disconnect();
    console.log("Database connection test was successful (connect + disconnect)");
  } catch (error) {
    console.log("Error testing database connection. Error: " + error);
  }
}
