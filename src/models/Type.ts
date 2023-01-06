export type RecModel = {
  id: number;
  name: string;
  model_type: string;
};

export type ModelTrainingLog = {
  id: number;
  status: "success" | "error" | "pending";
  status_message: string;
  results: HistoryStatusResults;
  trace: HistoryStatusTrace[];
  created_at: string;
};

export type ModelStatus = {
  active: boolean;
  current_step: string;
  description: string;
  extras?: {
    trained_at?: string;
    last_status?: string;
  };
};

export type HistoryStatus = {
  results: HistoryStatusResults;
  trace: HistoryStatusTrace[];
};

export type HistoryStatusResults = {
  execution_time: number;
  embedding_dimension: number;
  model_optimizer: string;
  model_optimizer_params: { learning_rate: number };
  retrieval_eppochs: number;
  ranking_eppochs: number;
  retrieval_predictions: number;
  ranking_predictions: number;
  retrieval_execution_time: number;
  ranking_execution_time: number;
};

export type HistoryStatusTrace = {
  step: string;
  trace: HistoryStatusTraceNode[];
};

export type HistoryStatusTraceNode = {
  description: string;
  execution_time: number;
};
