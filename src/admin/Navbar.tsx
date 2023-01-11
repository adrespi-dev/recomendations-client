import { FC } from "react";
import { Key, Shield, Users } from "react-feather";
import { NavLink } from "react-router-dom";
import { useHasPermission } from "../auth/Hooks";
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
  const hasPermission = useHasPermission();

  return (
    <div className="layout-navbar-section">
      <div className="layout-navbar-section-title">Seguridad</div>
      {hasPermission("view_user") && (
        <NavLink className="layout-navbar-item" to={"users"}>
          <Users />
          <div className="layout-navbar-item-desc">Usuarios</div>
        </NavLink>
      )}
      {hasPermission("view_group") && (
        <NavLink to={"roles"} className="layout-navbar-item">
          <Shield />
          <div className="layout-navbar-item-desc">Roles</div>
        </NavLink>
      )}
      <NavLink to={"api-keys"} className="layout-navbar-item">
        <Key />
        <div className="layout-navbar-item-desc">API Keys</div>
      </NavLink>
    </div>
  );
};
