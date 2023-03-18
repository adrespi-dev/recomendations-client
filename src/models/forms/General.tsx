import { Form, Input, Select } from "antd";
import { FC } from "react";
import { useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { selectedModelIdState } from "../State";
import { BaseForm } from "./Base";

export const GeneralForm: FC = () => {
  const queryClient = useQueryClient();

  const modelId = useRecoilValue(selectedModelIdState);

  // @ts-ignore
  const timezones: any[] = Intl.supportedValuesOf("timeZone");
  timezones.push("Global Time/UTC");

  return (
    <BaseForm
      title="General"
      codes={[
        "model_name",
        "timezone",
        "training_interval_measure",
        "training_interval_value",
      ]}
      onSuccess={() => queryClient.invalidateQueries("list-models")}
      content={(_data) => (
        <>
          <Form.Item className="with-limit" label="Código del modelo">
            <Input readOnly value={modelId!} />
          </Form.Item>

          <Form.Item
            className="with-limit"
            label="Nombre del modelo"
            name="model_name"
            rules={[
              { required: true, message: "Ingrese un nombre para el modelo" },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item className="with-limit" label="Tipo del modelo">
            <Input disabled value={"Modelo de 2 fases"} />
          </Form.Item>

          <Form.Item label="Zona horaria">
            <Select
              className="with-limit"
              showSearch
              placeholder="Default: UTC"
              optionFilterProp="children"
              filterOption={(input, option) =>
                ((option?.label as string) ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={timezones?.map(
                (tz) => ({ value: tz, label: tz } ?? [])
              )}></Select>
          </Form.Item>
        </>
      )}
    />
  );
};
