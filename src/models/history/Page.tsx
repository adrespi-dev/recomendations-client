import { FC } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getHistoryDetail } from "../Api";
import { selectedModelIdState } from "../State";
import { HistoryDetail } from "./Detail";

export const HistoryPage: FC = () => {
  const [modelId] = useRecoilState(selectedModelIdState);
  const { id: historyId } = useParams();

  const { data, isLoading } = useQuery(
    ["history-detail", modelId, historyId],
    () => getHistoryDetail(modelId!, parseInt(historyId!))
  );
  return (
    <>
      <HistoryDetail
        isLoading={isLoading}
        finishedAt={data?.created_at}
        flowsStatus={data?.status}
        results={data?.results}
        trace={data?.trace}
      />
    </>
  );
};
