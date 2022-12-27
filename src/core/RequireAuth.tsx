import { Navigate, useLocation } from "react-router-dom";
import { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../auth/State";

export const RequireAuth: FC<any> = ({ children }) => {
  const location = useLocation();
  const user = useRecoilValue(currentUserState);

  return (
    <Suspense fallback={<div>cargando...</div>}>
      {!user && <Navigate to="/login" state={{ from: location }} replace />}
      {user && children}
    </Suspense>
  );
};
