import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db";

// Routes
import auditRoutes from "./routes/audit.routes";
import leadRoutes from "./routes/lead.routes";
import summaryRoutes from "./routes/summary.routes";

// Middleware
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

/**
 * ----------------------------------
 * DATABASE CONNECTION
 * ----------------------------------
 */
connectDB();

/**
 * ----------------------------------
 * GLOBAL MIDDLEWARE
 * ----------------------------------
 */

// Security headers
app.use(helmet());

// CORS (adjust in production if needed)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  })
);

// Body parser
app.use(express.json());

// Logging
app.use(morgan("dev"));

/**
 * ----------------------------------
 * HEALTH CHECK ROUTE
 * ----------------------------------
 */
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running 🚀",
  });
});

/**
 * ----------------------------------
 * API ROUTES
 * ----------------------------------
 */
app.use("/api/audit", auditRoutes);
app.use("/api/lead", leadRoutes);
app.use("/api/summary", summaryRoutes);

/**
 * ----------------------------------
 * 404 HANDLER
 * ----------------------------------
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/**
 * ----------------------------------
 * ERROR HANDLER (CENTRALIZED)
 * ----------------------------------
 */
app.use(errorHandler);

/**
 * ----------------------------------
 * START SERVER
 * ----------------------------------
 */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});