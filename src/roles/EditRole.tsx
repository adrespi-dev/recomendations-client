import { Alert, Form, FormInstance, Input, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Role } from "../auth/User";
import { getValidationErrors } from "../core/Utils";
import { updateRole } from "./Api";
import { permissionsOptions } from "./Utils";

type Props = {
  role: Role;
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
};

export const EditRole: FC<Props> = ({ role, isModalOpen, setIsModalOpen }) => {
  const queryClient = useQueryClient();

  const [form] = useForm();
  const [api, contextHolder] = message.useMessage();

  const { isLoading, isError, mutateAsync: update } = useMutation(updateRole);

  const hideModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFormSubmit = async (values: any) => {
    try {
      await update({ roleId: role.id, values });
      api.success({
        content: "Rol modificado correctamente",
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

      <Modal
        title="Modificar usuario"
        open={isModalOpen}
        destroyOnClose
        confirmLoading={isLoading}
        cancelButtonProps={{ disabled: isLoading }}
        onOk={() => form.submit()}
        okText="Modificar Usuario"
        onCancel={hideModal}>
        <div style={{ paddingTop: 24, paddingBottom: 22 }}>
          <RoleForm
            role={role}
            isError={isError}
            form={form}
            onFormSubmit={onFormSubmit}
          />
        </div>
      </Modal>
    </>
  );
};

const RoleForm: FC<{
  role: Role;
  isError: boolean;
  form: FormInstance;
  onFormSubmit: (values: any) => void;
}> = ({ role, isError, form, onFormSubmit }) => {
  form.setFieldsValue(role);

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
          <Select mode="multiple" placeholder="Please select favourite colors">
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
            message="Ocurrió un error y no pudimos crear el rol"
          />
        )}

        <Form.Item style={{ display: "none" }}>
          <button type="submit"></button>
        </Form.Item>
      </Form>
    </>
  );
};
