import { Empty, Pagination } from "antd";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { ErrorSection } from "../components/ErrorSection";
import { SpinnerSection } from "../components/SpinnerSection";
import { getHistory } from "./Api";
import "./History.scss";
import { ModelHistoryItem } from "./HistoryItem";
import { selectedModelIdState } from "./State";

export const ModelHistory: FC = () => {
  const [page, setPage] = useState(1);
  const [modelId] = useRecoilState(selectedModelIdState);

  const { isLoading, isError, data, refetch } = useQuery(
    ["list-history", modelId, page],
    () => getHistory(modelId!, { page: page })
  );

  return (
    <>
      <div className="page-header">
        <div className="page-title">Historial de entrenamientos</div>
      </div>

      <div className="page-body">
        <div className="history">
          {isLoading && <SpinnerSection />}
          {isError && (
            <div style={{ paddingTop: 64, maxWidth: 364, margin: "0 auto" }}>
              <ErrorSection showReload onReload={refetch} />
            </div>
          )}
          {data && (
            <div className="history-content">
              <div className="history-list">
                {!data.results?.length && (
                  <Empty description="No hay datos en el historial aún" />
                )}

                {data.results.map((log) => {
                  return <ModelHistoryItem key={log.id} log={log} />;
                })}
              </div>
              {!!data.results?.length && (
                <Pagination
                  current={page}
                  onChange={(page) => setPage(page)}
                  pageSize={5}
                  total={data.count}
                  showSizeChanger={false}
                  showTotal={(total, range) =>
                    `Mostrando ${range[0]}-${range[1]} de ${total} registros`
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
