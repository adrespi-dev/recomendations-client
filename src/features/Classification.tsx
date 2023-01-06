import { FC } from "react";

export const Classification: FC<{ classification: string }> = ({
  classification,
}) => (
  <>
    {classification === "categorical" && (
      <div
        className="tag"
        style={{ width: 90, background: "#f3395a", color: "#ffffff" }}>
        Categórica
      </div>
    )}
    {classification === "numerical" && (
      <div
        className="tag"
        style={{ width: 90, background: "#3f69a7", color: "#ffffff" }}>
        Numérica
      </div>
    )}
  </>
);
