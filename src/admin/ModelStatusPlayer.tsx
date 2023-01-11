import classNames from "classnames";
import { FC } from "react";
import { useMutation } from "react-query";
import ReactTimeAgo from "react-time-ago";
import { useRecoilState } from "recoil";
import { cancelTrainModel, trainModel } from "../models/Api";
import { selectedModelIdState } from "../models/State";
import { ModelStatus } from "../models/Type";
import { getStepName } from "../models/utils";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

import { ReactComponent as PlayIcon } from "./play.svg";

export const ModelStatusPlayer: FC<{ status: ModelStatus }> = ({ status }) => {
  const [modelId] = useRecoilState(selectedModelIdState);

  const isDisable =
    status.current_step === "enqueueing" || status.current_step === "buffering";

  const { mutate: train, isLoading: isLoadingTrain } = useMutation(trainModel);
  const { mutate: cancelTrain, isLoading: isLoadingCancelTrain } =
    useMutation(cancelTrainModel);

  const isLoading = isLoadingTrain || isLoadingCancelTrain;

  return (
    <div
      className={classNames("model-status-header", {
        running: isLoading || status.active,
      })}>
      <button
        onClick={() => {
          if (!status.active) {
            train(modelId!);
          } else {
            cancelTrain(modelId!);
          }
        }}
        className="model-status-icon"
        disabled={isDisable}>
        {status.active && <div className="model-status-icon-stop"></div>}
        {!status.active && <PlayIcon />}
      </button>
      {!status.active && <NoActive status={status} />}
      {status.active && <Active status={status} />}
    </div>
  );
};

const NoActive: FC<{ status: ModelStatus }> = ({ status }) => {
  const trainedAt = status?.extras?.trained_at;
  const lastStatus = status?.extras?.last_status;

  return (
    <div className="model-status-content">
      <div className="model-status-title">Listo para entrenar</div>
      <div className="model-status-description">
        {!!trainedAt && (
          <>
            Últ. entrenamiento: <ReactTimeAgo date={new Date(trainedAt)} />
            <span style={{ marginLeft: 6 }}>
              {lastStatus && (
                <>
                  {lastStatus === "success" && (
                    <CheckCircleTwoTone twoToneColor="#21c87e" />
                  )}
                  {lastStatus === "error" && (
                    <CloseCircleTwoTone twoToneColor="#ff3c3c" />
                  )}
                </>
              )}
            </span>
          </>
        )}
        {!trainedAt && <>(No se ha entrenado aún)</>}
      </div>
    </div>
  );
};

const Active: FC<{ status: ModelStatus }> = ({ status }) => {
  const { current_step, description } = status;

  return (
    <div className="model-status-content">
      <div className="model-status-title">{getStepName(current_step)}</div>
      <div className="model-status-description">{description}</div>
    </div>
  );
};
