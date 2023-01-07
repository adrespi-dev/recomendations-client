import { FC } from "react";
import { HistoryStatusTraceNode, HistoryStatusTrace } from "../Type";
import { getStepName } from "../utils";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import { formatDuration } from "../../core/Utils";

type Props = {
  flowsStatus: "error" | "success" | "pending";
  trace: HistoryStatusTrace[];
};

export const HistoryFlow: FC<Props> = ({ flowsStatus, trace }) => {
  return (
    <>
      {trace.map((node, idx) => (
        <Node
          isLastNode={idx === trace.length - 1}
          flowsStatus={flowsStatus}
          step={node.step}
          nodes={node.trace}
        />
      ))}
    </>
  );
};

export const Node: FC<{
  isLastNode: boolean;
  flowsStatus: "error" | "success" | "pending";
  step: string;
  nodes: HistoryStatusTraceNode[];
}> = ({ isLastNode, flowsStatus, step, nodes }) => {
  return (
    <div className="history-node">
      <div className="history-node-header">
        <div className="history-node-title">{getStepName(step)}</div>
        <div className="history-node-status">
          {!isLastNode && (
            <CheckCircleFilled
              style={{ fontSize: 20, height: 20, width: 20, color: "#21c87e" }}
            />
          )}
          {flowsStatus === "success" && isLastNode && (
            <CheckCircleFilled
              style={{ fontSize: 20, height: 20, width: 20, color: "#21c87e" }}
            />
          )}
          {flowsStatus === "error" && isLastNode && (
            <CloseCircleFilled
              style={{ fontSize: 20, height: 20, width: 20, color: "#ff3c3c" }}
            />
          )}
        </div>
      </div>
      <div className="history-node-body">
        <div className="history-node-items">
          {nodes.map((n) => (
            <div className="history-node-item">
              <div className="history-node-item-description">
                {n.description}
              </div>
              {n.execution_time && (
                <div className="history-node-item-time">
                  {formatDuration(n.execution_time)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
