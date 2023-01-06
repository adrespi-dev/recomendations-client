import { FC } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Admin } from "../admin/Admin";
import { Login } from "../auth/Login";
import { RequireAuth } from "../auth/RequireAuth";
import { RedirectIfLogged } from "../auth/RedirectIfLogged";
import { Users } from "../users/Users";
import { Roles } from "../roles/Roles";
import { CatalogData } from "../catalog/data";
import { CatalogSettings } from "../catalog/config";
import { ModelParamsPage } from "../models/Params";
import { ModelHistory } from "../models/History";
import { NewModel } from "../models/NewModel";
import { EnsureModel } from "../models/EnsureModel";
import { ModelFeatures } from "../features/Features";
import { ModelFeaturesDetail } from "../features/Detail";
import { HistoryPage } from "../models/history/Page";

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
        <Route path="new-model" element={<NewModel />}></Route>

        <Route path="model" element={<EnsureModel />}>
          <Route path="params" element={<ModelParamsPage />}></Route>
          <Route path="history" element={<ModelHistory />}></Route>
          <Route path="history/:id" element={<HistoryPage />}></Route>
          <Route path="" element={<Navigate to="params" />} />
          <Route path="*" element={<Navigate to="params" />} />

          <Route path="catalog">
            <Route
              path="query"
              element={<CatalogData collectionName="query" />}></Route>
            <Route
              path="candidates"
              element={<CatalogData collectionName="candidates" />}></Route>
            <Route path="config" element={<CatalogSettings />}></Route>
            <Route path="*" element={<Navigate to="query" />} />
          </Route>

          <Route path="features" element={<ModelFeatures />}></Route>
          <Route path="features/:id" element={<ModelFeaturesDetail />}></Route>
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
