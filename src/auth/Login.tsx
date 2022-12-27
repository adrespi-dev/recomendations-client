import { FC } from "react";
import "./Login.scss";
import { Alert, Button, Form, Input } from "antd";
import Password from "antd/es/input/Password";
import { useMutation } from "react-query";
import { loginAsync } from "./Api";
import { AxiosError } from "axios";
import { useSetRecoilState } from "recoil";
import { authTokensState } from "./State";

export const Login: FC = () => {
  const [form] = Form.useForm();
  const setAuthTokens = useSetRecoilState(authTokensState);

  const {
    isLoading,
    isError,
    error,
    mutateAsync: login,
  } = useMutation(loginAsync);

  const onFinish = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const tokens = await login({ username, password });
    setAuthTokens(tokens);
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
                hasFeedback
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
                hasFeedback
                name="password"
                rules={[{ required: true, message: "Ingrese una contraseña" }]}>
                <Password />
              </Form.Item>
            </div>

            <Form.Item shouldUpdate>
              {({ getFieldsError }) => (
                <Button
                  type="primary"
                  loading={isLoading}
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

            {isError && (
              <Alert
                message={
                  (error as AxiosError<any>).response?.data?.detail || "Error"
                }
                type="error"
                showIcon
              />
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
