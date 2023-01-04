export type RecModel = {
  id: number;
  name: string;
  model_type: string;
};

export type ModelTrainingLog = {
  id: number;
  status: string;
  status_message: string;
  results: any;
  created_at: string;
};

export type ModelStatus = {
  active: boolean;
  current_step: string;
  description: string;
  extras?: {
    trained_at?: string;
  };
};
