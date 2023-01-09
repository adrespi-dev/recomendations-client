import { Select } from "antd";
import { FC } from "react";

import { ReactComponent as MongoLogo } from "./mongodb-icon.svg";
import { ReactComponent as MySqlLogo } from "./mysql-icon.svg";
import { ReactComponent as WebApiLogo } from "./webapi-icon.svg";

export const DatasourceSelect: FC<{
  type: string;
  setType: (type: string) => void;
}> = ({ type, setType }) => {
  return (
    <Select
      value={type}
      onChange={setType}
      style={{ marginBottom: 22, width: "100%" }}>
      <Select.Option value="mongodb">
        <div className="connector flex">
          <div className="connector-icon">
            <MongoLogo />
          </div>
          <div className="connector-text">Mongo</div>
        </div>
      </Select.Option>
      <Select.Option value="mysql">
        <div className="connector flex">
          <div className="connector-icon">
            <MySqlLogo />
          </div>
          <div className="connector-text">MySql</div>
        </div>
      </Select.Option>
      <Select.Option value="webapi">
        <div className="connector flex">
          <div className="connector-icon">
            <WebApiLogo />
          </div>
          <div className="connector-text">Web API</div>
        </div>
      </Select.Option>
    </Select>
  );
};
