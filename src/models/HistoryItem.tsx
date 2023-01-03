import { FC, useMemo } from "react";
import { ModelTrainingLog } from "./Type";
import { CheckCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { formatDuration } from "../core/Utils";

type Props = {
  log: ModelTrainingLog;
};

export const ModelHistoryItem: FC<Props> = ({ log }) => {
  const { id, created_at, status, status_message, results } = log;

  const duration = useMemo(
    () => formatDuration(results["execution_time"]),
    [results]
  );

  return (
    <NavLink to={`${id}`} className="history-item">
      <div className={`history-item-icon history-item-status-${status}`}>
        {status === "success" && <CheckCircleTwoTone twoToneColor="#21c87e" />}
        {status === "error" && <MinusCircleTwoTone twoToneColor="#ff3c3c" />}
      </div>

      <div className="history-item-content">
        <div className="history-item-description">
          <span className="history-item-id">#{id}. </span>
          <>
            {status === "success"
              ? "Entrenamiento finalizado correctamente"
              : status_message}
          </>
        </div>

        <div className="history-item-sub">
          <ReactTimeAgo date={new Date(created_at)} />
          <span className="history-dot" /> {duration}
        </div>
      </div>
    </NavLink>
  );
};
