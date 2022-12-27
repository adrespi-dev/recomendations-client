import { useResetRecoilState } from "recoil";
import { API_CLIENT } from "../core/ApiClient";
import { AuthTokens, authTokensState } from "./State";

type LoginProps = {
  username: string;
  password: string;
};

export const loginAsync = async ({ username, password }: LoginProps) => {
  const result = await API_CLIENT.post<AuthTokens>("/auth/token/", {
    username,
    password,
  });

  return result.data;
};
