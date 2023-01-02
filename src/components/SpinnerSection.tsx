import { FC } from "react";
import { Spinner } from "./Spinner";

export const SpinnerSection: FC = () => (
  <div className="spinner-section">
    <Spinner size={42} />
  </div>
);
