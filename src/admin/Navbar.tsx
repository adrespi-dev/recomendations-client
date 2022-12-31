import { FC } from "react";
import { Database, Settings, Shield, Users } from "react-feather";
import { NavLink } from "react-router-dom";

export const Navbar: FC = () => {
  return (
    <div className="layout-navbar">
      <Catalogo />
      <Seguridad />
    </div>
  );
};

const Catalogo: FC = () => {
  return (
    <div className="layout-navbar-section">
      <div className="layout-navbar-section-title">Fuente de datos</div>
      <NavLink className="layout-navbar-item" to={"catalog/data"}>
        <Database />
        <div className="layout-navbar-item-desc">Datos</div>
      </NavLink>

      <NavLink className="layout-navbar-item" to={"catalog/config"}>
        <Settings />
        <div className="layout-navbar-item-desc">Configuración</div>
      </NavLink>
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
