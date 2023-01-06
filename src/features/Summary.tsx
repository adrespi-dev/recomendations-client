import { FC, ReactNode } from "react";
import { Chart } from "./Chart";
import { Classification } from "./Classification";
import { Feature } from "./Type";

export const Summary: FC<{ feat: Feature; isLoading: boolean }> = ({
  feat,
  isLoading,
}) => {
  return (
    <div className="dashboard-control-container">
      <div className="dashboard-control" style={{ height: "100%" }}>
        <div className="dashboard-control-title">Resumen</div>
        <div className="dashboard-control-body" style={{ height: "auto" }}>
          <Chart
            data={feat}
            isLoading={isLoading}
            chart={() => <Content feat={feat} />}
          />
        </div>
      </div>
    </div>
  );
};

const Content: FC<{ feat: Feature }> = ({ feat }) => {
  const values: {
    label: string;
    key: string;
    render?: (feat: Feature) => ReactNode;
  }[] = [
    { label: "ID", key: "id" },
    { label: "Colleción", key: "collection" },
    { label: "Campo", key: "field_name" },
    { label: "Tipo del campo", key: "field_type" },
    {
      label: "Clasificación",
      key: "classification",
      render: (feat) => <Classification classification={feat.classification} />,
    },
  ];

  return (
    <div className="feature-summary">
      {values.map(({ label, key, render }) => (
        <div className="feature-summary-item">
          <div className="feature-summary-item-label">{label}</div>
          <div className="feature-summary-item-value">
            {render && render(feat)}
            {!render && <>{(feat as any)[key]}</>}
          </div>
        </div>
      ))}
    </div>
  );
};
