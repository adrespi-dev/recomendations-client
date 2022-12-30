import { Alert, Empty } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { FC, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ActionButtons } from "../../components/ActionButtons";
import { deleteCatalogRecord, getCatalogRecords } from "./Api";

export const DataTable: FC = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(
    "list-catalog-records",
    getCatalogRecords
  );

  const { mutateAsync: performDelete } = useMutation(deleteCatalogRecord);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => {
        return (
          <ActionButtons
            onEdit={() => {
              setIsModalOpen(true);
              setSelectedRecord(record);
            }}
            onDelete={async () => {
              await performDelete(record.id);
              queryClient.invalidateQueries("list-catalog-records");
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
          message="Ocurrió un error al cargar los registros"
        />
      )}
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data || []}
        locale={{ emptyText: <NoData /> }}
      />

      {isModalOpen && selectedRecord && (
        // <EditUser
        //   user={selectedUser}
        //   isModalOpen={isModalOpen}
        //   setIsModalOpen={setIsModalOpen}
        // />
        <></>
      )}
    </>
  );
};

const NoData: FC = () => (
  <Empty description="Aún no ha ingresado ningún registro" />
);
