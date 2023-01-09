import { Form, Input, InputNumber } from "antd";
import Password from "antd/es/input/Password";
import { FC } from "react";

export const FormMySQL: FC = () => {
  return (
    <>
      <div className="flex">
        <Form.Item
          className="flex-50"
          style={{ paddingRight: 8 }}
          label="Servidor"
          name="host"
          rules={[{ required: true, message: "Ingrese un servidor" }]}>
          <Input placeholder="localhost" />
        </Form.Item>

        <Form.Item
          className="flex-50"
          label="Puerto"
          name="port"
          rules={[{ required: true, message: "Ingrese un puerto" }]}>
          <InputNumber style={{ width: "100%" }} placeholder="27017" />
        </Form.Item>
      </div>

      <Form.Item
        label="Base de datos"
        name="database"
        rules={[{ required: true, message: "Ingrese una base de datos" }]}>
        <Input />
      </Form.Item>

      <div className="flex">
        <Form.Item
          style={{ paddingRight: 8, flex: "70%" }}
          label="Tabla de Consultas"
          name="query_collection"
          rules={[{ required: true, message: "Ingrese un nombre" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-50"
          label="Campo ID"
          name="user_id"
          rules={[{ required: true, message: "Ingrese un nombre" }]}>
          <Input />
        </Form.Item>
      </div>

      <div className="flex">
        <Form.Item
          style={{ paddingRight: 8, flex: "70%" }}
          label="Tabla de Candidatos"
          name="candidates_collection"
          rules={[{ required: true, message: "Ingrese un nombre" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          className="flex-50"
          label="Campo ID"
          name="candidate_id"
          rules={[{ required: true, message: "Ingrese un nombre" }]}>
          <Input />
        </Form.Item>
      </div>

      <Form.Item
        label="Usuario"
        name="user"
        rules={[{ required: true, message: "Ingrese un usuario" }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Contraseña"
        name="password"
        rules={[{ required: true, message: "Ingrese una contraseña" }]}>
        <Password />
      </Form.Item>
    </>
  );
};
