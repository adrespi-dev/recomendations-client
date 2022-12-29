import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiClient } from "../core/ApiClient";

type SettingCode = "catalog-datasource";

const getCodeAsync = (code: SettingCode) => async () => {
  const response = await apiClient.get<any>(`/api/settings/${code}/`);
  return response.data.value;
};

const getCode = (code: SettingCode) => getCodeAsync(code);

export const useSetting = (code: SettingCode) => {
  return useQuery(`setting-get-${code}`, getCode(code));
};

const setCodeAsync = (code: SettingCode) => async (values: any) => {
  const response = await apiClient.post<any>(`/api/settings/${code}/`, values);
  return response.data;
};

const setCode = (code: SettingCode) => setCodeAsync(code);

export const useSetSetting = (code: SettingCode) => {
  const queryClient = useQueryClient();
  return useMutation(setCode(code), {
    onSuccess: () => queryClient.invalidateQueries(`setting-get-${code}`),
  });
};
