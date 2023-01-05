import { FC } from "react";
import { AddFeature } from "./AddFeature";
import { FeaturesTable } from "./Table";

export const ModelFeatures: FC = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Características</div>
        <div>
          <AddFeature />
        </div>
      </div>
      <div className="page-table">
        <FeaturesTable />
      </div>
    </>
  );
};
