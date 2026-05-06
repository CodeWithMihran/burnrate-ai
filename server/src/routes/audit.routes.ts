import express from "express";
import {
  createAudit,
  getAuditById,
  getPublicAudit,
  deleteAudit,
} from "../controllers/audit.controller";

import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

/**
 * ----------------------------------
 * AUDIT ROUTES
 * Base: /api/audit
 * ----------------------------------
 */

/**
 * Create Audit
 * POST /api/audit
 * Rate limited to prevent abuse
 */
router.post("/", rateLimiter, createAudit);

/**
 * Get Public Audit (SHAREABLE)
 * IMPORTANT: place before /:id to avoid route conflict
 * GET /api/audit/public/:publicId
 */
router.get("/public/:publicId", getPublicAudit);

/**
 * Get Private Audit
 * GET /api/audit/:id
 */
router.get("/:id", getAuditById);

/**
 * Delete Audit (Optional)
 * DELETE /api/audit/:id
 */
router.delete("/:id", deleteAudit);

export default router;