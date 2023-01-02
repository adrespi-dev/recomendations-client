import { FC } from "react";
import { Shield, Users } from "react-feather";
import { NavLink } from "react-router-dom";
import { ModelMenu } from "./ModelMenu";

export const Navbar: FC = () => {
  return (
    <div className="layout-navbar">
      <ModelMenu />
      <Seguridad />
    </div>
  );
};

const Seguridad: FC = () => {
  return (
    <div className="layout-navbar-section">
      <div className="layout-navbar-section-title">Seguridad</div>
      <NavLink className="layout-navbar-item" to={"users"}>
        <Users />
        <div className="layout-navbar-item-desc">Usuarios</div>
      </NavLink>
      <NavLink to={"roles"} className="layout-navbar-item">
        <Shield />
        <div className="layout-navbar-item-desc">Roles</div>
      </NavLink>
    </div>
  );
};
