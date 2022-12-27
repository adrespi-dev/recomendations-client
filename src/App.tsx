import { RecoilRoot } from "recoil";
import { AntdTheme } from "./core/AntdTheme";
import { AppRouter } from "./core/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Suspense } from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true}></ReactQueryDevtools>
        <AntdTheme>
          <Suspense>
            <AppRouter />
          </Suspense>
        </AntdTheme>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
