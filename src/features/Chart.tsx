import { FC, ReactNode } from "react";
import { SpinnerSection } from "../components/SpinnerSection";

type Props = {
  data: any;
  isLoading: boolean;
  chart: (data: any) => ReactNode;
};

export const Chart: FC<Props> = ({ data, isLoading, chart }) => {
  return (
    <>
      {isLoading && <SpinnerSection />}
      {!isLoading && <>{chart(data)}</>}
    </>
  );
};
