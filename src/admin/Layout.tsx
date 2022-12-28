import { FC } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import "./Layout.scss";
import { Navbar } from "./Navbar";

export const Layout: FC = () => {
  return (
    <div className="layout-main">
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
