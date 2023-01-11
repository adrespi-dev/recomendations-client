import { apiClient } from "../core/ApiClient";
import { PaginatedResult } from "../core/Types";
import { ApiKey } from "./Type";

export const getApiKeys = async (page: number) => {
  const result = await apiClient.get<PaginatedResult<ApiKey>>(
    "/auth/api-keys/",
    { params: { page } }
  );
  return result.data;
};

export const createApiKey = async (values: any) => {
  const result = await apiClient.post<{ key: string }>(
    "/auth/api-keys/",
    values
  );
  return result.data;
};

export const deleteApiKey = async (apiKeyId: number) => {
  const result = await apiClient.post("/auth/api-keys/delete/", {
    id: apiKeyId,
  });
  return result.data;
};
