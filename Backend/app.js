const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config");
const authRoutes = require("./routes/authRoutes");
const instanceRoutes = require("./routes/instanceRoutes");
const databaseRoutes = require("./routes/databaseRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

mongoose
  .connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(-1);
  });

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/instances", instanceRoutes);
app.use("/api/databases", databaseRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
