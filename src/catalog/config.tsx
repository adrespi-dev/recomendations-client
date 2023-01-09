import { Button, Form, message, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useState } from "react";
import { ErrorSection } from "../components/ErrorSection";
import { SpinnerSection } from "../components/SpinnerSection";
import { useSetSetting, useSetting } from "../settings/Api";
import "./config.scss";
import { DatasourceSelect } from "./DatasourceSelect";
import { FormMongoDB } from "./FormMongo";
import { FormMySQL } from "./FormMySQL";
import { FormWebApi } from "./FormWebApi";

export const CatalogSettings: FC = () => {
  const [form] = useForm();
  const [type, setType] = useState("mongodb");
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
    await setSetting({ ...values, ...{ type } });
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
        <>
          <div className="page-header">
            <div className="page-title">Conector de Catálogo</div>
          </div>
          <div className="page-body">
            <div className="catalog-setting">
              <DatasourceSelect type={type} setType={setType} />

              <Form
                form={form}
                onFinish={onFinish}
                initialValues={data}
                layout="vertical">
                {type === "mongodb" && <FormMongoDB />}
                {type === "mysql" && <FormMySQL />}
                {type === "webapi" && <FormWebApi />}

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
            </div>
          </div>
        </>
      )}
    </>
  );
};
