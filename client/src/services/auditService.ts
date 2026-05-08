import api from "./api";
import type {
  AuditPayload,
  CreateAuditResponse,
  PublicAuditResponse,
} from "../types/audit.types";

export const createAudit = async (
  payload: AuditPayload
) => {
  const response = await api.post<CreateAuditResponse>("/audit", payload);

  return response.data;
};

export const getAuditByPublicId = async (
  publicId: string
) => {
  const response = await api.get<PublicAuditResponse>(
    `/audit/public/${publicId}`
  );

  return response.data;
};
