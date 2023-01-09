import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { useRecoilValue } from "recoil";
import { apiClient } from "../core/ApiClient";
import { selectedModelIdState } from "../models/State";

type SettingCode = "catalog-datasource";

export const getSettings = async (modelId: number, codes: string[]) => {
  const response = await apiClient.get<any>(
    `/api/models/${modelId}/multi_settings`,
    { params: { codes: codes.join(",") } }
  );
  return response.data;
};

const getSettingAsync = (modelId: number, code: SettingCode) => async () => {
  const response = await apiClient.get<any>(
    `/api/models/${modelId}/settings/${code}/`
  );
  return response.data.value;
};

const getSetting = (modelId: number, code: SettingCode) =>
  getSettingAsync(modelId, code);

export const useSetting = (
  code: SettingCode,
  options?: UseQueryOptions
): UseQueryResult<any> => {
  const modelId = useRecoilValue(selectedModelIdState);
  // @ts-ignore
  return useQuery(`setting-get-${code}`, getSetting(modelId!, code), options);
};

export const setSettings = async ({
  modelId,
  values,
}: {
  modelId: number;
  values: any;
}) => {
  const response = await apiClient.post<any>(
    `/api/models/${modelId}/multi_settings/`,
    values
  );
  return response.data;
};

const setSettingAsync =
  (modelId: number, code: SettingCode) => async (values: any) => {
    const response = await apiClient.post<any>(
      `/api/models/${modelId}/settings/${code}/`,
      values
    );
    return response.data;
  };

const setSetting = (modelId: number, code: SettingCode) =>
  setSettingAsync(modelId, code);

export const useSetSetting = (code: SettingCode) => {
  const modelId = useRecoilValue(selectedModelIdState);
  const queryClient = useQueryClient();

  return useMutation(setSetting(modelId!, code), {
    onSuccess: () => queryClient.invalidateQueries(`setting-get-${code}`),
  });
};
