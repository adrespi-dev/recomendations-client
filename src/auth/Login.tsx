import { FC, useState } from "react";
import "./Login.scss";
import { Button, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import { useAuth } from "../core/AuthContext";

export const Login: FC = () => {
  const { loginUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
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
                  loading={loading}
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
