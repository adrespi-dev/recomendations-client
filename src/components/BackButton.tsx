import { FC } from "react";
import { ArrowLeft } from "react-feather";
import { NavLink } from "react-router-dom";

import "./BackButton.scss";

type Props = { to: string };

export const BackButton: FC<Props> = ({ to }) => {
  return (
    <NavLink to={to} className="back-button">
      <ArrowLeft />
    </NavLink>
  );
};
