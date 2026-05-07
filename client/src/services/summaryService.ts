import api from "./api";

export const generateSummary = async (
  auditId: string
) => {
  const response = await api.post("/summary", {
    auditId,
  });

  return response.data;
};