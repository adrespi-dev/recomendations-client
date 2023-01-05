import { apiClient } from "../core/ApiClient";
import { PaginatedResult, PaginationParams } from "../core/Types";
import { Feature } from "./Type";

export const getFeatures = async (
  modelId: number,
  paginationParams: PaginationParams
) => {
  const result = await apiClient.get<PaginatedResult<Feature>>(
    `/api/models/${modelId}/features`,
    { params: paginationParams }
  );
  return result.data;
};

export const createFeature = async ({
  modelId,
  values,
}: {
  modelId: number;
  values: any;
}) => {
  const result = await apiClient.post<Feature>(
    `/api/models/${modelId}/features/`,
    values
  );
  return result.data;
};

export const deleteFeature = async ({
  modelId,
  featureId,
}: {
  modelId: number;
  featureId: number;
}) => {
  const result = await apiClient.delete<Feature>(
    `/api/models/${modelId}/features/${featureId}`
  );

  return result.data;
};
