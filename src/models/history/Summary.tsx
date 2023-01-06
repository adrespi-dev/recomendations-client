import { FC } from "react";
import { formatDuration } from "../../core/Utils";
import { HistoryStatusResults } from "../Type";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import ReactTimeAgo from "react-time-ago";

type Props = {
  finishedAt: string;
  flowsStatus: "success" | "error" | "pending";
  results: HistoryStatusResults;
};

export const HistorySummary: FC<Props> = ({
  finishedAt,
  flowsStatus,
  results,
}) => {
  return (
    <div className="history-summary">
      <div className="history-summary-title">Historial de entrenamiento</div>
      <div
        className="history-summary-subtitle"
        style={{ color: flowsStatus === "error" ? "#ff3c3c" : "#21c87e" }}>
        <>
          {flowsStatus === "success" && (
            <>
              <CheckCircleTwoTone twoToneColor="#21c87e" />
              <span style={{ marginLeft: 4 }}>Funcionó </span>
            </>
          )}
          {flowsStatus === "error" && (
            <>
              <CloseCircleTwoTone twoToneColor="#ff3c3c" />
              <span style={{ marginLeft: 4 }}>Falló </span>
            </>
          )}
          <ReactTimeAgo date={new Date(finishedAt)} />
        </>
      </div>

      <div className="history-summary-separator"></div>

      <div className="history-summary-group-label">Hiperpámetros</div>
      <div className="history-summary-items">
        <Item
          label="Tiempo de execución:"
          value={formatDuration(results.execution_time)}
        />
        <Item label="Optimizador del modelo:" value={results.model_optimizer} />
        <Item
          label="Tasa de aprendizaje:"
          value={results.model_optimizer_params?.learning_rate}
        />
        <Item
          label="Dimensión de embedding:"
          value={results.embedding_dimension}
        />
      </div>

      <div className="history-summary-group-label" style={{ marginTop: 32 }}>
        Fase de recuperación
      </div>
      <div className="history-summary-items">
        <Item
          label="Tiempo de execución:"
          value={formatDuration(results.retrieval_execution_time)}
        />
        <Item label="Epocas:" value={results.retrieval_eppochs} />
        <Item
          label="Nro. de predicciones:"
          value={results.retrieval_predictions}
        />
      </div>

      <div className="history-summary-group-label" style={{ marginTop: 32 }}>
        Fase de evaluación
      </div>
      <div className="history-summary-items">
        <Item
          label="Tiempo de execución:"
          value={formatDuration(results.ranking_execution_time)}
        />
        <Item label="Epocas:" value={results.ranking_eppochs} />
        <Item
          label="Nro. de predicciones:"
          value={results.ranking_predictions}
        />
      </div>
    </div>
  );
};

const Item: FC<{ label: string; value: any }> = ({ label, value }) => {
  return (
    <div className="history-summary-item">
      <div className="history-summary-item-label">{label}</div>
      <div className="history-summary-item-value">{value}</div>
    </div>
  );
};
