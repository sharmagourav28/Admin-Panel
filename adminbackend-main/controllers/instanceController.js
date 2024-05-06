import { Router } from "express";
import { Instance } from "../models/instance.model.js";

// Add instance
const router = Router();
router.post("/", async (req, res) => {
  try {
    const { name, host, port } = req.body;
    const instance = new Instance({ name, host, port });
    await instance.save();
    res.status(201).send("Instance added successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding instance");
  }
});

// Get all instances
router.get("/", async (req, res) => {
  try {
    const instances = await Instance.find();
    res.send(instances);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching instances");
  }
});

export default router;
