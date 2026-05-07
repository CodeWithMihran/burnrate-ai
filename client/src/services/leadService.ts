import api from "./api";

export const saveLead = async (
  email: string,
  auditId: string
) => {
  const response = await api.post("/leads", {
    email,
    auditId,
  });

  return response.data;
};