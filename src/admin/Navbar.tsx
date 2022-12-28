import { FC } from "react";
import { Users } from "react-feather";
import { NavLink } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <div className="layout-navbar">
      <Seguridad />
    </div>
  );
};

const Seguridad: FC = () => {
  return (
    <>
      <div className="layout-navbar-section">Seguridad</div>
      <NavLink className="layout-navbar-item" to={"users"}>
        <Users />
        <div className="layout-navbar-item-desc">Usuarios</div>
      </NavLink>
      <NavLink to={"roles"} className="layout-navbar-item">
        <Users />
        <div className="layout-navbar-item-desc">Roles</div>
      </NavLink>
    </>
  );
};
