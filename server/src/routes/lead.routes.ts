import express from "express";
import { createLead } from "../controllers/lead.controller";
import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

router.post("/", rateLimiter, createLead);

export default router;
