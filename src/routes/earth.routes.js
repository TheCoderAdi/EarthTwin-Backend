import express from "express";
import {
    analyzeLifestyle,
    simulateEarth,
    futurePrediction,
    ecoCoach,
    compareScenarios
} from "../controllers/earth.controller.js";

const router = express.Router();

router.post("/analyze", analyzeLifestyle);
router.post("/simulate", simulateEarth);
router.post("/future", futurePrediction);
router.post("/coach", ecoCoach);
router.post("/compare", compareScenarios);

export default router;