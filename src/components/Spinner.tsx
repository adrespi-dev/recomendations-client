import { FC } from "react";
// import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { ReactComponent as SpinnerSvg } from "./spinner.svg";

// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export const Spinner: FC<{ size?: number }> = ({ size = 32 }) => (
  <Spin
    indicator={
      <SpinnerSvg className="spin" style={{ height: size, width: size }} />
    }></Spin>
);
