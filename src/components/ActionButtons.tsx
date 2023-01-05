import { Button, Modal } from "antd";
import { FC } from "react";
import { Edit2, Trash } from "react-feather";

type Props = {
  hideEdit?: boolean;
  hideDelete?: boolean;
  onEdit?: Function;
  onDelete?: () => Promise<any>;
};

export const ActionButtons: FC<Props> = ({
  hideEdit = false,
  hideDelete = false,
  onEdit,
  onDelete,
}) => {
  const handleConfirmDelete = () => {
    Modal.confirm({
      title: "¿Eliminar registro?",
      content: "No lo podrás recuperar",
      okText: "Si, eliminar",
      okType: "danger",
      okButtonProps: { type: "primary" },
      cancelText: "No",
      onOk: async () => {
        onDelete && (await onDelete());
      },
    });
  };

  return (
    <div className="action-buttons">
      {!hideEdit && (
        <Button
          onClick={() => onEdit && onEdit()}
          className="btn-edit"
          icon={<Edit2 />}></Button>
      )}
      {!hideDelete && (
        <Button
          onClick={handleConfirmDelete}
          className="btn-delete"
          danger
          icon={<Trash />}></Button>
      )}
    </div>
  );
};
