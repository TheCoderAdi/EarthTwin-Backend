import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

import earthRoutes from "./routes/earth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

// Security
app.use(helmet());

// Rate limiting
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

// Logging
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
    res.send("🌍 EarthTwin API running");
});

// Routes
app.use("/api/earth", earthRoutes);

// Error handler (LAST)
app.use(errorHandler);

export default app;