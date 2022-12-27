import { Navigate } from "react-router-dom";
import { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "./State";

export const RedirectIfLogged: FC<any> = ({ children }) => {
  const user = useRecoilValue(currentUserState);

  return (
    <Suspense fallback={<div>cargando...</div>}>
      {user && <Navigate to="/" replace />}
      {!user && children}
    </Suspense>
  );
};
