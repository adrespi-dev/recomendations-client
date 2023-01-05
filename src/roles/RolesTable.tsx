import { Alert, Empty, Popover, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Role } from "../auth/User";
import { ActionButtons } from "../components/ActionButtons";
import { deleteRole, getRoles } from "./Api";
import { EditRole } from "./EditRole";
import { groupPermissions } from "./Utils";

import "./RolesTable.scss";

export const RolesTable: FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery("list-roles", getRoles);

  const { mutateAsync: performDelete } = useMutation(deleteRole);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const columns: ColumnsType<Role> = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Permisos",
      key: "permissions",
      render: (_, role) => <Permissions permissions={role.permissions} />,
    },
    {
      title: "",
      key: "actions",
      render: (_, role) => {
        return (
          <ActionButtons
            onEdit={() => {
              setIsModalOpen(true);
              setSelectedRole(role);
            }}
            onDelete={async () => {
              await performDelete(role.id);
              queryClient.invalidateQueries("list-roles");
            }}
          />
        );
      },
    },
  ];

  return (
    <>
      {error && (
        <Alert
          showIcon
          type="error"
          message="Ocurrió un error al cargar los usuarios"
        />
      )}

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data || []}
        locale={{ emptyText: <NoData /> }}
      />

      {isModalOpen && selectedRole && (
        <EditRole
          role={selectedRole}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

const Permissions: FC<{ permissions: string[] }> = ({ permissions }) => {
  return (
    <Popover
      placement="bottom"
      title={() => <PermissionsPopOver permissions={permissions} />}>
      <Tag color="processing">
        {permissions.length} {permissions.length === 1 ? "permiso" : "permisos"}
      </Tag>
    </Popover>
  );
};

const PermissionsPopOver: FC<{ permissions: string[] }> = ({ permissions }) => {
  const groups = groupPermissions(permissions);
  return (
    <div className="permisions-popover">
      {groups.map((g) => (
        <div className="permissions-popover-group">
          <div className="permissions-popover-group-title">{g.groupName}</div>
          <div className="permissions-popover-group-permissions">
            {g.permissions.map((p) => (
              <div>{p.description}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const NoData: FC = () => (
  <Empty description="Aún no ha ingresado ningún rol de usuario" />
);
