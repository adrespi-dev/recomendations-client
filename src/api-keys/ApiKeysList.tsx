import { Empty, Pagination } from "antd";
import { FC, useState } from "react";
import { Key } from "react-feather";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ReactTimeAgo from "react-time-ago";
import { ActionButtons } from "../components/ActionButtons";
import { ErrorSection } from "../components/ErrorSection";
import { SpinnerSection } from "../components/SpinnerSection";
import { deleteApiKey, getApiKeys } from "./Api";
import { ApiKey } from "./Type";

export const ApiKeysList: FC = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery(
    ["list-apikeys", page],
    () => getApiKeys(page)
  );

  const { mutate: peformDelete } = useMutation(deleteApiKey, {
    onSuccess: () => queryClient.invalidateQueries(["list-apikeys"]),
  });

  return (
    <>
      {isLoading && (
        <div style={{ marginTop: 42 }}>
          <SpinnerSection />
        </div>
      )}

      {isError && (
        <div style={{ paddingTop: 64, maxWidth: 364, margin: "0 auto" }}>
          <ErrorSection showReload onReload={refetch} />
        </div>
      )}

      {!data?.results.length && !isLoading && <NoData />}

      {data && (
        <div className="api-key-content">
          <div className="api-key-list">
            {data.results.map((apiKey) => (
              <Item key={apiKey.id} apiKey={apiKey} onDelete={peformDelete} />
            ))}
          </div>

          {!!data.results?.length && (
            <Pagination
              current={page}
              onChange={(page) => setPage(page)}
              pageSize={10}
              total={data.count}
              showSizeChanger={false}
              showTotal={(total, range) =>
                `Mostrando ${range[0]}-${range[1]} de ${total} registros`
              }
            />
          )}
        </div>
      )}
    </>
  );
};

const Item: FC<{ apiKey: ApiKey; onDelete: Function }> = ({
  apiKey: { id, name, created, prefix },
  onDelete,
}) => {
  return (
    <div className="api-key-item">
      <div className="api-key-item-icon">
        <Key />
      </div>

      <div className="api-key-item-content">
        <div>
          <div className="api-key-item-name">{name}</div>
        </div>
        <div>
          <div className="api-key-item-prefix">
            {prefix}***************************
          </div>
        </div>
      </div>

      <div className="api-key-item-date">
        <ReactTimeAgo date={new Date(created)} />
      </div>

      <ActionButtons hideEdit={true} onDelete={() => onDelete(id)} />
    </div>
  );
};

const NoData: FC = () => (
  <div style={{ marginTop: 64 }}>
    <Empty description="Aún no ha ingresado ninguna llave de API" />
  </div>
);
