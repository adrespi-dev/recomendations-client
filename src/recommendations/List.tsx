import { FC } from "react";
import { Prediction } from "../models/Type";

export const ModelRecommendationsList: FC<{ predictions: Prediction[] }> = ({
  predictions,
}) => {
  return (
    <div className="recommendations-list">
      {predictions.map((p) => (
        <Item prediction={p} />
      ))}
    </div>
  );
};

const Item: FC<{ prediction: Prediction }> = ({ prediction }) => {
  const props = { ...prediction.candidate };

  return (
    <div className="recommendation-item">
      <div className="recommendation-item-prop active">
        <div className="recommendation-item-prop-label">Calificación:</div>
        <div className="recommendation-item-prop-value">
          {prediction.ranking}
        </div>
      </div>
      {Object.entries(props).map(([label, value]: any) => (
        <div className="recommendation-item-prop">
          <div className="recommendation-item-prop-label">{label}:</div>
          <div className="recommendation-item-prop-value">
            {Array.isArray(value) && <>{value.join(", ")}</>}
            {!Array.isArray(value) && <>{value}</>}
          </div>
        </div>
      ))}
    </div>
  );
};
