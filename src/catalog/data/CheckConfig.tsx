import { Button, Empty } from "antd";
import { FC } from "react";
import { NavLink } from "react-router-dom";
import { useSetting } from "../../settings/Api";

export const CheckConfig: FC<any> = ({ children }) => {
  const { data: config, isLoading } = useSetting("catalog-datasource");

  return isLoading ? null : config!! ? children : <NoConfig />;
};

const NoConfig: FC = () => (
  <Empty
    className="empty-full"
    description="No ha configurado una fuente de datos para el catálogo de datos">
    <NavLink to={"/admin/catalog/config"}>
      <Button type="primary">Configurar</Button>
    </NavLink>
  </Empty>
);
