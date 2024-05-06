import mongoose from "mongoose";

const instanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  port: { type: Number, required: true },
});

export const Instance = mongoose.model("Instance", instanceSchema);
