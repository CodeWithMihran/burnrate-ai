import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import Audit from "./models/Audit";
import auditRoutes from "./routes/audit.routes";
import leadRoutes from "./routes/lead.routes";
import summaryRoutes from "./routes/summary.routes";
import errorHandler from "./middleware/errorHandler";
import { isDatabaseConnected } from "./config/db";
import { getMemoryAuditByPublicId } from "./services/memoryStore";
import { buildSharePageHtml } from "./services/sharePage";

const app: Application = express();

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.get("/share/:publicId", async (req: Request, res: Response) => {
  const publicId = String(req.params.publicId);
  const audit = isDatabaseConnected()
    ? await Audit.findOne({ publicId })
    : getMemoryAuditByPublicId(publicId);

  if (!audit || !audit.isPublic) {
    res.status(404).send("Public audit not found");
    return;
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(
    buildSharePageHtml({
      publicId,
      result: audit.result,
    })
  );
});

app.use("/api/audit", auditRoutes);
app.use("/api/lead", leadRoutes);
app.use("/api/summary", summaryRoutes);

app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

export default app;
