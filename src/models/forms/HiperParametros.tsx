import { Alert, Form, InputNumber, Select } from "antd";
import { FC } from "react";
import { AlertTriangle } from "react-feather";
import { BaseForm } from "./Base";

export const HiperParametros: FC = () => {
  return (
    <BaseForm
      title="Hiperparámetros"
      codes={[
        "embedding_dimension",
        "model_optimizer",
        "model_optimizer_learning_rate",
      ]}
      content={(_data) => (
        <>
          <Alert
            style={{ marginBottom: 24 }}
            type="warning"
            showIcon
            icon={<AlertTriangle />}
            message="¡Ten cuidado!, si estos parámetros se configuran mal puede resultar en perdidas de precisión o de rendimiento importante."></Alert>

          <Form.Item
            className="with-limit"
            label="Dimension de Inscrutación (embedding)"
            name="embedding_dimension">
            <InputNumber placeholder="Default: 32" min={2} />
          </Form.Item>

          <Form.Item
            className="with-limit"
            label="Optimizador del compilador"
            name="model_optimizer">
            <Select placeholder="Default: Adagrad">
              <Select.Option key="Adadelta">Adadelta</Select.Option>
              <Select.Option key="Adagrad">Adagrad</Select.Option>
              <Select.Option key="Adam">Adam</Select.Option>
              <Select.Option key="Adamax">Adamax</Select.Option>
              <Select.Option key="FTRL">FTRL</Select.Option>
              <Select.Option key="Nadam">Nadam</Select.Option>
              <Select.Option key="RMSprop">RMSprop</Select.Option>
              <Select.Option key="SGD">SGD</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            className="with-limit"
            label="Tasa de aprendizaje del optimizador"
            name="model_optimizer_learning_rate">
            <InputNumber placeholder="Default: 0.1" min={0.1} />
          </Form.Item>

          <div className="flex">
            <div className="flex-50" style={{ paddingRight: 24 }}>
              <h2>Fase Retrieval</h2>
              <Form.Item
                label="Total de epocas de entrenamiento"
                name="retrieval_eppochs">
                <InputNumber placeholder="Default: 3" min={3} />
              </Form.Item>

              <Form.Item
                label="Tamaño de los lotes (batching)"
                name="retrieval_batch">
                <InputNumber placeholder="Default: 3" min={3} />
              </Form.Item>
            </div>
            <div className="flex-50">
              <h2>Fase Ranking</h2>
              <Form.Item
                label="Total de epocas de entrenamiento"
                name="ranking_eppochs">
                <InputNumber placeholder="Default: 3" min={3} />
              </Form.Item>

              <Form.Item
                label="Tamaño de los lotes (batching)"
                name="ranking_batch">
                <InputNumber placeholder="Default: 3" min={3} />
              </Form.Item>
            </div>
          </div>
        </>
      )}
    />
  );
};
