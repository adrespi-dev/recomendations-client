import { Alert, Empty } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { FC, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { ActionButtons } from "../components/ActionButtons";
import { selectedModelIdState } from "../models/State";
import { deleteFeature, getFeatures } from "./Api";
import { Feature } from "./Type";
import { getFieldTypeName } from "./Utils";
import { Histogram } from "@ant-design/plots";
import { Column } from "@ant-design/plots";

import "./Table.scss";
import { useNavigate } from "react-router-dom";
import { Classification } from "./Classification";

export const FeaturesTable: FC = () => {
  const queryClient = useQueryClient();

  const modelId = useRecoilValue(selectedModelIdState)!;

  const navigate = useNavigate();

  const { mutateAsync: performDelete } = useMutation(deleteFeature);

  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ["list-features", modelId, page],
    () => getFeatures(modelId, { page: page })
  );

  const columns: ColumnsType<Feature> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Colección",
      dataIndex: "collection",
      key: "collection",
    },
    {
      title: "Campo",
      dataIndex: "field_name",
      key: "field_name",
    },
    {
      title: "Tipo del campo",
      dataIndex: "field_type",
      key: "field_type",
      render: (_, feature) => <>{getFieldTypeName(feature.field_type)}</>,
    },
    {
      title: "Clasificación",
      dataIndex: "classification",
      key: "classification",
      render: (_, { classification }) => (
        <Classification classification={classification} />
      ),
    },
    {
      title: "Distribución",
      dataIndex: "distribution",
      key: "distribution",
      render: (_, { field_name, classification, distribution }) => (
        <>
          {distribution && (
            <div style={{ width: 80, height: 64 }}>
              {classification === "numerical" && (
                <Histogram
                  autoFit
                  xAxis={false}
                  yAxis={false}
                  binField="value"
                  data={distribution}
                  legend={false}
                  tooltip={false}
                  color={"#0f62fe"}
                />
              )}
              {classification === "categorical" && (
                <>
                  <Column
                    autoFit
                    xAxis={false}
                    yAxis={false}
                    xField={field_name}
                    yField="value"
                    data={distribution}
                    legend={false}
                    tooltip={false}
                    color={"#0f62fe"}
                  />
                </>
              )}
            </div>
          )}
        </>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_, feat) => {
        return (
          <ActionButtons
            hideEdit={true}
            onDelete={async () => {
              await performDelete({ modelId: modelId!, featureId: feat.id });
              queryClient.invalidateQueries("list-features");
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
        className="features-table"
        loading={isLoading}
        columns={columns}
        dataSource={data?.results || []}
        onRow={(feat: Feature) => {
          return {
            onClick: (_e) => {
              console.log(feat);
              navigate(`/admin/model/features/${feat.id}`);
            },
          };
        }}
        scroll={{
          x: "100%",
          y: "calc(100vh - 62px - 48px - 120px)",
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
