import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Admin } from "../admin/Admin";
import { Login } from "../auth/Login";
import { AuthProvider } from "./AuthContext";
import { RequireAuth } from "./RequireAuth";

export const AppRouter: FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
