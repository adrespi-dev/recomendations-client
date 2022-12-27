import { FC } from "react";
import { useResetRecoilState } from "recoil";
import { authTokensState } from "../auth/State";

export const Admin: FC = () => {
  const logout = useResetRecoilState(authTokensState);

  return (
    <>
      <button onClick={logout}></button>
    </>
  );
};
