import { Alert, Empty, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useHasPermission } from "../auth/Hooks";
import { User } from "../auth/User";
import { ActionButtons } from "../components/ActionButtons";
import { deleteUser, getUsers } from "./Api";
import { EditUser } from "./EditUser";

export const UsersTable: FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery("list-users", getUsers);

  const { mutateAsync: performDelete } = useMutation(deleteUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const hasPermission = useHasPermission();

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Nombre de usuario",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Nombre completo",
      key: "name",
      render: (_, user) => `${user.first_name} ${user.last_name}`,
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "",
      key: "actions",
      render: (_, user) => {
        return (
          <ActionButtons
            hideEdit={
              user.role === "SuperAdmin" || !hasPermission("change_user")
            }
            hideDelete={
              user.role === "SuperAdmin" || !hasPermission("delete_user")
            }
            onEdit={() => {
              setIsModalOpen(true);
              setSelectedUser(user);
            }}
            onDelete={async () => {
              await performDelete(user.id);
              queryClient.invalidateQueries("list-users");
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

      {isModalOpen && selectedUser && (
        <EditUser
          user={selectedUser}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};

const NoData: FC = () => (
  <Empty description="Aún no ha ingresado ningún usuario" />
);
