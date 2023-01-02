import { apiClient } from "../core/ApiClient";
import { RecModel } from "./Type";

export const getModels = async () => {
  const result = await apiClient.get<RecModel[]>("/api/models/");
  return result.data;
};

export const createModel = async (values: any) => {
  const result = await apiClient.post<RecModel>("/api/models/", values);
  return result.data;
};

export const updateModel = async ({
  ModelId,
  values,
}: {
  ModelId: number;
  values: any;
}) => {
  const result = await apiClient.put(`/api/models/${ModelId}/`, values);
  return result.data;
};

export const deleteModel = async (ModelId: number) => {
  const result = await apiClient.delete(`/api/models/${ModelId}`);
  return result.data;
};
