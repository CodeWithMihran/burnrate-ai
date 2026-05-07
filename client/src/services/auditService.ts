import api from "./api";

export interface ToolPayload {
  toolName: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditPayload {
  teamSize: number;
  useCase: string;
  tools: ToolPayload[];
}

export const createAudit = async (
  payload: AuditPayload
) => {
  const response = await api.post("/audits", payload);

  return response.data;
};

export const getAuditById = async (
  publicId: string
) => {
  const response = await api.get(`/audits/${publicId}`);

  return response.data;
};