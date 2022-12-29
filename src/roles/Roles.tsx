import { Button } from "antd";
import { FC } from "react";
import { AddRole } from "./AddRole";
import { RolesTable } from "./RolesTable";

export const Roles: FC = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Roles</div>
        <div>
          <AddRole />
        </div>
      </div>
      <div className="page-table">
        <RolesTable />
      </div>
    </>
  );
};
