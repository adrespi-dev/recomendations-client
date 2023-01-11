import { FC } from "react";
import { useHasPermission } from "../auth/Hooks";
import { AddUser } from "./AddUser";
import { UsersTable } from "./UsersTable";

export const Users: FC = () => {
  const hasPermission = useHasPermission();
  return (
    <>
      <div className="page-header">
        <div className="page-title">Usuarios</div>
        {hasPermission("add_user") && (
          <div>
            <AddUser />
          </div>
        )}
      </div>
      <div className="page-table">
        <UsersTable />
      </div>
    </>
  );
};
