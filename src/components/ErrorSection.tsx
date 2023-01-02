import { Alert, Button, Empty } from "antd";
import { FC } from "react";
import { AlertTriangle } from "react-feather";

type Props = {
  showReload?: boolean;
  onReload?: Function;
};

export const ErrorSection: FC<Props> = ({
  showReload = false,
  onReload = () => null,
}) => {
  return (
    <Empty
      image={<AlertTriangle style={{ width: "69px", color: "#ff3838" }} />}
      description={
        <Alert
          type="error"
          message="Ocurrió un error. Porfavor intentelo más tarde"></Alert>
      }>
      {showReload && (
        <Button type="primary" onClick={() => onReload()}>
          Reintentar
        </Button>
      )}
    </Empty>
  );
};
