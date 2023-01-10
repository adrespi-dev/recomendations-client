import { FC } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { ErrorSection } from "../components/ErrorSection";
import { SpinnerSection } from "../components/SpinnerSection";
import { getModel } from "../models/Api";
import { selectedModelIdState } from "../models/State";
import { ModelRecommendationsForm } from "./Form";

import "./index.scss";

export const ModelRecommendations: FC = () => {
  const [modelId] = useRecoilState(selectedModelIdState);
  const {
    isLoading,
    data: model,
    isError,
  } = useQuery(["get-model", modelId], () => getModel(modelId!));

  return (
    <>
      <div className="page-header">
        <div className="page-title">Recomendaciones</div>
      </div>

      <div className="page-body">
        {isLoading && (
          <div style={{ marginTop: 24 }}>
            <SpinnerSection />
          </div>
        )}

        {isError && (
          <div style={{ margin: "0 auto", maxWidth: 360, marginTop: 36 }}>
            <ErrorSection />
          </div>
        )}

        {model && <ModelRecommendationsForm model={model} />}
      </div>
    </>
  );
};
