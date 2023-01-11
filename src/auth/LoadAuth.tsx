import { FC, ReactNode, useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { getMyPermssions } from "../auth/Api";
import { currentPermissionsState } from "../auth/State";
import { Spinner } from "../components/Spinner";

import "./LoadAuth.scss";

type Props = {
  children: ReactNode;
};

export const LoadAuth: FC<Props> = ({ children }) => {
  const { isLoading, data } = useQuery(["my-permissions"], getMyPermssions);
  const [state, setState] = useRecoilState(currentPermissionsState);

  useEffect(() => {
    if (data) {
      setState(data);
    }
  }, [data, setState]);

  return (
    <>
      {isLoading && (
        <div className="global-loader">
          <Spinner size={48} />
        </div>
      )}

      {state && <>{children}</>}
    </>
  );
};
