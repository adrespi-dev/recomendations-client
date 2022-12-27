import { ConfigProvider } from "antd";
import { FC } from "react";

export const AntdTheme: FC<any> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter",
          colorText: "#414868",
          colorPrimary: "#0f62fe",
          colorError: "#da1e28",
        },
        components: {
          Button: { controlHeight: 48 },
          Input: { controlHeight: 48, borderRadius: 4 },
        },
      }}>
      {children}
    </ConfigProvider>
  );
};
