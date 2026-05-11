import { Request, Response } from "express";
import Audit from "../models/Audit";
import { isDatabaseConnected } from "../config/db";
import {
  getMemoryAuditById,
  updateMemoryAuditSummary,
} from "../services/memoryStore";
import { buildAuditSummary } from "../services/auditSummary";

export const generateAuditSummary = async (req: Request, res: Response) => {
  try {
    const auditId = String(req.params.auditId);

    const audit = isDatabaseConnected()
      ? await Audit.findById(auditId)
      : getMemoryAuditById(auditId);

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found",
      });
    }

    if (audit.result.summary) {
      return res.status(200).json({
        success: true,
        summary: audit.result.summary,
        cached: true,
      });
    }

    const inputData = {
      tools: audit.tools,
      totalMonthlySavings: audit.result.totalMonthlySavings,
      totalAnnualSavings: audit.result.totalAnnualSavings,
      recommendations: audit.result.recommendations,
      useCase: audit.useCase,
      teamSize: audit.teamSize,
    };

    const summary = await buildAuditSummary(inputData);

    if (isDatabaseConnected() && "save" in audit) {
      audit.result.summary = summary;
      await audit.save();
    } else {
      updateMemoryAuditSummary(auditId, summary);
    }

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

