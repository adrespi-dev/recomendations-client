import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Admin } from "../admin/Admin";
import { Login } from "../auth/Login";
import { RequireAuth } from "../auth/RequireAuth";
import { RedirectIfLogged } from "../auth/RedirectIfLogged";
import { Users } from "../users/Users";
import { Roles } from "../roles/Roles";
import { CatalogData } from "../catalog/data";

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
        <Route path="catalog">
          <Route path="data" element={<CatalogData />}></Route>
          <Route path="config" element={<div>Config</div>}></Route>
          <Route path="*" element={<Navigate to="data" />} />
        </Route>

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
