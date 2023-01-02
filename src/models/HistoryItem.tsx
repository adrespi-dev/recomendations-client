import { FC } from "react";
import { ModelTrainingLog } from "./Type";
import { CheckCircleTwoTone, MinusCircleTwoTone } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

type Props = {
  log: ModelTrainingLog;
};

export const ModelHistoryItem: FC<Props> = ({ log }) => {
  const { id, status, status_message } = log;

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
          Hace 5 días <span className="history-dot" /> 04:44
        </div>
      </div>
    </NavLink>
  );
};
