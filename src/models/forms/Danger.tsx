import { Alert, Button, Modal } from "antd";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteModel } from "../Api";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useRecoilState } from "recoil";
import { selectedModelIdState } from "../State";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

export const DangerForm: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [modelId, setModelId] = useRecoilState(selectedModelIdState);
  const {
    isLoading,
    isError,
    mutate: performDelete,
  } = useMutation(deleteModel, {
    onSuccess: () => {
      queryClient.invalidateQueries("list-models");
      navigate("/admin/model");
    },
  });

  const showDeleteConfirm = () => {
    confirm({
      title: "¿Deseas eliminar permanente el modelo?",
      icon: <ExclamationCircleFilled />,
      content: "No podrás deshacer esta operación",
      okButtonProps: { type: "primary" },
      okText: "Si, eliminar",
      okType: "danger",
      cancelText: "No",
      onOk: () => {
        setModelId(null);
        performDelete(modelId!);
      },
    });
  };

  return (
    <div className="params-form">
      <h2>Zona de peligro</h2>

      <Button
        onClick={showDeleteConfirm}
        type="primary"
        loading={isLoading}
        danger>
        Eliminar modelo
      </Button>

      {isError && (
        <Alert
          style={{ marginTop: 24 }}
          type="error"
          icon
          message="Ocurrió un error y no pudimos eliminar el modelo"
        />
      )}
    </div>
  );
};
