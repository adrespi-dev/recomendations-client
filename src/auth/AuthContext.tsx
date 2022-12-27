import { createContext, FC, useContext } from "react";
import { useNavigate } from "react-router";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authTokensState } from "./State";

type AuthContextType = {
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
  const resetAuthTokens = useResetRecoilState(authTokensState);
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
    resetAuthTokens();
    navigate("/");
  };

  const contextData = {
    // authTokens,
    // setAuthTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
