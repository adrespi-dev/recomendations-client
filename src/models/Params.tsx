import { FC, useState } from "react";
import { Automatizacion } from "./forms/Automatizacion";
import { GeneralForm } from "./forms/General";
import { HiperParametros } from "./forms/HiperParametros";
import { ModelParamsNavbar } from "./Navbar";
import "./Params.scss";

export const ModelParamsPage: FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("general");
  return (
    <div className="page-full model-params">
      <ModelParamsNavbar
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <div className="params-content">
        <Content selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

const Content: FC<{ selectedMenu: string }> = ({ selectedMenu }) => {
  switch (selectedMenu) {
    case "general":
      return <GeneralForm />;
    case "automatizacion":
      return <Automatizacion />;
    case "hiperparametros":
      return <HiperParametros />;
    default:
      return <>No encontrado</>;
  }
};
