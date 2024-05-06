import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./DB/index.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT ;

connectDB()
  .then(
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    })
  )
  .catch((error) => {
    console.log("MongoDB connection failed !!! ", error);
  });
