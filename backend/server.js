import express from "express";
import { configDotenv } from "dotenv";
import sequelize from "./db.js";
import authRouter from "./routes/authRoutes.js";

configDotenv();
const app = express();
const port = process.env.SERVER_PORT;
app.use(express.json());

app.use("/auth", authRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.error("Error connecting to database: ", err);
  });
