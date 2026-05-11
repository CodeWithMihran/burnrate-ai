import express from "express";
import { generateAuditSummary } from "../controllers/summary.controller";
import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

router.post("/:auditId", rateLimiter, generateAuditSummary);

export default router;
