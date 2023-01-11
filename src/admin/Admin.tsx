import { FC } from "react";
import { LoadAuth } from "../auth/LoadAuth";
import { Layout } from "./Layout";

export const Admin: FC = () => {
  return (
    <LoadAuth>
      <Layout />
    </LoadAuth>
  );
};
