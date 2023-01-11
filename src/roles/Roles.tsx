import { FC } from "react";
import { useHasPermission } from "../auth/Hooks";
import { AddRole } from "./AddRole";
import { RolesTable } from "./RolesTable";

export const Roles: FC = () => {
  const hasPermission = useHasPermission();
  return (
    <>
      <div className="page-header">
        <div className="page-title">Roles</div>
        {hasPermission("add_user") && (
          <div>
            <AddRole />
          </div>
        )}
      </div>
      <div className="page-table">
        <RolesTable />
      </div>
    </>
  );
};
