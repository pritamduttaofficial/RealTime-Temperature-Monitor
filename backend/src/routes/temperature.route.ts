import { Router } from "express";
import { getRecentTemperatures } from "../controllers/temperature.controller";

const router = Router();

router.get("/", getRecentTemperatures);

export default router;
