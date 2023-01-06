import { Histogram } from "@ant-design/plots";
import { Column } from "@ant-design/plots";
import { FC, useMemo } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ErrorSection } from "../components/ErrorSection";
import { selectedModelIdState } from "../models/State";
import { getFeature } from "./Api";
import { Chart } from "./Chart";
import { NumericalValues } from "./NumericalValues";
import { Summary } from "./Summary";
import { Feature } from "./Type";

import "./Detail.scss";
import { BackButton } from "../components/BackButton";

export const ModelFeaturesDetail: FC = () => {
  const [modelId] = useRecoilState(selectedModelIdState);
  const { id } = useParams();

  const featureId = useMemo(() => parseInt(id!), [id]);

  const {
    data: feature,
    isLoading,
    isError,
  } = useQuery(["feature", modelId, featureId], () =>
    getFeature(modelId!, featureId)
  );

  const { collection, field_name, distribution, classification } =
    feature || {};

  return (
    <>
      {!isError && (
        <>
          <div className="page-header">
            {!isLoading && (
              <div
                className="page-title"
                style={{ display: "flex", alignItems: "center" }}>
                <div style={{ marginLeft: 8 }}>
                  <BackButton to="/admin/model/features" />
                </div>
                <div>
                  Característica: {collection}.{field_name}
                </div>
              </div>
            )}
            {isLoading && <div className="page-title">Cargando</div>}
          </div>
          <div className="page-body">
            <div
              className="features-dashboard"
              style={{ maxWidth: 1028, margin: "0 auto" }}>
              <div className="flex" style={{ alignItems: "stretch" }}>
                <Summary feat={feature!} isLoading={isLoading} />

                <div className="dashboard-control-container">
                  <div className="dashboard-control">
                    <div className="dashboard-control-title">Distribución</div>
                    <div className="dashboard-control-body">
                      <Chart
                        data={distribution}
                        isLoading={isLoading}
                        chart={() => <Distribution feat={feature!} />}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex">
                {classification === "numerical" && (
                  <NumericalValues feat={feature!} isLoading={isLoading} />
                )}

                {classification === "categorical" && (
                  <NumericalValues feat={feature!} isLoading={isLoading} />
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {isError && (
        <div style={{ margin: "0 auto", marginTop: 52, maxWidth: 360 }}>
          <ErrorSection />
        </div>
      )}
    </>
  );
};

type FeatProps = { feat: Feature };
const Distribution: FC<FeatProps> = ({ feat }) => {
  const { classification, distribution } = feat;

  return (
    <>
      {classification === "numerical" && (
        <Histogram
          autoFit
          binField="value"
          data={distribution}
          tooltip={false}
          color={"#0f62fe"}
        />
      )}
      {classification === "categorical" && (
        <>
          <Column
            autoFit
            xField={feat.field_name}
            yField="value"
            data={distribution}
            color={"#0f62fe"}
            tooltip={false}
          />
        </>
      )}
    </>
  );
};
