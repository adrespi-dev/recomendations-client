import { Button } from "antd";
import { FC } from "react";
import { useResetRecoilState } from "recoil";
import { authTokensState } from "../auth/State";

export const Header: FC = () => {
  const logout = useResetRecoilState(authTokensState);

  return (
    <div className="layout-header">
      <div className="layout-header-logo">Recomendaciones</div>
      <div className="layout-user">
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};
