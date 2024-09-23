import express from "express";
import temperatureRoutes from "./routes/temperature.route";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.use("/api/v1/temperature", temperatureRoutes);

app.use(errorHandler);

export default app;
