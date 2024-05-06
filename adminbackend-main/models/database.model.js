import mongoose from "mongoose";
const databaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  instance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instance",
    required: true,
  },
});

export const Database = mongoose.model("Database", databaseSchema);
