import { FC } from "react";
import { AddUser } from "./AddUser";
import { UsersTable } from "./UsersTable";

export const Users: FC = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Usuarios</div>
        <div>
          <AddUser />
        </div>
      </div>
      <div className="page-table">
        <UsersTable />
      </div>
    </>
  );
};
