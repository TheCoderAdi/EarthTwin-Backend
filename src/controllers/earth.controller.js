import { asyncHandler } from "../utils/asyncHandler.js";
import { callGemini } from "../config/gemini.js";
import { lifestylePrompt, futurePrompt, coachPrompt } from "../utils/promptTemplates.js";
import { generateSimulation } from "../services/impact.service.js";
import { safeJSONParse } from "../utils/jsonParser.js";

// ANALYZE
export const analyzeLifestyle = asyncHandler(async (req, res) => {
    const { input } = req.body;

    if (!input) {
        return res.status(400).json({ message: "Input is required" });
    }


    const result = await callGemini(lifestylePrompt(input));
    const parsed = safeJSONParse(result);

    // fallback data if parsing fails
    const data = parsed || {
        carbon_score: 65,
        water_usage: 55,
        waste_index: 60,
        summary: "Estimated environmental impact"
    };

    res.json({ success: true, data });
});

// SIMULATE
export const simulateEarth = asyncHandler(async (req, res) => {
    const simulation = generateSimulation(req.body);

    res.json({ success: true, data: simulation });
});

// FUTURE
export const futurePrediction = asyncHandler(async (req, res) => {
    const { carbon_score } = req.body;

    const result = await callGemini(futurePrompt(carbon_score));

    res.json({
        success: true,
        data: {
            prediction: result || "Future impact could not be determined"
        }
    });
});

// COACH
export const ecoCoach = asyncHandler(async (req, res) => {
    const { lifestyle } = req.body;

    const result = await callGemini(coachPrompt(lifestyle));
    const parsed = safeJSONParse(result);

    res.json({
        success: true,
        data: parsed || {
            suggestions: [
                "Use public transport",
                "Reduce meat consumption",
                "Limit waste generation"
            ]
        }
    });
});

// COMPARE
export const compareScenarios = asyncHandler(async (req, res) => {
    const { current, alternative } = req.body;

    res.json({
        success: true,
        data: {
            pollution_change: alternative.carbon_score - current.carbon_score,
            improvement: current.carbon_score - alternative.carbon_score
        }
    });
});