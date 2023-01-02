import { Alert, Empty } from "antd";
import Table from "antd/es/table";
import { FC, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { selectedModelIdState } from "../../models/State";
import { getCatalogRecords } from "./Api";

export const DataTable: FC<{ collectionName: string }> = ({
  collectionName,
}) => {
  const modelId = useRecoilValue(selectedModelIdState)!;

  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ["list-recored", modelId, collectionName, page],
    () => getCatalogRecords(modelId, collectionName, { page: page })
  );

  const columns = useMemo(() => {
    const records = data?.results || [];
    const oneRecord = records[0] || {};
    const columns: any[] = [];

    for (const [key] of Object.entries(oneRecord)) {
      columns.push({
        title: key,
        dataIndex: key,
        key: key,
      });
    }

    return columns;
  }, [data]);

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
        dataSource={data?.results || []}
        scroll={{
          x: "100%",
          y: "calc(100vh - 62px - 64px - 120px)",
        }}
        pagination={{
          onChange: (page) => setPage(page),
          current: page,
          pageSize: 20,
          total: data?.count,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `Mostrando ${range[0]}-${range[1]} de ${total} registros`,
        }}
        locale={{ emptyText: <NoData /> }}
      />
    </>
  );
};

const NoData: FC = () => (
  <Empty description="Aún no ha ingresado ningún registro" />
);
