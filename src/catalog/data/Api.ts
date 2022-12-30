import { apiClient } from "../../core/ApiClient";

export const getCatalogRecords = async () => {
  const result = await apiClient.get<any[]>("/api/catalog/records/");
  return result.data;
};

export const deleteCatalogRecord = async (recordId: number) => {
  const result = await apiClient.delete(`/api/catalog/records/${recordId}`);
  return result.data;
};
