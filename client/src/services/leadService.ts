import api from "./api";

export interface LeadPayload {
  email: string;
  auditId: string;
  companyName?: string;
  role?: string;
  teamSize?: number;
  intent?: "report" | "notify" | "consult";
  consultationNotes?: string;
  preferredContactWindow?: string;
}

export const saveLead = async (
  payload: LeadPayload
) => {
  const response = await api.post("/lead", payload);

  return response.data;
};
