import { Table } from "antd";
import { FC, useMemo } from "react";
import { Chart } from "./Chart";
import { Feature } from "./Type";

export const NumericalValues: FC<{ feat: Feature; isLoading: boolean }> = ({
  feat,
  isLoading,
}) => {
  return (
    <div className="dashboard-control-container" style={{ flex: "0 0 100%" }}>
      <div className="dashboard-control">
        <div className="dashboard-control-title">Registros</div>
        <div className="dashboard-control-body" style={{ height: "auto" }}>
          <Chart
            data={feat.distribution}
            isLoading={isLoading}
            chart={() => <ValuesTable data={feat.values} />}
          />
        </div>
      </div>
    </div>
  );
};

const ValuesTable: FC<{ data: any[] }> = ({ data }) => {
  const columns: any[] = useMemo(() => {
    const keys = Object.keys(data[0]).filter((x) => x !== "_id");
    return keys.map((k) => ({
      title: k,
      dataIndex: k,
      key: k,
    }));
  }, [data]);

  return (
    <Table
      style={{ width: "100%" }}
      className="features-table"
      columns={columns}
      dataSource={data || []}
      scroll={{ y: "340px" }}
      pagination={{ showSizeChanger: false, simple: true }}
    />
  );
};
