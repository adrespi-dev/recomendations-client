import { FC } from "react";
import { CheckConfig } from "./CheckConfig";
import { DataTable } from "./DataTable";
import { CollectionName } from "./Types";

type Props = { collectionName: CollectionName };

export const CatalogData: FC<Props> = ({ collectionName }) => {
  return (
    <CheckConfig>
      <div className="page-header">
        <div className="page-title">
          Catálogo de Datos (
          {collectionName === "query" ? "Ratings" : "Candidatos"})
        </div>
      </div>
      <div className="page-table">
        <DataTable collectionName={collectionName} />
      </div>
    </CheckConfig>
  );
};
