import { Alert, Form, FormInstance, Input, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { User } from "../auth/User";
import { getValidationErrors } from "../core/Utils";
import { getRoles } from "../roles/Api";
import { updateUser } from "./Api";

type Props = {
  user: User;
  isModalOpen: boolean;
  setIsModalOpen: (val: boolean) => void;
};

export const EditUser: FC<Props> = ({ user, isModalOpen, setIsModalOpen }) => {
  const queryClient = useQueryClient();

  const [form] = useForm();
  const [api, contextHolder] = message.useMessage();

  const { isLoading, isError, mutateAsync: update } = useMutation(updateUser);

  const hideModal = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFormSubmit = async (values: any) => {
    try {
      await update({ userId: user.id, values });
      api.success({
        content: "Usuario modificado correctamente",
        type: "info",
      });
      queryClient.invalidateQueries("list-users");
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
          <UserForm
            user={user}
            isError={isError}
            form={form}
            onFormSubmit={onFormSubmit}
          />
        </div>
      </Modal>
    </>
  );
};

const UserForm: FC<{
  user: User;
  isError: boolean;
  form: FormInstance;
  onFormSubmit: (values: any) => void;
}> = ({ user, isError, form, onFormSubmit }) => {
  form.setFieldsValue(user);
  const { data: roles, isLoading } = useQuery("list-roles", getRoles);

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFormSubmit}>
        <Form.Item label="Nombre de usuario" name="username">
          <Input readOnly style={{ width: 240 }} />
        </Form.Item>

        <div className="flex">
          <Form.Item
            style={{ width: "50%" }}
            label="Rol de seguridad"
            name="role_id"
            rules={[
              { required: true, message: "Ingrese un rol para este usuario" },
            ]}>
            <Select
              showSearch
              loading={isLoading}
              placeholder="Buscar un rol"
              value
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={roles?.map(
                (role) => ({ value: role.id, label: role.name } ?? [])
              )}
            />
          </Form.Item>
        </div>

        <div className="flex">
          <Form.Item style={{ width: "50%" }} label="Correo" name="email">
            <Input readOnly />
          </Form.Item>
        </div>

        <div className="flex">
          <Form.Item
            className="flex-50"
            style={{ paddingRight: 8 }}
            label="Primer Nombre"
            name="first_name"
            rules={[{ required: true, message: "Ingrese un nombre" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            className="flex-50"
            label="Apellido"
            name="last_name"
            rules={[{ required: true, message: "Ingrese un nombre" }]}>
            <Input />
          </Form.Item>
        </div>

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
