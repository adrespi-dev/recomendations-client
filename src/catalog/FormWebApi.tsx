import { Form, Input } from "antd";
import { FC } from "react";

export const FormWebApi: FC = () => {
  return (
    <>
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
        label="Url para obtener todos los registros del catálogo"
        name="get_all_url"
        rules={[{ required: true, message: "Ingrese una base de datos" }]}>
        <Input />
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
    </>
  );
};
