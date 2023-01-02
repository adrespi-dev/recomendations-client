import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { apiClient } from "../core/ApiClient";
import { selectedModelIdState } from "../models/State";

type SettingCode = "catalog-datasource";

const getCodeAsync = (modelId: number, code: SettingCode) => async () => {
  const response = await apiClient.get<any>(
    `/api/models/${modelId}/settings/${code}/`
  );
  return response.data.value;
};

const getCode = (modelId: number, code: SettingCode) =>
  getCodeAsync(modelId, code);

export const useSetting = (code: SettingCode) => {
  const modelId = useRecoilValue(selectedModelIdState);
  return useQuery(`setting-get-${code}`, getCode(modelId!, code));
};

const setCodeAsync =
  (modelId: number, code: SettingCode) => async (values: any) => {
    const response = await apiClient.post<any>(
      `/api/models/${modelId}/settings/${code}/`,
      values
    );
    return response.data;
  };

const setCode = (modelId: number, code: SettingCode) =>
  setCodeAsync(modelId, code);

export const useSetSetting = (code: SettingCode) => {
  const modelId = useRecoilValue(selectedModelIdState);
  const queryClient = useQueryClient();

  return useMutation(setCode(modelId!, code), {
    onSuccess: () => queryClient.invalidateQueries(`setting-get-${code}`),
  });
};
