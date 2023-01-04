const STEPS_MAP: any = {
  enqueueing: "Encolando",
  buffering: "Buffering",
};

export const getStepName = (step: string) => STEPS_MAP[step] || step;
