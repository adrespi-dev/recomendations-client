import { Select } from "antd";
import { FC, useEffect } from "react";
import { Database, Settings } from "react-feather";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Spinner } from "../components/Spinner";
import { getModels } from "../models/Api";
import { selectedModelIdState } from "../models/State";
import { RecModel } from "../models/Type";

export const ModelMenu: FC = () => {
  const {
    isLoading,
    isError,
    data: models,
  } = useQuery("list-models", getModels);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <Content models={models!} />
      )}
    </>
  );
};

const Content: FC<{ models: RecModel[] }> = ({ models }) => {
  const [modelId, setModelId] = useRecoilState(selectedModelIdState);

  useEffect(() => {
    if (!modelId && models.length) {
      setModelId(models[0].id);
    }
  }, []);

  return (
    <>
      <div className="layout-model-selector">
        <label>Modelo</label>
        <Select value={modelId} onChange={setModelId}>
          {models.map((m) => (
            <Select.Option value={m.id} key={m.id}>
              {m.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Catalogo />
    </>
  );
};

const Catalogo: FC = () => {
  return (
    <div className="layout-navbar-section">
      <div className="layout-navbar-section-title">Fuente de datos</div>
      <NavLink className="layout-navbar-item" to={"catalog/query"}>
        <Database />
        <div className="layout-navbar-item-desc">Ratings</div>
      </NavLink>

      <NavLink className="layout-navbar-item" to={"catalog/candidates"}>
        <Database />
        <div className="layout-navbar-item-desc">Canditatos</div>
      </NavLink>

      <NavLink className="layout-navbar-item" to={"catalog/config"}>
        <Settings />
        <div className="layout-navbar-item-desc">Configuración</div>
      </NavLink>
    </div>
  );
};

const Loading: FC = () => (
  <div className="layout-navbar-loading">
    <Spinner />
  </div>
);

const Error: FC = () => (
  <div className="layout-navbar-error">
    Ocurrió un error y no pudimos cargar los modelos
  </div>
);
