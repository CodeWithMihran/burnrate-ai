import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * -----------------------------
 * TYPES
 * -----------------------------
 */

export type LeadStatus =
  | "captured"
  | "emailed"
  | "contacted"
  | "converted"
  | "rejected";

export type LeadIntent = "report" | "notify" | "consult";

export interface ILead extends Document {
  email: string;

  companyName?: string;
  role?: string;
  teamSize?: number;

  // Link to audit
  auditId: Types.ObjectId;

  // Business signals
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;

  isHighValue: boolean; // > $500/mo savings

  // Lifecycle tracking
  status: LeadStatus;
  intent: LeadIntent;

  // Metadata
  source?: string; // e.g. "organic", "twitter", "direct"
  ipAddress?: string;
  userAgent?: string;
  consultationNotes?: string;
  preferredContactWindow?: string;

  createdAt: Date;
  updatedAt: Date;
}

/**
 * -----------------------------
 * SCHEMA
 * -----------------------------
 */

const LeadSchema = new Schema<ILead>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
      index: true,
    },

    companyName: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      trim: true,
    },

    teamSize: {
      type: Number,
      min: 1,
    },

    // Reference to Audit
    auditId: {
      type: Schema.Types.ObjectId,
      ref: "Audit",
      required: true,
      index: true,
    },

    // Business impact (VERY IMPORTANT for Credex)
    estimatedMonthlySavings: {
      type: Number,
      required: true,
      min: 0,
    },

    estimatedAnnualSavings: {
      type: Number,
      required: true,
      min: 0,
    },

    isHighValue: {
      type: Boolean,
      default: false,
      index: true,
    },

    // Lifecycle tracking
    status: {
      type: String,
      enum: ["captured", "emailed", "contacted", "converted", "rejected"],
      default: "captured",
      index: true,
    },

    intent: {
      type: String,
      enum: ["report", "notify", "consult"],
      default: "report",
      index: true,
    },

    // Optional tracking (for GTM insights)
    source: {
      type: String,
      default: "direct",
    },

    ipAddress: {
      type: String,
    },

    userAgent: {
      type: String,
    },

    consultationNotes: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    preferredContactWindow: {
      type: String,
      trim: true,
      maxlength: 120,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * -----------------------------
 * INDEXES (IMPORTANT 🚀)
 * -----------------------------
 */

// Prevent duplicate leads for same audit + email
LeadSchema.index({ email: 1, auditId: 1 }, { unique: true });

// Fast filtering for high-value leads
LeadSchema.index({ isHighValue: 1, status: 1 });

// Analytics queries
LeadSchema.index({ createdAt: -1 });

/**
 * -----------------------------
 * PRE-SAVE HOOKS
 * -----------------------------
 */

LeadSchema.pre("save", function () {
  // Automatically mark high-value leads
  if (this.estimatedMonthlySavings >= 500) {
    this.isHighValue = true;
  } else {
    this.isHighValue = false;
  }
});

/**
 * -----------------------------
 * EXPORT MODEL
 * -----------------------------
 */

export default mongoose.model<ILead>("Lead", LeadSchema);
