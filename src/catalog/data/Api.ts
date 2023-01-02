import { apiClient } from "../../core/ApiClient";
import { PaginatedResult, PaginationParams } from "../../core/Types";

export const getCatalogRecords = async (
  modelId: number,
  collectionName: string,
  pagination: PaginationParams
) => {
  const result = await apiClient.get<PaginatedResult<any>>(
    `/api/models/${modelId}/catalog/${collectionName}/`,
    { params: pagination }
  );
  return result.data;
};
