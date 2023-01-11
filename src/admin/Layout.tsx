import { Alert } from "antd";
import { FC } from "react";
import { Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { currentPermissionsState } from "../auth/State";
import { Header } from "./Header";
import "./Layout.scss";
import { Navbar } from "./Navbar";

export const Layout: FC = () => {
  const permissions = useRecoilValue(currentPermissionsState);

  return (
    <div className="layout-main">
      {permissions!.role === "SuperAdmin" && (
        <Alert
          className="layout-no-superadmin"
          type="warning"
          showIcon
          message="Has ingresado con un usuario super administrador, lo cual puede ser peligroso. Te recomendamos que ingreses con un usuario con otro rol."
        />
      )}
      <Header />
      <div className="layout-body">
        <div className="layout-body-navbar">
          <Navbar />
        </div>
        <div className="layout-body-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
