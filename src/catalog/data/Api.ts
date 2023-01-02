import { apiClient } from "../../core/ApiClient";

export const getCatalogRecords = async (
  modelId: number,
  collectionName: string
) => {
  const result = await apiClient.get<any[]>(
    `/api/models/${modelId}/catalog/${collectionName}/records/`
  );
  return result.data;
};
