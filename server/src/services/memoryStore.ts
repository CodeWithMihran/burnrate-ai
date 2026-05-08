import fs from "node:fs";
import path from "node:path";
import { nanoid } from "nanoid";
import type { IAuditResult, IToolInput, UseCase } from "../models/Audit";

interface MemoryAudit {
  _id: string;
  tools: IToolInput[];
  teamSize: number;
  useCase: UseCase;
  result: IAuditResult;
  publicId: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface MemoryLead {
  _id: string;
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  auditId: string;
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;
  isHighValue: boolean;
  status: "captured" | "emailed" | "contacted" | "converted" | "rejected";
  intent: "report" | "notify" | "consult";
  source?: string;
  ipAddress?: string;
  userAgent?: string;
  consultationNotes?: string;
  preferredContactWindow?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PersistedState {
  audits: MemoryAudit[];
  leads: MemoryLead[];
}

const dataDirectory = path.resolve(__dirname, "../data");
const dataFilePath = path.join(dataDirectory, "runtime-db.json");

const reviveState = (state: PersistedState): PersistedState => ({
  audits: state.audits.map((audit) => ({
    ...audit,
    createdAt: new Date(audit.createdAt),
    updatedAt: new Date(audit.updatedAt),
  })),
  leads: state.leads.map((lead) => ({
    ...lead,
    createdAt: new Date(lead.createdAt),
    updatedAt: new Date(lead.updatedAt),
  })),
});

const ensureDataFile = () => {
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(
      dataFilePath,
      JSON.stringify({ audits: [], leads: [] }, null, 2),
      "utf-8"
    );
  }
};

const readState = (): PersistedState => {
  ensureDataFile();
  const raw = fs.readFileSync(dataFilePath, "utf-8");
  return reviveState(JSON.parse(raw) as PersistedState);
};

const writeState = (state: PersistedState) => {
  ensureDataFile();
  fs.writeFileSync(dataFilePath, JSON.stringify(state, null, 2), "utf-8");
};

export const createMemoryAudit = (input: {
  tools: IToolInput[];
  teamSize: number;
  useCase: UseCase;
  result: IAuditResult;
  publicId: string;
  isPublic?: boolean;
}) => {
  const state = readState();
  const now = new Date();
  const audit: MemoryAudit = {
    _id: nanoid(12),
    tools: input.tools,
    teamSize: input.teamSize,
    useCase: input.useCase,
    result: input.result,
    publicId: input.publicId,
    isPublic: input.isPublic ?? true,
    createdAt: now,
    updatedAt: now,
  };

  state.audits.push(audit);
  writeState(state);

  return audit;
};

export const getMemoryAuditById = (id: string) =>
  readState().audits.find((audit) => audit._id === id) ?? null;

export const getMemoryAuditByPublicId = (publicId: string) =>
  readState().audits.find((audit) => audit.publicId === publicId) ?? null;

export const deleteMemoryAuditById = (id: string) => {
  const state = readState();
  const auditIndex = state.audits.findIndex((audit) => audit._id === id);

  if (auditIndex === -1) {
    return null;
  }

  const [audit] = state.audits.splice(auditIndex, 1);
  writeState(state);
  return audit;
};

export const updateMemoryAuditSummary = (id: string, summary: string) => {
  const state = readState();
  const audit = state.audits.find((item) => item._id === id);

  if (!audit) {
    return null;
  }

  audit.result.summary = summary;
  audit.updatedAt = new Date();
  writeState(state);
  return audit;
};

export const findMemoryLead = (email: string, auditId: string) =>
  readState().leads.find((lead) => lead.email === email && lead.auditId === auditId) ??
  null;

export const createMemoryLead = (input: {
  email: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  auditId: string;
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;
  intent: "report" | "notify" | "consult";
  source?: string;
  ipAddress?: string;
  userAgent?: string;
  consultationNotes?: string;
  preferredContactWindow?: string;
}) => {
  const state = readState();
  const now = new Date();
  const lead: MemoryLead = {
    _id: nanoid(12),
    email: input.email,
    companyName: input.companyName,
    role: input.role,
    teamSize: input.teamSize,
    auditId: input.auditId,
    estimatedMonthlySavings: input.estimatedMonthlySavings,
    estimatedAnnualSavings: input.estimatedAnnualSavings,
    isHighValue: input.estimatedMonthlySavings >= 500,
    status: "captured",
    intent: input.intent,
    source: input.source,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    consultationNotes: input.consultationNotes,
    preferredContactWindow: input.preferredContactWindow,
    createdAt: now,
    updatedAt: now,
  };

  state.leads.push(lead);
  writeState(state);

  return lead;
};

export const markMemoryLeadAsEmailed = (id: string) => {
  const state = readState();
  const lead = state.leads.find((item) => item._id === id);

  if (!lead) {
    return null;
  }

  lead.status = "emailed";
  lead.updatedAt = new Date();
  writeState(state);
  return lead;
};
