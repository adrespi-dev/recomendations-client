import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import { selectedModelIdState } from "./State";

export const EnsureModel: FC = () => {
  const [modelId] = useRecoilState(selectedModelIdState);
  return (
    <>
      {!!modelId && <Outlet />}
      {!modelId && <Navigate to="/admin/new-model" />}
    </>
  );
};
