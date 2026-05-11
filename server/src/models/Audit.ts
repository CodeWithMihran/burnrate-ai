import mongoose, { Schema, Document } from "mongoose";

export type UseCase =
  | "coding"
  | "writing"
  | "data"
  | "research"
  | "mixed";

export interface IToolInput {
  toolName: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface IToolRecommendation {
  toolName: string;
  currentPlan: string;
  recommendedPlan: string;
  currentSpend: number;
  optimizedSpend: number;
  savings: number;
  action: "downgrade" | "upgrade" | "switch" | "stay";
  reason: string;
}

export interface IAuditResult {
  totalCurrentSpend: number;
  totalOptimizedSpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: IToolRecommendation[];
  summary?: string;
}

export interface IAudit extends Document {
  tools: IToolInput[];
  teamSize: number;
  useCase: UseCase;
  result: IAuditResult;
  email?: string;
  companyName?: string;
  role?: string;
  publicId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ToolInputSchema = new Schema<IToolInput>(
  {
    toolName: {
      type: String,
      required: true,
      trim: true,
    },
    plan: {
      type: String,
      required: true,
    },
    monthlySpend: {
      type: Number,
      required: true,
      min: 0,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const ToolRecommendationSchema = new Schema<IToolRecommendation>(
  {
    toolName: { type: String, required: true },
    currentPlan: { type: String, required: true },
    recommendedPlan: { type: String, required: true },
    currentSpend: { type: Number, required: true },
    optimizedSpend: { type: Number, required: true },
    savings: { type: Number, required: true },
    action: {
      type: String,
      enum: ["downgrade", "upgrade", "switch", "stay"],
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const AuditResultSchema = new Schema<IAuditResult>(
  {
    totalCurrentSpend: { type: Number, required: true },
    totalOptimizedSpend: { type: Number, required: true },
    totalMonthlySavings: { type: Number, required: true },
    totalAnnualSavings: { type: Number, required: true },
    recommendations: {
      type: [ToolRecommendationSchema],
      required: true,
    },
    summary: {
      type: String,
    },
  },
  { _id: false }
);

const AuditSchema = new Schema<IAudit>(
  {
    tools: {
      type: [ToolInputSchema],
      required: true,
      validate: [
        (val: IToolInput[]) => val.length > 0,
        "At least one tool is required",
      ],
    },
    teamSize: {
      type: Number,
      required: true,
      min: 1,
    },
    useCase: {
      type: String,
      enum: ["coding", "writing", "data", "research", "mixed"],
      required: true,
    },
    result: {
      type: AuditResultSchema,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    publicId: {
      type: String,
      required: true,
      unique: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

AuditSchema.index({ createdAt: -1 });
AuditSchema.index({ email: 1 });

export default mongoose.model<IAudit>("Audit", AuditSchema);
