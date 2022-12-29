import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Admin } from "../admin/Admin";
import { Login } from "../auth/Login";
import { RequireAuth } from "../auth/RequireAuth";
import { RedirectIfLogged } from "../auth/RedirectIfLogged";
import { Users } from "../users/Users";
import { Roles } from "../roles/Roles";

export const AppRouter: FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="admin"
        element={
          <RequireAuth>
            <Admin />
          </RequireAuth>
        }>
        <Route path="users" element={<Users />}></Route>
        <Route path="roles" element={<Roles />}></Route>
        <Route path="" element={<Navigate to="users" />} />
        <Route path="*" element={<Navigate to="users" />} />
      </Route>

      <Route
        path="login"
        element={
          <RedirectIfLogged>
            <Login />
          </RedirectIfLogged>
        }
      />
      <Route path="*" element={<Navigate to="admin" />} />
    </Routes>
  </BrowserRouter>
);
