import { Router } from "express";
import { Database } from "../models/database.model.js";
// Add database
const router = Router();
router.post("/", async (req, res) => {
  try {
    const { name, instanceId } = req.body;
    const database = new Database({ name, instance: instanceId });
    await database.save();
    res.status(201).send("Database added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding database");
  }
});

// Get all databases
router.get("/", async (req, res) => {
  try {
    const databases = await Database.find();
    res.send(databases);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching databases");
  }
});

export default router;
