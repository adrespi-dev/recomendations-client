import useWebSocket from "react-use-websocket";
import { useRecoilState } from "recoil";
import { WS_URL } from "../core/Env";
import { selectedModelIdState } from "./State";
import { ModelStatus } from "./Type";

export const useModelStatus = () => {
  const [modelId] = useRecoilState(selectedModelIdState);
  const result = useWebSocket<ModelStatus>(`${WS_URL!}/ws/model/${modelId}/`, {
    retryOnError: true,
    shouldReconnect: () => true,
  });

  return result;
};
