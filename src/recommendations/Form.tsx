import { Alert, Button, Empty, Form, Input } from "antd";
import { FC } from "react";
import { useMutation } from "react-query";
import { predictModel } from "../models/Api";
import { PredictParams, RecModel } from "../models/Type";

import { ModelRecommendationsList } from "./List";

export const ModelRecommendationsForm: FC<{ model: RecModel }> = ({
  model,
}) => {
  const {
    data,
    mutate: predict,
    isLoading,
    isError,
  } = useMutation(predictModel);

  const onFinish = (params: PredictParams) => {
    predict({ modelId: model.id, params });
  };

  return (
    <div className="recommendations-form">
      {!model.trained_last_status && (
        <Empty description="Este modelo aún no ha sido entrenado" />
      )}

      {!!model.trained_last_status && (
        <Form layout="vertical" onFinish={onFinish}>
          <div className="recommendations-form-title">
            Formulario de recomendaciones
          </div>

          <Form.Item
            label="ID del registro de consulta"
            name="query_id"
            rules={[{ required: true, message: "Este campo es requerido" }]}>
            <Input />
          </Form.Item>

          <Form.Item shouldUpdate>
            {({ getFieldsError }) => (
              <Button
                type="primary"
                loading={isLoading}
                disabled={
                  getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0
                }
                htmlType="submit">
                Predecir
              </Button>
            )}
          </Form.Item>
        </Form>
      )}

      {isError && (
        <Alert
          style={{ marginTop: 24 }}
          type="error"
          icon
          message="Ocurrió un error al momento de predecir"
        />
      )}

      {data && <ModelRecommendationsList predictions={data.predictions} />}
    </div>
  );
};
