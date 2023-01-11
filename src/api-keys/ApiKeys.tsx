import { FC } from "react";
import { useHasPermission } from "../auth/Hooks";
import { AddApiKey } from "./AddApiKey";
import { ApiKeysList } from "./ApiKeysList";

import "./ApiKeys.scss";

export const ApiKeys: FC = () => {
  const hasPermission = useHasPermission();

  return (
    <>
      <div className="page-header">
        <div className="page-title">Llaves de API</div>
        {hasPermission("add_apikey") && (
          <div>
            <AddApiKey />
          </div>
        )}
      </div>
      <div className="page-body">
        <ApiKeysList />
      </div>
    </>
  );
};
