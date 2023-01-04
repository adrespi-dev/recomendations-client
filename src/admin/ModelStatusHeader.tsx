import { Alert, Skeleton } from "antd";
import { FC, useMemo } from "react";
import { ReadyState } from "react-use-websocket";
import { useRecoilState } from "recoil";
import { selectedModelIdState } from "../models/State";
import { useModelStatus } from "../models/useModelStatus";
import "./ModelStatusHeader.scss";
import { ModelStatusPlayer } from "./ModelStatusPlayer";

export const ModelStatusHeader: FC = () => {
  const [modelId] = useRecoilState(selectedModelIdState);

  return <>{modelId!! && <Content />}</>;
};

const Content: FC = () => {
  const { readyState, lastJsonMessage: status } = useModelStatus();

  const content = useMemo(() => {
    switch (readyState) {
      case ReadyState.CONNECTING:
        return <Loading />;

      case ReadyState.CLOSING:
        return <Loading />;

      case ReadyState.CLOSED:
        return <Error />;

      case ReadyState.OPEN:
        if (status) {
          return <ModelStatusPlayer status={status} />;
        } else {
          return <Loading />;
        }
    }
  }, [readyState, status]);

  return <div className="modal-status-header-container">{content}</div>;
};

const Loading: FC = () => (
  <div className="flex" style={{ width: "100%" }}>
    <Skeleton.Avatar active shape="circle" />
    <Skeleton.Input active style={{ marginLeft: 12, flex: "auto" }} />
  </div>
);

const Error: FC = () => (
  <Alert
    type="error"
    showIcon
    message="Error al cargar estado del modelo"></Alert>
);
