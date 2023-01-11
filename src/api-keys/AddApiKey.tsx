import { Alert, Button, Form, FormInstance, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { getValidationErrors } from "../core/Utils";
import { createApiKey } from "./Api";

export const AddApiKey: FC = () => {
  const queryClient = useQueryClient();

  const [apiKey, setApiKey] = useState<string | null>(null);

  const [form] = useForm();
  const [api, contextHolder] = message.useMessage();

  const { isLoading, isError, mutateAsync: create } = useMutation(createApiKey);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    form.resetFields();
    setIsModalOpen(false);
    setApiKey(null);
  };

  const onFormSubmit = async (values: any) => {
    try {
      const { key } = await create(values);
      setApiKey(key);

      api.success({
        content: "Llave creada correctamente",
        type: "info",
      });
      queryClient.invalidateQueries("list-apikeys");
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
        Crear llave de API
      </Button>

      <Modal
        title="Agregar nuevo llave"
        open={isModalOpen}
        destroyOnClose
        confirmLoading={isLoading}
        okButtonProps={{
          disabled: isLoading,
          style: { display: !apiKey ? "inline-block" : "none" },
        }}
        cancelButtonProps={{ disabled: isLoading }}
        onOk={() => form.submit()}
        okText="Crear"
        cancelText="Cerrar"
        onCancel={hideModal}>
        <div style={{ paddingTop: 24, paddingBottom: 22 }}>
          <KeyForm
            apiKey={apiKey}
            isError={isError}
            form={form}
            onFormSubmit={onFormSubmit}
          />
        </div>
      </Modal>
    </>
  );
};

const KeyForm: FC<{
  apiKey: string | null;
  isError: boolean;
  form: FormInstance;
  onFormSubmit: (values: any) => void;
}> = ({ apiKey, isError, form, onFormSubmit }) => {
  return (
    <>
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={onFormSubmit}>
        <Form.Item
          label="Nombre de la llave"
          name="name"
          rules={[{ required: true, message: "Ingrese un nombre " }]}>
          <Input readOnly={!!apiKey} />
        </Form.Item>

        {isError && (
          <Alert
            style={{ marginTop: 24 }}
            type="error"
            icon
            message="Ocurrió un error y no pudimos crear la llave"
          />
        )}

        {apiKey && (
          <>
            <Alert
              style={{ marginTop: 24 }}
              type="info"
              showIcon
              message="Asegurate de guardar este token, no lo volverás a ver"
            />

            <div className="secret-api-key">{apiKey}</div>
          </>
        )}

        <Form.Item style={{ display: "none" }}>
          <button type="submit" disabled={!!apiKey}></button>
        </Form.Item>
      </Form>
    </>
  );
};
