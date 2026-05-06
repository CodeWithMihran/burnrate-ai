import express from "express";
import { createLead } from "../controllers/lead.controller";
import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

/**
 * ----------------------------------
 * LEAD ROUTES
 * Base: /api/lead
 * ----------------------------------
 */

/**
 * Create Lead (Email Capture)
 * POST /api/lead
 * 
 * - Rate limited to prevent spam/abuse
 * - Triggered after user sees audit results
 */
router.post("/", rateLimiter, createLead);

export default router;