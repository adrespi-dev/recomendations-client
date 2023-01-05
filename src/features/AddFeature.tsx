import {
  Alert,
  Button,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilState } from "recoil";
import { getValidationErrors } from "../core/Utils";
import { selectedModelIdState } from "../models/State";
import { useSetting } from "../settings/Api";
import { createFeature } from "./Api";

export const AddFeature: FC = () => {
  const queryClient = useQueryClient();

  const [form] = useForm();
  const [api, contextHolder] = message.useMessage();

  const [modelId] = useRecoilState(selectedModelIdState);

  const {
    isLoading,
    isError,
    mutateAsync: create,
  } = useMutation(createFeature);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFormSubmit = async (values: any) => {
    try {
      await create({ modelId: modelId!, values });
      api.success({
        content: "Característica creada correctamente",
        type: "info",
      });
      queryClient.invalidateQueries("list-features");
      hideModal();
    } catch (e: any) {
      const errors = getValidationErrors(e);
      if (errors) {
        form.setFields(errors);
      }
    }
  };

  return (
    <>
      {contextHolder}

      <Button onClick={showModal} type="primary">
        Nueva Característica
      </Button>

      <Modal
        title="Agregar nueva característica"
        open={isModalOpen}
        destroyOnClose
        confirmLoading={isLoading}
        cancelButtonProps={{ disabled: isLoading }}
        onOk={() => form.submit()}
        okText="Crear Característica"
        onCancel={hideModal}>
        <div style={{ paddingTop: 24, paddingBottom: 22 }}>
          <FeatureForm
            isError={isError}
            form={form}
            onFormSubmit={onFormSubmit}
          />
        </div>
      </Modal>
    </>
  );
};

const FeatureForm: FC<{
  isError: boolean;
  form: FormInstance;
  onFormSubmit: (values: any) => void;
}> = ({ isError, form, onFormSubmit }) => {
  const { isLoading, data: config } = useSetting("catalog-datasource");

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFormSubmit}>
        <Form.Item
          label="Colección"
          name="collection"
          rules={[{ required: true, message: "Ingrese una colección" }]}>
          <Select loading={isLoading}>
            {config && (
              <>
                <Select.Option key={config["query_collection"]}>
                  {config["query_collection"]}
                </Select.Option>
                <Select.Option key={config["candidates_collection"]}>
                  {config["candidates_collection"]}
                </Select.Option>
              </>
            )}
          </Select>
        </Form.Item>

        <Form.Item
          label="Nombre del campo"
          name="field_name"
          rules={[{ required: true, message: "Ingrese un nombre del campo" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Clasificación"
          name="classification"
          rules={[{ required: true, message: "Ingrese una clasificación" }]}>
          <Select
            options={[
              { label: "Categórica", value: "categorical" },
              { label: "Numérica", value: "numerical" },
            ]}
          />
        </Form.Item>

        {isError && (
          <Alert
            style={{ marginTop: 24 }}
            type="error"
            icon
            message="Ocurrió un error y no pudimos crear el usuario"
          />
        )}

        <Form.Item style={{ display: "none" }}>
          <button type="submit"></button>
        </Form.Item>
      </Form>
    </>
  );
};
