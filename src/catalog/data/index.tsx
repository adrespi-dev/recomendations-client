import { FC } from "react";
import { CheckConfig } from "./CheckConfig";
import { DataTable } from "./DataTable";

export const CatalogData: FC = () => (
  <CheckConfig>
    <div className="page-header">
      <div className="page-title">Catálogo de Datos</div>
      <div>{/* <AddRole /> */}</div>
    </div>
    <div className="page-table">
      <DataTable />
    </div>
  </CheckConfig>
);
