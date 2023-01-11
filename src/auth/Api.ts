import { useMutation } from "react-query";
import { apiClient } from "../core/ApiClient";
import { AuthTokens } from "./State";
import { MyPermissions } from "./Type";

type LoginParams = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const login = ({ username, password }: LoginParams) =>
    apiClient
      .post<AuthTokens>("/auth/token/", { username, password })
      .then((r) => r.data);

  return useMutation(login);
};

export const getMyPermssions = async () => {
  const result = await apiClient.get<MyPermissions>(`/auth/my_permissions/`);
  return result.data;
};
