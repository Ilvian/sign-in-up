import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./models/db.js";
import authRouter from "./routes/authRoutes.js";

configDotenv();
const app = express();
const port = process.env.SERVER_PORT;
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser())

app.use("/auth", authRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(port);
    console.log(
      `Database connected succesfully & server is running on port ${port}.`
    );
  })
  .catch((err) => {
    console.error("Error connecting to database: ", err);
  });
