import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController";

const router = Router();

router.get("/:userId", getDashboard);

export default router;
