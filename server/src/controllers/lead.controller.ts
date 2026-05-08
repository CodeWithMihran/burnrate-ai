import { Request, Response } from "express";
import Lead from "../models/Lead";
import Audit from "../models/Audit";
import { sendAuditEmail } from "../services/email.service";
import { leadInputSchema } from "../validators/lead.validator";
import { isDatabaseConnected } from "../config/db";
import {
  createMemoryLead,
  findMemoryLead,
  getMemoryAuditById,
  markMemoryLeadAsEmailed,
} from "../services/memoryStore";

/**
 * ----------------------------------
 * CREATE LEAD
 * POST /api/lead
 * ----------------------------------
 */
export const createLead = async (req: Request, res: Response) => {
  try {
    // 1. Validate input
    const parsed = leadInputSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: parsed.error.flatten(),
      });
    }

    const {
      email,
      companyName,
      role,
      teamSize,
      auditId,
      intent = "report",
      consultationNotes,
      preferredContactWindow,
    } = parsed.data;

    // 2. Fetch audit (DO NOT trust frontend savings)
    const audit = isDatabaseConnected()
      ? await Audit.findById(auditId)
      : getMemoryAuditById(auditId);

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "Audit not found",
      });
    }

    const monthlySavings = audit.result.totalMonthlySavings;
    const annualSavings = audit.result.totalAnnualSavings;

    // 3. Check duplicate lead
    const existingLead = isDatabaseConnected()
      ? await Lead.findOne({ email, auditId })
      : findMemoryLead(email, auditId);

    if (existingLead) {
      return res.status(200).json({
        success: true,
        message: "Lead already exists",
        leadId: existingLead._id,
      });
    }

    // 4. Create lead
    const lead = isDatabaseConnected()
      ? await Lead.create({
          email,
          companyName,
          role,
          teamSize,
          auditId,
          estimatedMonthlySavings: monthlySavings,
          estimatedAnnualSavings: annualSavings,
          intent,
          consultationNotes,
          preferredContactWindow,
          source: req.headers.referer || "direct",
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
        })
      : createMemoryLead({
          email,
          companyName,
          role,
          teamSize,
          auditId,
          estimatedMonthlySavings: monthlySavings,
          estimatedAnnualSavings: annualSavings,
          intent,
          consultationNotes,
          preferredContactWindow,
          source: req.headers.referer || "direct",
          ipAddress: req.ip,
          userAgent: req.headers["user-agent"],
        });

    // 5. Send confirmation email (non-blocking)
    try {
      await sendAuditEmail({
        to: email,
        audit,
        isHighValue: lead.isHighValue,
      });

      if (isDatabaseConnected() && "save" in lead) {
        lead.status = "emailed";
        await lead.save();
      } else {
        markMemoryLeadAsEmailed(String(lead._id));
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail request if email fails
    }

    // 6. Response
    return res.status(201).json({
      success: true,
      message: "Lead captured successfully",
      leadId: lead._id,
      isHighValue: lead.isHighValue,
    });
  } catch (error) {
    console.error("Create Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to capture lead",
    });
  }
};
