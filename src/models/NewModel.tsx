import { Alert, Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getValidationErrors } from "../core/Utils";
import { createModel } from "./Api";

import "./NewModel.scss";
import { selectedModelIdState } from "./State";

export const NewModel: FC = () => {
  const [_, setModelId] = useRecoilState(selectedModelIdState);
  const queryClient = useQueryClient();
  const [form] = useForm();

  const navigate = useNavigate();

  const {
    isLoading,
    isError,
    error,
    mutate: save,
  } = useMutation(createModel, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("list-models");
      setModelId(data.id);
      navigate("/admin/model");
    },
  });

  useEffect(() => {
    if (form && error) {
      const errors = getValidationErrors(error as any);
      if (errors) {
        form.setFields(errors);
      }
    }
  }, [form, error]);

  return (
    <>
      <div className="page-header">
        <div className="page-title">Crear nuevo modelo</div>
      </div>
      <div className="page-body">
        <div className="new-modal">
          <Form form={form} layout="vertical" onFinish={save}>
            <Form.Item
              label="Nombre del modelo"
              name="name"
              rules={[
                { required: true, message: "Ingrese un nombre para el modelo" },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item shouldUpdate>
              {({ getFieldsError }) => (
                <Button
                  type="primary"
                  loading={isLoading}
                  disabled={
                    getFieldsError().filter(({ errors }) => errors.length)
                      .length > 0
                  }
                  htmlType="submit">
                  Guardar
                </Button>
              )}
            </Form.Item>

            {isError && (
              <Alert
                style={{ marginTop: 24 }}
                type="error"
                icon
                message="Ocurrió un error y no pudimos crear el modelo"
              />
            )}
          </Form>
        </div>
      </div>
    </>
  );
};
