import { Avatar, Menu, MenuProps, Popover } from "antd";
import { FC } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authTokensState, currentUserState } from "../auth/State";
import { Logo } from "../components/Logo";

export const Header: FC = () => {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <div className="layout-header">
      <div className="layout-header-logo">
        <Logo />
      </div>
      <div className="flex-auto"></div>

      <Popover
        overlayClassName="user-popover"
        placement="bottom"
        content={<PopupMenu />}
        trigger="click">
        <div className="layout-user" style={{ marginRight: 14 }}>
          <Avatar
            style={{ backgroundColor: "#ff4e60", verticalAlign: "middle" }}>
            <>{currentUser?.username[0]?.toUpperCase()}</>
          </Avatar>
          <div>
            <div>{currentUser?.username}</div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

type MenuItem = Required<MenuProps>["items"][number];

const PopupMenu: FC = () => {
  const logout = useResetRecoilState(authTokensState);

  const items: MenuItem[] = [
    {
      key: "logout",
      label: "Cerrar sesión",
      onClick: logout,
    },
  ];

  return (
    <div className="user-profile-menu">
      <Menu mode="inline" items={items} />
    </div>
  );
};
