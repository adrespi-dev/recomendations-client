import { useMutation } from "react-query";
import { apiClient } from "../core/ApiClient";
import { AuthTokens } from "./State";

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
