import { MenuProps, Menu } from "antd";
import { FC } from "react";

type MenuItem = Required<MenuProps>["items"][number];

type NavbarProps = {
  selectedMenu: string;
  setSelectedMenu: (key: string) => void;
};

export const ModelParamsNavbar: FC<NavbarProps> = ({
  selectedMenu,
  setSelectedMenu,
}) => {
  const items: MenuItem[] = [
    {
      key: "general",
      label: "General",
    },
    {
      key: "automatizacion",
      label: "Automatización",
    },
    {
      key: "hiperparametros",
      label: "Hiperparámetros",
    },
  ];

  return (
    <div className="model-params-navbar">
      <Menu
        mode="inline"
        items={items}
        selectedKeys={[selectedMenu]}
        onSelect={(i) => setSelectedMenu(i.key)}
      />
    </div>
  );
};
