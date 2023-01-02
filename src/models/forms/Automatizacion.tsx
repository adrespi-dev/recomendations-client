import { Alert, Form, InputNumber, Select } from "antd";
import { FC } from "react";
import { BaseForm } from "./Base";

export const Automatizacion: FC = () => {
  return (
    <BaseForm
      title="Periodicidad de entrenamiento automatizado"
      codes={[
        "training_interval_measure",
        "training_interval_value",
        "training_buffer_duration",
        "training_buffer_max_duration",
      ]}
      content={(_data) => (
        <>
          <Alert
            style={{ marginBottom: 24 }}
            type="info"
            message="El modelo de entrenamiento se actualiza automaticamente cada cierto tiempo. Aquí puedes configurar la periodicidad"></Alert>

          <div className="flex with-limit">
            <Form.Item
              name="training_interval_measure"
              style={{ flex: "60%", paddingRight: 8 }}
              label="Medida de tiempo">
              <Select
                className="with-limit"
                showSearch
                placeholder="Default: Horas">
                <Select.Option key={"minutos"}>Minutos</Select.Option>
                <Select.Option key={"horas"}>Horas</Select.Option>
                <Select.Option key={"dias"}>días</Select.Option>
                <Select.Option key={"meses"}>meses</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="training_interval_value"
              style={{ flex: "40%" }}
              label="Duración">
              <InputNumber min={1} placeholder="Default: 1" />
            </Form.Item>
          </div>

          <h2>Buffer de entrenamiento</h2>
          <Alert
            style={{ marginBottom: 24 }}
            type="info"
            message="El modelo de entrenamiento implementa un buffer que permite posponer el proceso de entrenamiento en el caso de que existe una gran cantidad de solicitudes"></Alert>

          <Form.Item
            name="training_buffer_duration"
            className="with-limit"
            label="Espera mínima por solicitud">
            <InputNumber min={15} placeholder="Default: 15" />
          </Form.Item>

          <Form.Item
            name="training_buffer_max_duration"
            className="with-limit"
            label="Espera máxima de Buffer (en minutos)">
            <InputNumber min={5} placeholder="Default: 5" />
          </Form.Item>
        </>
      )}
    />
  );
};
