import { Form, Input } from "antd";
import { FC } from "react";

export const FormWebApi: FC = () => {
  return (
    <>
      <Form.Item
        label="API Url"
        name="base_url"
        rules={[{ required: true, message: "Ingrese una url" }]}>
        <Input placeholder="https://www.misitio.com/" />
      </Form.Item>

      <Form.Item
        label="Campo de de registros (paginación)"
        name="records_field"
        rules={[{ required: true, message: "Ingrese un campo" }]}>
        <Input placeholder="pagination.records" />
      </Form.Item>

      <Form.Item
        label="Campo del total de registros (paginación)"
        name="counts_field"
        rules={[{ required: true, message: "Ingrese un campo" }]}>
        <Input placeholder="pagination.totals" />
      </Form.Item>

      <Form.Item
        label="Total de registros por página (paginación)"
        name="page_size">
        <Input placeholder="Default: 20" />
      </Form.Item>

      <Form.Item label="Headers de seguridad" name="headers">
        <Input.TextArea placeholder="Ejemplo: { Authorization: Bearer 'SECRET' }" />
      </Form.Item>

      <div className="flex">
        <Form.Item
          style={{ paddingRight: 8, flex: "70%" }}
          label="Endpoint de Consultas"
          name="query_collection"
          rules={[{ required: true, message: "Ingrese un endpoint" }]}>
          <Input placeholder="Ejemplo: /query?page={PAGE}" />
        </Form.Item>

        <Form.Item
          className="flex-50"
          label="Campo ID"
          name="user_id"
          rules={[{ required: true, message: "Ingrese un endpoint" }]}>
          <Input />
        </Form.Item>
      </div>

      <div className="flex">
        <Form.Item
          style={{ paddingRight: 8, flex: "70%" }}
          label="Endpoint de Candidatos"
          name="candidates_collection"
          rules={[{ required: true, message: "Ingrese un nombre" }]}>
          <Input placeholder="Ejemplo: /candidates?page={PAGE}" />
        </Form.Item>

        <Form.Item
          className="flex-50"
          label="Campo ID"
          name="candidate_id"
          rules={[{ required: true, message: "Ingrese un nombre" }]}>
          <Input />
        </Form.Item>
      </div>
    </>
  );
};
