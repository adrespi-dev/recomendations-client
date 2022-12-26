import { createContext, FC, useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router";
import { User } from "../auth/User";

type AuthTokens = { access: string; refresh: string };

type AuthContextType = {
  user: User | null;
  authTokens: AuthTokens | null;
  setAuthTokens: (authTokens: AuthTokens) => void;
  loginUser: (username: string, password: string) => Promise<any>;
  logoutUser: Function;
};

// loginUser,
// @ts-ignore
const AuthContext = createContext<AuthContextType>(null);

export default AuthContext;

export const useAuth = () => useContext(AuthContext);

type Props = {
  children?: React.ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const cachedAuthToken = localStorage.getItem("authTokens");

  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
    cachedAuthToken ? JSON.parse(cachedAuthToken) : null
  );

  const [user, setUser] = useState<User | null>(() =>
    cachedAuthToken ? jwt_decode(cachedAuthToken) : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (username: string, password: string) => {
    // const response = await fetch("http://127.0.0.1:8000/api/token/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     username,
    //     password,
    //   }),
    // });
    // const data = await response.json();
    // if (response.status === 200) {
    //   setAuthTokens(data);
    //   setUser(jwt_decode(data.access));
    //   localStorage.setItem("authTokens", JSON.stringify(data));
    //   history.push("/");
    // } else {
    //   alert("Something went wrong!");
    // }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/");
  };

  const contextData = {
    user,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwt_decode(authTokens.access));
    }

    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
