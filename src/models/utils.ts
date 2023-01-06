const STEPS_MAP: any = {
  enqueueing: "Encolando",
  buffering: "Buffering",
  start: "Inicio",
  loading_data: "Carga de datos",
  retrieval: "Fase de Recuperación",
  ranking: "Fase de Ranking",
};

export const getStepName = (step: string) => STEPS_MAP[step] || step;
