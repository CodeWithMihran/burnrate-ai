import { Request, Response } from "express";
import { nanoid } from "nanoid";
import Audit from "../models/Audit";
import { runAuditEngine } from "../services/audit/auditEngine";
import { buildAuditSummary } from "../services/auditSummary";
import { auditInputSchema } from "../validators/audit.validator";
import { isDatabaseConnected } from "../config/db";
import {
  createMemoryAudit,
  deleteMemoryAuditById,
  getMemoryAuditById,
  getMemoryAuditByPublicId,
} from "../services/memoryStore";

/**
 * ----------------------------------
 * CREATE AUDIT
 * POST /api/audit
 * ----------------------------------
 */
export const createAudit = async (req: Request, res: Response) => {
  try {
    // 1. Validate input using Zod
    const parsed = auditInputSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: parsed.error.flatten(),
      });
    }

    const { tools, teamSize, useCase } = parsed.data;

    // 2. Run audit engine (core logic)
    const result = runAuditEngine({
      tools,
      teamSize,
      useCase,
    });

    result.summary = await buildAuditSummary({
      tools,
      teamSize,
      useCase,
      totalMonthlySavings: result.totalMonthlySavings,
      totalAnnualSavings: result.totalAnnualSavings,
      recommendations: result.recommendations,
    });

    // 3. Generate publicId for shareable URL
    const publicId = nanoid(10);

    // 4. Save audit
    const audit = isDatabaseConnected()
      ? await Audit.create({
          tools,
          teamSize,
          useCase,
          result,
          publicId,
          isPublic: true,
        })
      : createMemoryAudit({
          tools,
          teamSize,
          useCase,
          result,
          publicId,
          isPublic: true,
        });

    // 5. Return response
    return res.status(201).json({
      success: true,
      auditId: String(audit._id),
      publicId: audit.publicId,
      result: audit.result,
    });
  } catch (error) {
    console.error("Create Audit Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create audit",
    });
  }
};

/**
 * ----------------------------------
 * GET AUDIT (PRIVATE)
 * GET /api/audit/:id
 * ----------------------------------
 */
export const getAuditById = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const audit = isDatabaseConnected()
      ? await Audit.findById(id)
      : getMemoryAuditById(id);

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found",
      });
    }

    return res.status(200).json({
      success: true,
      audit,
    });
  } catch (error) {
    console.error("Get Audit Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch audit",
    });
  }
};

/**
 * ----------------------------------
 * GET PUBLIC AUDIT (SHAREABLE)
 * GET /api/audit/public/:publicId
 * ----------------------------------
 */
export const getPublicAudit = async (req: Request, res: Response) => {
  try {
    const publicId = String(req.params.publicId);

    const audit = isDatabaseConnected()
      ? await Audit.findOne({ publicId })
      : getMemoryAuditByPublicId(publicId);

    if (!audit || !audit.isPublic) {
      return res.status(404).json({
        success: false,
        message: "Public audit not found",
      });
    }

    // Remove sensitive data
    const publicData = {
      auditId: String(audit._id),
      publicId: audit.publicId,
      tools: audit.tools,
      teamSize: audit.teamSize,
      useCase: audit.useCase,
      result: audit.result,
      createdAt: audit.createdAt,
    };

    return res.status(200).json({
      success: true,
      audit: publicData,
    });
  } catch (error) {
    console.error("Public Audit Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch public audit",
    });
  }
};

/**
 * ----------------------------------
 * DELETE AUDIT (OPTIONAL but useful)
 * ----------------------------------
 */
export const deleteAudit = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const audit = isDatabaseConnected()
      ? await Audit.findByIdAndDelete(id)
      : deleteMemoryAuditById(id);

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Audit deleted successfully",
    });
  } catch (error) {
    console.error("Delete Audit Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete audit",
    });
  }
};
