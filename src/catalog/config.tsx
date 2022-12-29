import { Button, Form, Input, message, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import Password from "antd/es/input/Password";
import { FC, useState } from "react";
import { useSetSetting, useSetting } from "../settings/Api";
import "./config.scss";
import { ReactComponent as MongoLogo } from "./mongodb-icon.svg";
import { ReactComponent as MySqlLogo } from "./mysql-icon.svg";
import { ReactComponent as WebApiLogo } from "./webapi-icon.svg";

export const CatalogSettings: FC = () => {
  const [type, setType] = useState("mongodb");
  return (
    <>
      <div className="page-header">
        <div className="page-title">Conector de Catálogo</div>
      </div>
      <div className="page-body">
        <div className="catalog-setting">
          <Select
            value={type}
            onChange={setType}
            style={{ marginBottom: 22, width: "100%" }}>
            <Select.Option value="mongodb">
              <div className="connector flex">
                <div className="connector-icon">
                  <MongoLogo />
                </div>
                <div className="connector-text">Mongo</div>
              </div>
            </Select.Option>
            <Select.Option value="mysql">
              <div className="connector flex">
                <div className="connector-icon">
                  <MySqlLogo />
                </div>
                <div className="connector-text">MySql</div>
              </div>
            </Select.Option>
            <Select.Option value="webapi">
              <div className="connector flex">
                <div className="connector-icon">
                  <WebApiLogo />
                </div>
                <div className="connector-text">Web API</div>
              </div>
            </Select.Option>
          </Select>

          {type == "mongodb" && <FormMongoDB />}
          {type == "mysql" && <FormMySQL />}
          {type == "webapi" && <FormWebApi />}
        </div>
      </div>
    </>
  );
};

const FormMongoDB = () => {
  const [form] = useForm();
  const [api, contextHolder] = message.useMessage();
  const { isLoading, data = {} } = useSetting("catalog-connector");

  const { isLoading: isLoadingEdit, mutateAsync: setSetting } =
    useSetSetting("catalog-connector");

  const onFinish = async (values: any) => {
    await setSetting(values);
    api.success({
      content: "Configuración guardada correctamente",
      type: "info",
    });
  };

  return (
    <>
      {contextHolder}
      {!isLoading && (
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
            <Button
              onClick={() => form.resetFields()}
              style={{ marginRight: 12 }}>
              Reiniciar
            </Button>

            <Form.Item shouldUpdate>
              {({ getFieldsError }) => (
                <Button
                  type="primary"
                  loading={isLoading || isLoadingEdit}
                  disabled={
                    getFieldsError().filter(({ errors }) => errors.length)
                      .length > 0
                  }
                  htmlType="submit">
                  Guardar
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      )}
    </>
  );
};

const FormMySQL = () => {
  const [form] = useForm();

  return (
    <Form form={form} layout="vertical">
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
        label="Tabla"
        name="table"
        rules={[{ required: true, message: "Ingrese una tabla" }]}>
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

const FormWebApi = () => {
  const [form] = useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="API Url"
        name="url"
        rules={[{ required: true, message: "Ingrese una url" }]}>
        <Input placeholder="localhost" />
      </Form.Item>

      <Form.Item
        label="Parámetros de autenticación"
        name="sec_params"
        rules={[{ required: true, message: "Ingrese una url" }]}>
        <Input.TextArea placeholder="Ejemplo: { auth_token: 'SECRET' }" />
      </Form.Item>

      <Form.Item
        label="Url para obtener todos los registros del catalogico"
        name="get_all_url"
        rules={[{ required: true, message: "Ingrese una base de datos" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Url para obtener un registro del catálogo"
        name="get_url"
        rules={[{ required: true, message: "Ingrese una base de datos" }]}>
        <Input placeholder="Ejemplo: https://mywebapi.com/records/{ID}/" />
      </Form.Item>

      <Form.Item
        label="Url para create un registro del catálogo"
        name="post_url"
        rules={[{ required: true, message: "Ingrese una base de datos" }]}>
        <Input placeholder="Ejemplo: https://mywebapi.com/records/" />
      </Form.Item>

      <Form.Item
        label="Url para moidificar un registro del catálogo"
        name="update_url"
        rules={[{ required: true, message: "Ingrese una base de datos" }]}>
        <Input placeholder="Ejemplo: https://mywebapi.com/records/{ID}/" />
      </Form.Item>

      <div className="flex" style={{ justifyContent: "flex-end" }}>
        <Button onClick={() => form.resetFields()} style={{ marginRight: 12 }}>
          Reiniciar
        </Button>

        <Form.Item shouldUpdate>
          {({ getFieldsError }) => (
            <Button
              type="primary"
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
