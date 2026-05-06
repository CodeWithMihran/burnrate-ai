import { Request, Response } from "express";
import Audit from "../models/Audit";
import { generateSummary } from "../services/anthropic.service";

/**
 * Generate AI Summary for an Audit
 * POST /api/summary/:auditId
 */
export const generateAuditSummary = async (req: Request, res: Response) => {
  try {
    const { auditId } = req.params;

    // 1. Fetch audit
    const audit = await Audit.findById(auditId);

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

    try {
      summary = await generateSummary(inputData);
    } catch (error) {
      console.error("AI Summary failed, using fallback:", error);

      // 5. Fallback summary (VERY IMPORTANT for assignment)
      summary = generateFallbackSummary(inputData);
    }

    // 6. Save summary
    audit.result.summary = summary;
    await audit.save();

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

/**
 * Fallback Summary Generator
 * Used when AI fails
 */
const generateFallbackSummary = (data: any): string => {
  const {
    totalMonthlySavings,
    totalAnnualSavings,
    recommendations,
  } = data;

  if (totalMonthlySavings < 100) {
    return `Your current AI tool setup appears to be cost-efficient with minimal savings opportunities. You're spending wisely, and no major optimizations are needed at this time.`;
  }

  return `You're currently overspending on AI tools. Based on your usage, you can save approximately $${totalMonthlySavings}/month (~$${totalAnnualSavings}/year) by optimizing your plans and switching to better-suited tools. Consider reviewing the recommended changes to reduce unnecessary costs.`;
};