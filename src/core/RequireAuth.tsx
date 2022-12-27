import { Navigate, useLocation } from "react-router-dom";
import { FC } from "react";
import { useAuth } from "./AuthContext";

export const RequireAuth: FC<any> = ({ children }) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
