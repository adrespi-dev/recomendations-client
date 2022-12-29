import { useMutation, useQuery, useQueryClient } from "react-query";
import { apiClient } from "../core/ApiClient";

const getCodeAsync = (code: string) => async () => {
  const response = await apiClient.get<any>(`/api/settings/${code}/`);
  return response.data.value;
};

const getCode = (code: string) => getCodeAsync(code);

export const useSetting = (code: string) => {
  return useQuery(`setting-get-${code}`, getCode(code));
};

const setCodeAsync = (code: string) => async (values: any) => {
  const response = await apiClient.post<any>(`/api/settings/${code}/`, values);
  return response.data;
};

const setCode = (code: string) => setCodeAsync(code);

export const useSetSetting = (code: string) => {
  const queryClient = useQueryClient();
  return useMutation(setCode(code), {
    onSuccess: () => queryClient.invalidateQueries(`setting-get-${code}`),
  });
};
