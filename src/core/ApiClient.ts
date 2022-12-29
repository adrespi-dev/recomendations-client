import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { getRecoil, setRecoil } from "recoil-nexus";
import { AuthTokens, authTokensState } from "../auth/State";
import { API_URL } from "./Env";

const apiClient = axios.create({ baseURL: API_URL });
apiClient.interceptors.request.use(async (req) => {
  let tokens = getRecoil(authTokensState);
  if (!tokens) {
    return req;
  }

  const { exp } = jwtDecode(tokens.access) as any;
  const isExpired = dayjs.unix(exp).diff(dayjs()) < 1;

  if (isExpired) {
    const response = await axios.post<AuthTokens>(
      `${API_URL}/auth/token/refresh/`,
      {
        refresh: tokens.refresh,
      }
    );
    tokens = response.data;
    setRecoil(authTokensState, tokens);
  }

  req.headers!.Authorization = `Bearer ${tokens.access}`;
  return req;
});

export { apiClient };
