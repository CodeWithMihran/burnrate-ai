import express from "express";
import { generateAuditSummary } from "../controllers/summary.controller";
import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

/**
 * ----------------------------------
 * SUMMARY ROUTES
 * Base: /api/summary
 * ----------------------------------
 */

/**
 * Generate AI Summary
 * POST /api/summary/:auditId
 *
 * - Generates personalized summary using AI
 * - Rate limited (IMPORTANT to prevent API abuse)
 * - Called after audit creation
 */
router.post("/:auditId", rateLimiter, generateAuditSummary);

export default router;