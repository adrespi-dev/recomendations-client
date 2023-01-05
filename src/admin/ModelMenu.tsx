import { Button, Empty, Select } from "antd";
import { FC, ReactNode, useEffect, useState } from "react";
import { Cpu, Database, PlayCircle, Settings, Zap } from "react-feather";
import { useQuery } from "react-query";
import { NavLink } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Spinner } from "../components/Spinner";
import { getModels } from "../models/Api";
import { selectedModelIdState } from "../models/State";
import { RecModel } from "../models/Type";
import { PlusCircleTwoTone } from "@ant-design/icons";

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
        <EnsureModelNavbar models={models!}>
          <Content models={models!} />
        </EnsureModelNavbar>
      )}
    </>
  );
};

const EnsureModelNavbar: FC<{
  models: RecModel[];
  children: ReactNode;
}> = ({ models, children }) => {
  return (
    <>
      {!models.length && (
        <Empty
          style={{ marginBottom: 36 }}
          description="Aún no ha creado un modelo">
          <NavLink to={"/admin/new-model"}>
            <Button type="primary">Crear Modelo</Button>
          </NavLink>
        </Empty>
      )}

      {!!models.length && children}
    </>
  );
};

const Content: FC<{ models: RecModel[] }> = ({ models }) => {
  const [firstRender, setFirstRender] = useState(false);
  const [modelId, setModelId] = useRecoilState(selectedModelIdState);

  useEffect(() => {
    if (!modelId && models.length) {
      setModelId(models[0].id);
    }

    if (!firstRender) {
      const matchId = models.find((m) => m.id === modelId);
      if (modelId && !matchId) {
        setModelId(null);
      }
      setFirstRender(true);
    }
  }, [models, modelId, setModelId, firstRender, setFirstRender]);

  return (
    <>
      <div className="layout-model-selector">
        <label>Modelo</label>
        <div className="layout-model-selector-header flex">
          <Select value={modelId} onChange={setModelId}>
            {models.map((m) => (
              <Select.Option value={m.id} key={m.id}>
                {m.name}
              </Select.Option>
            ))}
          </Select>

          <NavLink to={"/admin/new-model"} className="add-button">
            <PlusCircleTwoTone />
          </NavLink>
        </div>
      </div>
      <Entrenamiento />
      <FuenteDeDatos />
    </>
  );
};

const Entrenamiento: FC = () => {
  return (
    <div className="layout-navbar-section">
      <div className="layout-navbar-section-title">Entrenamiento</div>
      <NavLink className="layout-navbar-item" to={"model/params"}>
        <Cpu />
        <div className="layout-navbar-item-desc">Configuración</div>
      </NavLink>

      <NavLink className="layout-navbar-item" to={"model/history"}>
        <PlayCircle />
        <div className="layout-navbar-item-desc">Historial</div>
      </NavLink>
    </div>
  );
};

const FuenteDeDatos: FC = () => {
  return (
    <div className="layout-navbar-section">
      <div className="layout-navbar-section-title">Fuente de datos</div>
      <NavLink className="layout-navbar-item" to={"model/catalog/query"}>
        <Database />
        <div className="layout-navbar-item-desc">Consultas</div>
      </NavLink>

      <NavLink className="layout-navbar-item" to={"model/catalog/candidates"}>
        <Database />
        <div className="layout-navbar-item-desc">Canditatos</div>
      </NavLink>

      <NavLink className="layout-navbar-item" to={"model/features"}>
        <Zap />
        <div className="layout-navbar-item-desc">Características</div>
      </NavLink>

      <NavLink className="layout-navbar-item" to={"model/catalog/config"}>
        <Settings />
        <div className="layout-navbar-item-desc">Conexión</div>
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
