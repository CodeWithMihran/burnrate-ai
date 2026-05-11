import mongoose, { Schema, Document, Types } from "mongoose";

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
  auditId: Types.ObjectId;
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;
  isHighValue: boolean;
  status: LeadStatus;
  intent: LeadIntent;
  source?: string;
  ipAddress?: string;
  userAgent?: string;
  consultationNotes?: string;
  preferredContactWindow?: string;
  createdAt: Date;
  updatedAt: Date;
}

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
    auditId: {
      type: Schema.Types.ObjectId,
      ref: "Audit",
      required: true,
      index: true,
    },
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

LeadSchema.index({ email: 1, auditId: 1 }, { unique: true });
LeadSchema.index({ isHighValue: 1, status: 1 });
LeadSchema.index({ createdAt: -1 });

LeadSchema.pre("save", function () {
  this.isHighValue = this.estimatedMonthlySavings >= 500;
});

export default mongoose.model<ILead>("Lead", LeadSchema);
