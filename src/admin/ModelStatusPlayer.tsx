import classNames from "classnames";
import { FC } from "react";
import { ModelStatus } from "../models/Type";

import { ReactComponent as PlayIcon } from "./play.svg";

export const ModelStatusPlayer: FC<{ status: ModelStatus }> = ({ status }) => {
  return (
    <div
      className={classNames("model-status-header", { running: status.active })}>
      <button className="model-status-icon">
        <PlayIcon />
      </button>
      {!status.active && <NoActive status={status} />}
      {status.active && <Active status={status} />}
    </div>
  );
};

const NoActive: FC<{ status: ModelStatus }> = ({ status }) => {
  const trainedAt = status?.extras?.trained_at;
  return (
    <div className="model-status-content">
      <div className="model-status-title">Listo para entrenar</div>
      <div className="model-status-description">
        {!!trainedAt && <>Último entrenamiento: {trainedAt}</>}
        {!trainedAt && <>(No se ha entrenado aún)</>}
      </div>
    </div>
  );
};

const Active: FC<{ status: ModelStatus }> = ({ status }) => {
  const { current_step, description } = status;
  return (
    <div className="model-status-content">
      <div className="model-status-title">Fase: {current_step}</div>
      <div className="model-status-description">{description}</div>
    </div>
  );
};
