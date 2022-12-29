import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import Password from "antd/es/input/Password";
import { FC } from "react";
import { useSetSetting, useSetting } from "../settings/Api";
import "./config.scss";

export const CatalogSettings: FC = () => {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Conector de Catálogo</div>
      </div>
      <div className="page-body">
        <div className="catalog-setting">
          <FormMongoDB />
        </div>
      </div>
    </>
  );
};

const FormMongoDB = () => {
  const [form] = useForm();
  const { isLoading, data = {} } = useSetting("catalog-connector");

  const { mutateAsync: setSetting } = useSetSetting("catalog-connector");

  const onFinish = async (values: any) => {
    await setSetting(values);
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={data}
      layout="vertical">
      <Form.Item
        label="Servidor"
        name="host"
        rules={[{ required: true, message: "Ingrese un servidor" }]}>
        <Input placeholder="localhost" />
      </Form.Item>

      <Form.Item
        label="Base de datos"
        name="database"
        rules={[{ required: true, message: "Ingrese una base de datos" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Colección"
        name="collection"
        rules={[{ required: true, message: "Ingrese una colección" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Usuario"
        name="usuario"
        rules={[{ required: true, message: "Ingrese un usuario" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="contraseña"
        rules={[{ required: true, message: "Ingrese una contraseña" }]}>
        <Password />
      </Form.Item>

      <div className="flex" style={{ justifyContent: "flex-end" }}>
        <Button onClick={() => form.resetFields()} style={{ marginRight: 12 }}>
          Reiniciar
        </Button>

        <Form.Item shouldUpdate>
          {({ getFieldsError }) => (
            <Button
              type="primary"
              loading={isLoading}
              disabled={
                getFieldsError().filter(({ errors }) => errors.length).length >
                0
              }
              htmlType="submit">
              Guardar
            </Button>
          )}
        </Form.Item>
      </div>
    </Form>
  );
};
