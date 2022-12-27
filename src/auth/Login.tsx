import { FC, useState } from "react";
import "./Login.scss";
import { Button, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import { useAuth } from "./AuthContext";

export const Login: FC = () => {
  const { loginUser } = useAuth();
  const [form] = Form.useForm();

  const onFinish = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    await loginUser(username, password);
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <div className="login-card">
          <Form
            form={form}
            name="basic"
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            autoComplete="off">
            <h1 className="login-title">Iniciar Sesión</h1>

            <div className="login-form-item">
              <Form.Item
                label="Nombre de usuario"
                name="username"
                rules={[
                  { required: true, message: "Ingrese un nombre usuario" },
                ]}>
                <Input />
              </Form.Item>
            </div>

            <div className="login-form-item">
              <Form.Item
                label="Contraseña"
                name="password"
                rules={[{ required: true, message: "Ingrese una contraseña" }]}>
                <Password />
              </Form.Item>
            </div>

            <Form.Item shouldUpdate>
              {({ getFieldsError }) => (
                <Button
                  type="primary"
                  loading={true}
                  disabled={
                    getFieldsError().filter(({ errors }) => errors.length)
                      .length > 0
                  }
                  block
                  htmlType="submit">
                  Iniciar Sesión
                </Button>
              )}
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
