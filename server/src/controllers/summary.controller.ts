import { Request, Response } from "express";
import Audit from "../models/Audit";
import { isDatabaseConnected } from "../config/db";
import {
  getMemoryAuditById,
  updateMemoryAuditSummary,
} from "../services/memoryStore";
import { buildAuditSummary } from "../services/auditSummary";

/**
 * Generate AI Summary for an Audit
 * POST /api/summary/:auditId
 */
export const generateAuditSummary = async (req: Request, res: Response) => {
  try {
    const auditId = String(req.params.auditId);

    // 1. Fetch audit
    const audit = isDatabaseConnected()
      ? await Audit.findById(auditId)
      : getMemoryAuditById(auditId);

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found",
      });
    }

    // 2. If summary already exists, return it (optional optimization)
    if (audit.result.summary) {
      return res.status(200).json({
        success: true,
        summary: audit.result.summary,
        cached: true,
      });
    }

    // 3. Prepare data for AI
    const inputData = {
      tools: audit.tools,
      totalMonthlySavings: audit.result.totalMonthlySavings,
      totalAnnualSavings: audit.result.totalAnnualSavings,
      recommendations: audit.result.recommendations,
      useCase: audit.useCase,
      teamSize: audit.teamSize,
    };

    // 4. Call AI service
    let summary: string;

    summary = await buildAuditSummary(inputData);

    // 6. Save summary
    if (isDatabaseConnected() && "save" in audit) {
      audit.result.summary = summary;
      await audit.save();
    } else {
      updateMemoryAuditSummary(auditId, summary);
    }

    // 7. Return response
    return res.status(200).json({
      success: true,
      summary,
      cached: false,
    });
  } catch (error) {
    console.error("Summary Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate summary",
    });
  }
};

