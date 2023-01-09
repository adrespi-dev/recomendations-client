import { FC } from "react";
import { Spinner } from "../../components/Spinner";
import { HistoryStatusResults, HistoryStatusTrace } from "../Type";
import { HistoryFlow } from "./Flow";

import "./Page.scss";
import { HistorySummary } from "./Summary";

type Props = {
  finishedAt?: string;
  flowsStatus?: "error" | "success" | "pending";
  isLoading: boolean;
  results?: HistoryStatusResults;
  trace?: HistoryStatusTrace[];
};

export const HistoryDetail: FC<Props> = ({
  finishedAt,
  flowsStatus,
  isLoading,
  results,
  trace,
}) => {
  return (
    <div className="page-full">
      <div className="history-detail">
        <div className="history-detail-left">
          {isLoading && (
            <div className="history-loading">
              <Spinner />
            </div>
          )}
          {!isLoading && (
            <HistorySummary
              finishedAt={finishedAt!}
              flowsStatus={flowsStatus!}
              results={results!}
            />
          )}
        </div>
        <div className="history-detail-right">
          {isLoading && (
            <div className="history-loading">
              <Spinner />
            </div>
          )}
          {!isLoading && trace && (
            <HistoryFlow flowsStatus={flowsStatus!} trace={trace!} />
          )}
        </div>
      </div>
    </div>
  );
};
