import express from "express";
import {
  createAudit,
  getAuditById,
  getPublicAudit,
  deleteAudit,
} from "../controllers/audit.controller";

import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

router.post("/", rateLimiter, createAudit);

// Keep the public route above /:id so the dynamic id route does not catch it first.
router.get("/public/:publicId", getPublicAudit);

router.get("/:id", getAuditById);

router.delete("/:id", deleteAudit);

export default router;
