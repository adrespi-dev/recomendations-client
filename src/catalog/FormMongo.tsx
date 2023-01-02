import { message, Form, Input, InputNumber, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import Password from "antd/es/input/Password";
import { ErrorSection } from "../components/ErrorSection";
import { Spinner } from "../components/Spinner";
import { SpinnerSection } from "../components/SpinnerSection";
import { useSetting, useSetSetting } from "../settings/Api";

export const FormMongoDB = () => {
  const [form] = useForm();
  const [api, contextHolder] = message.useMessage();
  const {
    isError,
    refetch,
    isLoading,
    data = {},
  } = useSetting("catalog-datasource");

  const { isLoading: isLoadingEdit, mutateAsync: setSetting } =
    useSetSetting("catalog-datasource");

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
      {isError && <ErrorSection showReload onReload={refetch} />}
      {isLoading && <SpinnerSection />}
      {!isLoading && !isError && (
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={data}
          layout="vertical">
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
              <InputNumber style={{ width: "100%" }} placeholder="localhost" />
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
              label="Colección de Consultas"
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
              label="Colección de Candidatos"
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
