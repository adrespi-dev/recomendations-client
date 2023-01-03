import { Alert, Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import Paragraph from "antd/es/typography/Paragraph";
import { FC, useEffect, useState } from "react";
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
              className="with-limit"
              label="Nombre del modelo"
              name="name"
              rules={[
                { required: true, message: "Ingrese un nombre para el modelo" },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item style={{ paddingTop: 24 }} label="Tipo de modelo">
              <ModelTypes />
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

const ModelTypes: FC = () => {
  const [modelType, setModelType] = useState("retrieval_and_ranking");

  return (
    <div className="model-types">
      <div
        className={`model-type ${
          modelType === "retrieval_and_ranking" ? "selected" : ""
        }`}
        onClick={() => setModelType("retrieval_and_ranking")}
        style={{ marginRight: 12 }}>
        <div className="model-type-title">Retrieval + Ranking</div>
        <div className="model-type-desc">
          <Paragraph
            ellipsis={{
              rows: 3,
              expandable: true,
              symbol: <div>Ver más</div>,
            }}>
            Modelo de 2 fases: La fase retrieval y la fase ranking.
            <br />
            <br />
            La <strong>fase retrieval</strong> permite encontrar recomendaciones
            no tan personalizadas pero eficientes sobre base de datos enormes
            <br />
            <br />
            La <strong>fase ranking</strong> valora las recomendaciones de la
            fase anterior y genera recomendaciones muy personalizadas y con
            mucho mas contexto (features)
          </Paragraph>
        </div>
      </div>

      <div
        className={`model-type ${modelType === "retrieval" ? "selected" : ""}`}
        onClick={() => setModelType("retrieval")}>
        <div className="model-type-title">Retrieval</div>
        <div className="model-type-desc">
          <Paragraph
            ellipsis={{
              rows: 3,
              expandable: true,
              symbol: <div>Ver más</div>,
            }}>
            Encuentra recomendaciones de manera eficiente sobre bases de datos
            enormes. No soporta caracteristicas (features)
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
