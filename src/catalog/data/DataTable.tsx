import { Alert, Empty } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { FC, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { selectedModelIdState } from "../../models/State";
import { getCatalogRecords } from "./Api";

export const DataTable: FC<{ collectionName: string }> = ({
  collectionName,
}) => {
  const modelId = useRecoilValue(selectedModelIdState)!;

  const { data, isLoading, error } = useQuery(
    ["list-recored", modelId, collectionName],
    () => getCatalogRecords(modelId, collectionName)
  );

  const columns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
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
    </>
  );
};

const NoData: FC = () => (
  <Empty description="Aún no ha ingresado ningún registro" />
);
