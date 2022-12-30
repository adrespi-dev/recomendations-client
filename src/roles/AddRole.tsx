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
import { useMutation, useQueryClient } from "react-query";
import { getValidationErrors } from "../core/Utils";
import { createRole } from "./Api";
import { permissionsOptions } from "./Utils";

export const AddRole: FC = () => {
  const queryClient = useQueryClient();

  const [form] = useForm();
  const [api, contextHolder] = message.useMessage();

  const { isLoading, isError, mutateAsync: create } = useMutation(createRole);

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
      await create(values);
      api.success({
        content: "Rol creado correctamente",
        type: "info",
      });
      queryClient.invalidateQueries("list-roles");
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
        Nuevo Rol
      </Button>

      <Modal
        title="Agregar nuevo usuario"
        open={isModalOpen}
        destroyOnClose
        confirmLoading={isLoading}
        cancelButtonProps={{ disabled: isLoading }}
        onOk={() => form.submit()}
        okText="Crear Rol"
        onCancel={hideModal}>
        <div style={{ paddingTop: 24, paddingBottom: 22 }}>
          <RoleForm isError={isError} form={form} onFormSubmit={onFormSubmit} />
        </div>
      </Modal>
    </>
  );
};

const RoleForm: FC<{
  isError: boolean;
  form: FormInstance;
  onFormSubmit: (values: any) => void;
}> = ({ isError, form, onFormSubmit }) => {
  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFormSubmit}>
        <Form.Item
          label="Nombre del Rol"
          name="name"
          rules={[{ required: true, message: "Ingrese un nombre de rol" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Permisos" name="permissions">
          <Select mode="multiple" placeholder="Seleccione los permisos">
            {permissionsOptions.map((p) => (
              <Select.Option value={p.value}>{p.text}</Select.Option>
            ))}
          </Select>
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
