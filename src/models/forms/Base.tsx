import { Alert, Button, Form } from "antd";
import { FC, ReactNode } from "react";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { ErrorSection } from "../../components/ErrorSection";
import { SpinnerSection } from "../../components/SpinnerSection";
import { getSettings, setSettings } from "../../settings/Api";
import { selectedModelIdState } from "../State";

type Props = {
  codes: string[];
  title: string;
  onSuccess?: Function;
  content: (data: any) => ReactNode;
};

export const BaseForm: FC<Props> = ({ title, codes, onSuccess, content }) => {
  const [modelId] = useRecoilState(selectedModelIdState);

  const { isLoading, isError, data, refetch } = useQuery(
    ["list-settings", modelId, codes.join(",")],
    () => getSettings(modelId!, codes)
  );

  const {
    isLoading: isLoadingEdit,
    isError: isErrorEdit,
    isSuccess: isSuccessEdit,
    mutate: save,
  } = useMutation(setSettings, { onSuccess: () => onSuccess && onSuccess() });

  const onFinish = (values: any) => {
    save({ modelId: modelId!, values });
  };

  return (
    <div className="params-form">
      <h2>{title}</h2>

      {isLoading && <SpinnerSection />}
      {isError && <ErrorSection showReload={true} onReload={refetch} />}

      {data && (
        <Form layout="vertical" initialValues={data} onFinish={onFinish}>
          {content(data)}

          <Form.Item shouldUpdate>
            {({ getFieldsError }) => (
              <Button
                type="primary"
                loading={isLoading || isLoadingEdit}
                disabled={
                  getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0
                }
                htmlType="submit">
                Guardar
              </Button>
            )}
          </Form.Item>

          {isSuccessEdit && (
            <Alert
              type="success"
              message="Configuración grabada correctamente"></Alert>
          )}

          {isErrorEdit && (
            <Alert
              type="error"
              message="Ocurrió un error, intentelo más tarde"></Alert>
          )}
        </Form>
      )}
    </div>
  );
};
